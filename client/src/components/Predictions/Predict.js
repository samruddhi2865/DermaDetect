import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Webcam from 'react-webcam';
import './Predict.css';

const Predict = () => {
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [precautions, setPrecautions] = useState([]);
  const [pdfFilename, setPdfFilename] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const resetResultState = () => {
    setPrediction(null);
    setPrecautions([]);
    setPdfFilename(null);
    setError(null);
  };

  const onFileChange = e => {
    if (!e.target.files || !e.target.files[0]) return;
    setFile(URL.createObjectURL(e.target.files[0]));
    setCroppedImage(null);
    setCroppedImageURL(null);
    resetResultState();
  };

  const capture = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setFile(imageSrc);
    setCroppedImage(null);
    setCroppedImageURL(null);
    resetResultState();
  };

  const getCropData = () => {
    if (!cropper) {
      alert('Please select and crop an image first.');
      return;
    }
    cropper.getCroppedCanvas().toBlob(
      blob => {
        if (!blob) return;
        const croppedFile = new File([blob], 'croppedImage.jpg', {
          type: 'image/jpeg'
        });
        setCroppedImage(croppedFile);
        setCroppedImageURL(URL.createObjectURL(croppedFile));
        resetResultState();
      },
      'image/jpeg',
      0.95
    );
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!croppedImage) {
      alert('Please crop the image first.');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);
    setPrecautions([]);
    setPdfFilename(null);

    const formData = new FormData();
    formData.append('image', croppedImage);

    try {
      const res = await axios.post('/api/predictions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });

      setPrediction(res.data.prediction);
      setPrecautions(res.data.precautions || []);
      setPdfFilename(res.data.pdfFilename || null);
      setLoading(false);
    } catch (err) {
      let msg = 'Failed to get prediction. Please try again.';
      if (err.response && err.response.data && err.response.data.msg) {
        msg = err.response.data.msg;
      } else if (err.response && err.response.statusText) {
        msg = err.response.statusText;
      }
      setError(msg);
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!pdfFilename) return;
    const a = document.createElement('a');
    a.href = `/reports/${pdfFilename}`;
    a.download = 'Skin_Disease_Report.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="predict-shell">
      <div className="predict-card">
        <header className="predict-header">
          <h1>Predict skin disease</h1>
          <p>
            Upload or capture a clear photo of the affected area, crop it to
            focus on the skin, then run the AI model to get a prediction.
          </p>
        </header>

        <form onSubmit={onSubmit} className="predict-form">
          <div className="pf-row">
            <label className="pf-label">1. Choose image</label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="pf-file"
            />
          </div>

          <div className="pf-row pf-camera-row">
            <span className="pf-label">Or capture from camera</span>
            <button
              type="button"
              onClick={() => setUseCamera(prev => !prev)}
              className="btn outline"
            >
              {useCamera ? 'Close camera' : 'Use camera'}
            </button>
          </div>

          {useCamera && (
            <div className="pf-webcam">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: 'environment' }}
              />
              <button
                type="button"
                onClick={capture}
                className="btn secondary small"
              >
                Capture photo
              </button>
            </div>
          )}

          {file && (
            <div className="pf-cropper">
              <label className="pf-label">2. Adjust crop</label>
              <Cropper
                style={{ height: 320, width: '100%' }}
                aspectRatio={1}
                src={file}
                viewMode={1}
                guides={false}
                scalable
                cropBoxResizable
                onInitialized={instance => setCropper(instance)}
              />
              <button
                type="button"
                onClick={getCropData}
                className="btn secondary"
              >
                Apply crop
              </button>
            </div>
          )}

          <div className="pf-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn primary main"
            >
              {loading ? 'Predicting…' : 'Run prediction'}
            </button>
          </div>
        </form>

        {croppedImageURL && (
          <div className="pf-result-block">
            <h2>Cropped image</h2>
            <img src={croppedImageURL} alt="Cropped" />
          </div>
        )}

        {prediction && (
          <div className="pf-prediction">
            <h2>Prediction result</h2>
            <p>
              Detected condition:{' '}
              <span className="pf-prediction-label">{prediction}</span>
            </p>

            {precautions && precautions.length > 0 && (
              <div className="pf-precautions">
                <h3>Recommended precautions</h3>
                <ul>
                  {precautions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {pdfFilename && (
              <button
                type="button"
                className="btn primary"
                onClick={handleDownloadPDF}
              >
                Download PDF report
              </button>
            )}

            <p className="pf-note">
              This is an AI‑generated suggestion only. Always consult a
              dermatologist for a confirmed diagnosis.
            </p>
          </div>
        )}

        {error && <div className="pf-error">{error}</div>}
      </div>
    </div>
  );
};

export default Predict;
