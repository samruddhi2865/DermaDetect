# 🩺 DermaDetect – Skin Disease Detection System

DermaDetect is a full-stack web application that uses **deep learning and the MERN stack** to predict possible skin diseases from uploaded or camera-captured images. The system leverages a **fine-tuned ResNet50 CNN model** to provide AI-powered insights, focusing on **early awareness and educational support**.

## 🎯 Project Objectives

* Apply **AI & Machine Learning** to a real-world healthcare use case
* Build a complete **MERN stack** application
* Integrate a **deep learning model** with a web backend
* Provide a **simple, secure, and user-friendly interface** for predictions

---

## ✨ Key Features

### 🔐 Authentication & Security

* Secure user registration and login using **JWT authentication**

### 👤 User Profile Management

* View and manage user profile details

### 📸 Skin Disease Prediction

* Upload images or capture using a web camera
* AI model predicts possible skin disease

### 📊 Dashboard

* Centralized access to all application features

### 📄 Prediction History

* View past predictions
* Download prediction reports in **PDF format**

### 📝 Blog Management

* Create and manage skin-health-related blog posts

### 📩 Contact Module

* Submit queries or feedback through a contact form

---

## 🖼️ Screenshots

*Add screenshots in the `/screenshots` folder*

* User Login Page
* Dashboard
* Skin Disease Prediction Page
* Prediction History
* Blog Management
* Contact Us Page

---

## 🛠️ Technology Stack

### Frontend

* React.js
* HTML5, CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Machine Learning

* Python
* TensorFlow & Keras
* ResNet50 (Fine-tuned CNN)

### Other Tools & Libraries

* JWT (Authentication)
* Multer (Image upload handling)
* PDF generation libraries
* RESTful APIs

---

## 📂 Project Structure

```
DermaDetect/
│
├── client/               # React frontend
│   ├── src/
│   └── public/
│
├── server/               # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── ml-model/             # Deep learning model
│   ├── train.py
│   └── predict.py
│
├── screenshots/
├── README.md
└── package.json
```

---

## ⚙️ Setup & Installation

### ✅ Prerequisites

Ensure you have installed:

* Node.js
* MongoDB
* Python 3.x
* TensorFlow & Keras

---

### 🚀 Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/samruddhi2865/DermaDetect.git
```

#### 2️⃣ Navigate to Project Directory

```bash
cd DermaDetect
```

#### 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

#### 4️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

#### 5️⃣ Configure Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### ▶️ Run the Application

#### Start Backend Server

```bash
cd server
node server.js
```

#### Start Frontend Server

```bash
cd ../client
npm start
```

🌐 Access the app at:
`http://localhost:3000`

---

## 🧪 How the System Works

1. User registers or logs in
2. Image is uploaded or captured
3. Image is sent to the backend
4. Deep learning model processes the image
5. Prediction result is returned
6. Result is saved and available for PDF download

---

## 📘 Learning Outcomes

* MERN stack development
* REST API design
* JWT-based authentication
* Image handling in web applications
* Deep learning model integration
* Full-stack AI system deployment

---

## 🔮 Future Enhancements

* 🤖 AI chatbot for skin-care guidance
* 🌿 Natural remedy recommendations
* 🏥 Doctor consultation suggestions
* 📱 Mobile application version
* 🧠 Improved model accuracy with larger datasets

---

## 👩‍💻 Author

**Samruddhi Kshirsagar**
📧 Email: [samrudhikshirsagar65@gmail.com](mailto:samrudhikshirsagar65@gmail.com)
🔗 GitHub: [https://github.com/samruddhi2865](https://github.com/samruddhi2865)
