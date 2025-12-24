import React, { useEffect, useState } from 'react';
import './Records.css';

const Records = () => {
  const [reportFiles, setReportFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        setReportFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => {
        setReportFiles([]);
        setLoading(false);
      });
  }, []);

  const downloadReport = filename => {
    fetch(`/reports/${filename}`)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
  };

  if (loading) {
    return <div className="records-shell">Loading...</div>;
  }

  return (
    <div className="records-shell">
      <section className="records-header">
        <h1>Prediction records</h1>
        <p>
          Each report captures the model output at the time of your upload.
          Download them whenever you need a copy.
        </p>
      </section>

      <section className="records-list-card">
        {reportFiles.length === 0 && (
          <div className="records-empty">
            No prediction reports found yet. Create a prediction to see it
            listed here.
          </div>
        )}

        <ul className="records-list">
          {reportFiles.map((filename, index) => (
            <li className="record-row" key={filename}>
              <div className="record-left">
                <span className="record-index">
                  #{index + 1}
                </span>
                <span className="record-name">{filename}</span>
              </div>
              <button
                className="btn primary record-btn"
                onClick={() => downloadReport(filename)}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Records;
