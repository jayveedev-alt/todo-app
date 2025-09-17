![Todo App Banner](./assets/banner.svg)

# 📝 Todo App

A simple and modern Todo application built with **Next.js** and **Firebase**.  
It allows users to add, edit, delete, and mark tasks as completed, while storing data securely in Firebase.  

---

## 🚀 Features  

- ✅ Add, update, and delete todos  
- 📌 Mark tasks as complete/incomplete  
- 🔐 Firebase authentication (if enabled)  
- ☁️ Real-time syncing with Firebase Firestore  
- 🎨 Clean and responsive UI with Next.js  

---

## 🛠️ Tech Stack  

- [Next.js](https://nextjs.org/) – React framework for server-side rendering  
- [Firebase](https://firebase.google.com/) – Authentication & Firestore database  
- [Tailwind CSS](https://tailwindcss.com/) (if you used it) – Styling  
- [Vercel](https://vercel.com/) – Deployment  

---

## 📂 Project Structure  

```bash
.
├── components    # Reusable UI components
├── pages         # Next.js pages
├── lib           # Firebase config and utilities
├── styles        # Global styles
└── package.json  # Dependencies and scripts
```

---

## ⚡ Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Install dependencies  
```bash
npm install
# or
yarn install
```

### 3. Set up Firebase  
- Go to [Firebase Console](https://console.firebase.google.com/)  
- Create a new project and enable **Firestore Database**  
- Copy your Firebase config values  

Create a `.env.local` file in the root directory and add:  

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the development server  
```bash
npm run dev
# or
yarn dev
```

Visit **http://localhost:3000** 🚀  

---

## 📸 Screenshots  

(Add some screenshots of your app here)  

---

## 📦 Deployment  

Easily deploy to [Vercel](https://vercel.com/):  

```bash
npm run build
npm start
```

Or connect your repo directly to Vercel for automatic deployments.  

---

## 🤝 Contributing  

Contributions, issues, and feature requests are welcome!  
Feel free to open a PR or issue.  

---

## 📜 License  

This project is licensed under the MIT License.  
