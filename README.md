🩺 DermaDetect – Skin Disease Detection System

DermaDetect is a web-based skin disease detection application built using the MERN stack and deep learning.
The system predicts possible skin diseases from images uploaded or captured using a web camera, helping users get early insights through AI-powered analysis.

A fine-tuned ResNet50 deep learning model is used to perform accurate image-based skin disease classification.

🎯 Project Purpose

The goal of DermaDetect is to:

Apply machine learning to a real-world healthcare problem

Learn full-stack development using the MERN stack

Integrate AI/ML models with a web application

Provide a simple and user-friendly interface for skin disease prediction

⚠️ This application is intended for educational and research purposes only and should not be used as a replacement for professional medical advice.

✨ Key Features

🔐 User Authentication

Secure login and registration using JWT

👤 User Profile Management

View and update user details

📸 Skin Disease Prediction

Upload an image or capture one using a web camera

AI model predicts the possible skin disease

📊 Dashboard

Central access to all application features

📝 Blog Management

Users can create and manage blog posts related to skin health

📩 Contact Form

Users can send queries or feedback

📄 Prediction History

View past predictions

Download prediction reports in PDF format

🖼️ Screenshots

(Add screenshots inside a /screenshots folder and update paths below)

User Login Page

Dashboard

Skin Disease Prediction Page

Prediction Records

Blog Creation Page

Contact Us Page

🛠️ Technology Stack
Frontend

React.js

HTML5

CSS3

JavaScript

Backend

Node.js

Express.js

Database

MongoDB

Machine Learning

Python

TensorFlow

Keras

ResNet50 (Fine-tuned CNN model)

Other Tools & Libraries

JWT (Authentication)

Multer (Image upload handling)

PDF generation libraries

REST APIs

📂 Project Structure
DermaDetect
│
├── client/                 # React frontend
│   ├── src/
│   └── public/
│
├── server/                 # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── ml-model/               # Machine learning model
│   ├── train.py
│   └── predict.py
│
├── screenshots/
├── README.md
└── package.json

⚙️ Setup Instructions
✅ Prerequisites

Ensure you have the following installed:

Node.js

MongoDB

Python 3.x

TensorFlow & Keras

🚀 Installation Steps
1️⃣ Clone the Repository
git clone https://github.com/samruddhi2865/DermaDetect.git

2️⃣ Navigate to the Project Directory
cd DermaDetect

3️⃣ Install Backend Dependencies
cd server
npm install

4️⃣ Install Frontend Dependencies
cd ../client
npm install

5️⃣ Configure Environment Variables

Create a .env file inside the server folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

▶️ Run the Application
Start Backend Server
cd server
node server.js

Start Frontend Server
cd ../client
npm start

Access the Application
http://localhost:3000

🧪 How It Works

User logs in or registers

Image is uploaded or captured via camera

Image is sent to the backend

ML model processes the image

Prediction result is returned to the frontend

Result is saved and can be downloaded as PDF

📘 Learning Outcomes

Through this project, I learned:

MERN stack development

REST API integration

JWT-based authentication

Image handling in web apps

Deep learning model deployment

Full-stack AI application design

🔮 Future Enhancements

🤖 AI chatbot for skin care guidance

🌿 Natural remedy recommendations

🏥 Doctor consultation suggestions

📱 Mobile app version

🧠 Improved model accuracy with larger datasets

👩‍💻 Author

Samruddhi Kshirsagar
📧 Email: samrudhikshirsagar65@gmail.com

🔗 GitHub: https://github.com/samruddhi2865
