# Blog Web App

A simple and functional **Blog Web Application** built using modern web technologies. This project allows users to create, view, update, and delete blog posts with a clean UI.

## 🚀 Tech Stack

* **Frontend:** React.Js ,Material-UI
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (via Mongoose)

---

## 📌 Features

* Create new blog posts
* Display all blogs on homepage
* View full details of a blog
* Edit an existing blog
* Delete a blog
* Responsive layout

---

## 📂 Project Structure

```
Blog_web_app/
│
├── public/            # Static files (CSS, JS)
├── views/             # EJS templates for UI
├── routes/            # Route handlers
├── models/            # Mongoose models
├── app.js             # Main server file
└── package.json       # Project metadata
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/siddhidhamnaskar/Blog_web_app.git
cd Blog_web_app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add your MongoDB Connection

Inside `app.js`, update the MongoDB connection string:

```js
mongoose.connect("your-mongodb-uri-here");
```

### 4️⃣ Start the server

```bash
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## 📸 Screenshots

(Add screenshots here when available)

---

## 🛠️ Future Improvements

* Add user authentication (Login/Signup)
* Add comments for each post
* Add categories and tags
* Improve UI with a modern design

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to improve this project, feel free to fork the repo and submit a PR.

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 📧 Contact

For any queries, feel free to reach out:

* **GitHub:** siddhidhamnaskar
