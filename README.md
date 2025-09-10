# React Posts & Users App

This project was developed as part of a technical assessment to demonstrate **frontend development skills with React and TypeScript**.  
It integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to display and manage posts and users.

---

## 🚀 Features
- Fetch and display **Posts** and **Users** from API  
- **Add / Edit / Delete** functionality for posts and users  
- Posts are linked to their authors (e.g., *User: Ali*)  
- **Reusable form component** for both posts and users  
- **Pagination** support for posts  
- Built with **Material-UI** for modern UI design  
- Custom React hook (`useFetch`) for clean data fetching  

---

## 🛠️ Tech Stack
- **React (Vite) + TypeScript**  
- **Material-UI (MUI)**  
- **Axios** for API requests  
- **React Router** for navigation  

---
## 📂 Project Structure

src/
├── components/ # Reusable UI components
│ ├── GenericForm.tsx
│ ├── PostCard.tsx
│ └── UserRow.tsx
│
├── hooks/ # Custom hooks
│ └── useFetch.ts
│
├── pages/ # Pages
│ ├── Posts.tsx
│ └── Users.tsx
│
├── services/ # API services
│ ├── postService.ts
│ └── userService.ts
│
├── types/ # TypeScript types
│ ├── post.ts
│ └── user.ts
│
├── App.tsx # Routes and navigation
└── main.tsx # Entry point


---

## ⚡ Getting Started
```bash
# Install dependencies
npm install

# Run the app
npm run dev


## 📂 Project Structure
