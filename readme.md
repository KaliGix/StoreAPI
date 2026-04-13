# 🛒 Store App – Full Stack Upgrade (Node.js + API Integration)

## 📌 Overview

This project started as a simple frontend application that consumed a public API.
It was later upgraded into a **full-stack application** by introducing a Node.js backend that acts as a proxy between the frontend and external APIs.

The goal of this refactor was to move from a **basic frontend-only approach** to a more **real-world architecture**.

---

## 🚀 What I Built

* A **Node.js + Express backend**
* API routes to handle:

  * Fetching all products
  * Fetching a single product by ID
  * Searching products
* A **frontend connected to internal API endpoints**
* A system where:

  ```
  Frontend → Backend → External API
  ```

---

## 🧠 Key Concepts I Learned

### 1. Backend Integration with Node.js

* How to create a server using Express
* How to define API routes (`GET`)
* How to handle requests and responses

---

### 2. API Proxy Pattern

* Instead of calling external APIs directly from the frontend:

  ❌ Frontend → External API
  ✅ Frontend → Backend → External API

* Benefits:

  * Avoids CORS issues
  * Improves control over data
  * Makes the app more scalable and secure

---

### 3. Working with Axios

* Making HTTP requests from the backend
* Handling async/await properly
* Managing API responses and errors

---

### 4. Error Handling

* Using `try/catch` blocks
* Sending proper HTTP status codes (`500`)
* Logging errors for debugging

---

### 5. Routing & Parameters

* URL parameters:

  ```js
  /api/products/:id
  ```
* Query parameters:

  ```js
  /api/products/search?query=phone
  ```

---

### 6. Filtering Data

* Using `.filter()` correctly
* Understanding the importance of `return` in callbacks
* Transforming API data before sending it to the frontend

---

### 7. Middleware in Express

* `cors()` to allow cross-origin requests
* `express.json()` to parse JSON data

---

### 8. Serving Static Files

* Using Express to serve frontend files:

  ```js
  app.use(express.static(...))
  ```
* Connecting backend and frontend in one app

---

### 9. Debugging Real Issues

During this project, I encountered and fixed:

* ❌ CORS errors
* ❌ Variable shadowing (`response` conflict)
* ❌ Broken `.filter()` logic (missing return)
* ❌ Incorrect file paths (`index.htm` vs `index.html`)

This helped me understand how to debug real-world problems.

---

## 🏗️ Project Structure

```
store-app/
 ├── client/
 │    ├── index.html
 │    ├── styles.css
 │    └── scripts/
 │         ├── api.js
 │         └── product.js
 │
 └── server/
      ├── server.js
      └── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| GET    | `/api/products`        | Get all products         |
| GET    | `/api/products/:id`    | Get product by ID        |
| GET    | `/api/products/search` | Search products by query |

---

## ▶️ How to Run the Project

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

4. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 💡 What This Project Represents

This project marks the transition from:

> “Frontend developer who consumes APIs”

to:

> “Developer who understands how applications are structured and controlled”

---

## 📈 Next Improvements

* Add caching in the backend
* Improve error handling in the frontend UI
* Add loading and retry states
* Refactor backend into controllers and services
* Deploy the application

---

## 🧩 Final Thought

This project is not just about building features, but about understanding:

* how data flows
* how systems interact
* how to build more reliable applications

---
