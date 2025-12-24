const { spawn } = require('child_process');
const path = require('path');
const User = require('../models/User');

// imagePath: full path of saved image
// userId: Mongo user _id
async function predictDisease(imagePath, userId) {
  return new Promise((resolve, reject) => {
    const pyPath = path.join(__dirname, '../predict.py'); // adjust if folder name different

    const py = spawn('python', [pyPath, imagePath]);

    let output = '';
    let errorOutput = '';

    py.stdout.on('data', data => {
      output += data.toString();
    });

    py.stderr.on('data', data => {
      errorOutput += data.toString();
    });

    py.on('close', async code => {
      if (code !== 0) {
        console.error('Python error:', errorOutput);
        return reject(new Error('Python script failed'));
      }

      let result;
      try {
        // output should be JSON like: {"prediction":"acne","precautions":[...]}
        result = JSON.parse(output.trim());
      } catch (e) {
        console.error('JSON parse error from python:', e, output);
        return reject(new Error('Invalid model output'));
      }

      const { prediction, precautions } = result;

      try {
        // Save record on user
        const user = await User.findById(userId);
        if (!user) {
          return reject(new Error('User not found'));
        }

        // imagePath saved in DB should be relative from server root
        const relativeImagePath = path.join('uploads', path.basename(imagePath));

        user.records = user.records || [];
        user.records.push({
          prediction,
          precautions,
          imagePath: relativeImagePath,
          date: new Date()
        });

        await user.save();

        // return to route
        resolve({ prediction, precautions });
      } catch (dbErr) {
        console.error('Error saving record:', dbErr);
        reject(new Error('Database error'));
      }
    });
  });
}

module.exports = { predictDisease };
