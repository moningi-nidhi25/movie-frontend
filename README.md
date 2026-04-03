# 🎬 Movie Search App (Frontend)

A modern movie search web application built using React and Vite, powered by a FastAPI backend.  
Users can search for movies, view detailed information, and manage a personalized favorites list.

---

## 🚀 Features

- 🔍 Search movies by name
- 🎬 View detailed movie information in a popup modal
- ❤️ Add and remove movies from favorites
- 💾 Favorites stored using localStorage
- 🔄 Toggle between search results and favorites
- ⚡ Fast and responsive UI built with Vite
- 🌐 Deployed on Vercel

---

## 🛠 Tech Stack

- React (Vite)
- JavaScript (ES6+)
- CSS
- FastAPI (Backend)
- OMDb API

---

## 📦 Application Overview

The application interacts with a backend API to provide movie data.

### 🔹 Movie Search
Users can search for movies using a keyword. The app fetches matching results and displays them in a grid layout.

### 🔹 Movie Details
Clicking on a movie opens a modal displaying detailed information such as title, year, plot, and rating.

### 🔹 Favorites
Users can add or remove movies from a favorites list. Favorites are stored locally in the browser and persist across sessions.

---

## ⚙️ Local Setup Guide

Follow these steps to run the frontend locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/moningi-nidhi25/movie-frontend.git
cd movie-frontend
````

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Backend API URL

Update the API base URL inside:

```
src/App.jsx
```

Replace with your backend URL:

```js
https://movie-backend-xew0.onrender.com
```

---

### 4️⃣ Run the Development Server

```bash
npm run dev
```

---

### 5️⃣ Open in Browser

```
http://localhost:5173
```

---

## 🌐 Live Application

👉 [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)

---

## 🔗 Backend Integration

This frontend connects to the backend API:

👉 [https://movie-backend-xew0.onrender.com](https://movie-backend-xew0.onrender.com)

Ensure the backend is running or deployed before using the application.

---

## ⚠️ Notes

* ⏳ Initial search may be slow due to backend cold start (Render free tier)
* 🌐 Requires internet connection for API requests
* 💾 Favorites are stored locally (browser-based)

---

## 💡 Future Enhancements

* 🎨 Netflix-style UI redesign
* 🔍 Live search (search-as-you-type)
* 🎬 Movie recommendations
* 👤 User authentication
* ☁️ Cloud-based favorites storage

---

