# PG Buddy
*Your ultimate companion for managing PG life!*

![React](https://img.shields.io/badge/React-18.2.0-blue) 
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) 
![CSS](https://img.shields.io/badge/CSS-3-orange)
![Vite](https://img.shields.io/badge/Vite-5.0-purple) 
![License](https://img.shields.io/badge/License-MIT-green)


**PGBuddy** is a Spring Boot-based application designed to streamline the management of Paying Guest (PG) accommodations for residents (PG Mates). It provides a user-friendly interface for residents to handle payments, submit complaints, manage meal preferences, and more, while offering admins tools to oversee operations.

Staying in a PG in a city like Bengaluru can be a real hassle—think about the delayed fixes, payment mix-ups, and zero communication. This web app is a try to sort all that out, making life in your PG way smoother!

<p align="center">
  <img src="https://github.com/user-attachments/assets/3b66f610-b1bb-48f4-ac06-4fa73beeb29a" alt="Your Alt Text" width="300">
</p>

---

## ✨ Features

### Resident View (PG Mates)
- **User Authentication**: Secure sign-up/login using email or phone with JWT-based authentication (Spring Security).
- **Payment Management**: View dues, pay rent/food charges via Razorpay/Stripe, and download payment receipts.
- **Complaint System**: Submit issues (e.g., "AC not working") with status tracking (Pending, Resolved, In Progress).
- **Notice Board**: View admin announcements (e.g., "Water maintenance tomorrow").
- **Roommate Finder**: Browse basic profiles of co-residents (privacy-respecting).
- **Meal Preferences**: Submit daily/weekly meal choices (e.g., Veg/Non-Veg).
- **Cafe**: Order food and checkout for payment.
- **Responsive Design**: Fully responsive layout for seamless use on desktops, tablets, and mobile devices.
- **Modular Components**: Well-structured React components for easy maintenance and scalability.
- **Dark Theme**: A sleek dark theme for better readability and aesthetics.

---

## 🛠️ Project Structure
Here’s an overview of the project’s file structure:
```
pg-buddy/
├── public/                 # Static assets (e.g., index.html, favicon)
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   │   ├── ActiveTickets/  # ActiveTickets component and styles
│   │   │   ├── ActiveTickets.jsx
│   │   │   └── ActiveTickets.css
│   │   ├── CreateTicket/   # CreateTicket component and styles
│   │   │   ├── CreateTicket.jsx
│   │   │   └── CreateTicket.css
│   │   ├── NoticeBoard/    # NoticeBoard component and styles
│   │   │   ├── NoticeBoard.jsx
│   │   │   └── NoticeBoard.css
│   │   ├── Tickets/        # Tickets component and styles
│   │   │   ├── Tickets.jsx
│   │   │   └── Tickets.css
│   │   └── TopNavigationBar/ # TopNavigationBar component
│   │       ├── TopNavigationBar.jsx
│   │       └── TopNavigationBar.css
│   ├── pages/              # Page components
│   │   ├── Home/           # Home page and styles
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   ├── App.jsx             # Main App component
│   ├── index.jsx           # Entry point
│   └── index.css           # Global styles
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## 📸 Screenshots

### Home Page
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/572c428f-5801-4314-9837-b74b216921ea" />
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/492c2a04-9c4b-4d5c-82b1-ade5655430f0" />

### Food Page
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/5e7dcbb5-4e70-4f05-9450-95d3fe490b8b" />

### Stay Page
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/f5b5f030-7b02-42ce-be79-e344834a9a69" />

### Cafe Page
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/641e2913-9b01-4d3d-bda0-915c6c4d480a" />

### Services Page
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/1cb13f38-0843-4e1b-a658-33abfd0f19d6" />

### Accounts Page
<img width="1457" alt="image" src="https://github.com/user-attachments/assets/5384625a-f6d3-4fa7-b57e-69217731ebad" />

---
## 🎨 Color Scheme

This project follows a structured color scheme for a consistent and visually appealing UI. Below are the defined colors used across various components:

 🌍 Navigation Bar
- **Primary Navigation Bar Color:** ![#2c3e50](https://img.shields.io/badge/-%232c3e50-2c3e50?style=flat-square&logoColor=white)
- **Light Green Accent:** ![#a8e6cf](https://img.shields.io/badge/-%23a8e6cf-a8e6cf?style=flat-square&logoColor=black)

 🔘 Buttons
- **Selected Button (Green):** ![#26a69a](https://img.shields.io/badge/-%2326a69a-26a69a?style=flat-square&logoColor=white)
- **Unselected Button (Darker Green):** ![#1d2833](https://img.shields.io/badge/-%231d2833-1d2833?style=flat-square&logoColor=white)
- **Hover Effect (Lite White):** ![#d0d0d0](https://img.shields.io/badge/-%23d0d0d0-d0d0d0?style=flat-square&logoColor=black) _(Text turns **black** when hovered)_

 🎨 Background Colors
- **Little Darker Background:** ![#2c3e50](https://img.shields.io/badge/-%232c3e50-2c3e50?style=flat-square&logoColor=white)
- **Much Darker Background:** ![#19212a](https://img.shields.io/badge/-%2319212a-19212a?style=flat-square&logoColor=white)
- **Original Background Color:** ![#1c2526](https://img.shields.io/badge/-%231c2526-1c2526?style=flat-square&logoColor=white)

 🔤 Text Colors
- **Full White:** ![#ffffff](https://img.shields.io/badge/-%23ffffff-ffffff?style=flat-square&logoColor=black)
- **Grey:** ![#c6c0c0](https://img.shields.io/badge/-%23c6c0c0-c6c0c0?style=flat-square&logoColor=black)
- **Greenish Grey (Recommended):** ![#b5c3ad](https://img.shields.io/badge/-%23b5c3ad-b5c3ad?style=flat-square&logoColor=black)
- **Darker Greenish Grey:** ![#71776f](https://img.shields.io/badge/-%2371776f-71776f?style=flat-square&logoColor=white)

 💬 Message Boxes
- **Slightly Lighter Background for Message Box:** ![#2a3435](https://img.shields.io/badge/-%232a3435-2a3435?style=flat-square&logoColor=white)

---
## ⚙️ Setup Instructions

### 🛠 Installation

Make sure you have the following installed:
- [React.js](https://www.freecodecamp.org/news/how-to-install-react-a-step-by-step-guide/&ved=2ahUKEwjNuOKlkKGMAxW8R2wGHYclDWcQFnoECCQQAQ&usg=AOvVaw1t2elEHdsmdZirarHeLMnh) (v14 or higher)
- [npm](https://www.npmjs.com/) (package manager)

1. **Clone the Repository**:
   ```
   bash
   git clone https://github.com/your-username/PGBuddy.git
   cd PGBuddy
   ```
2. **Install Dependencies & Start the server**:
   ```
   npm install
   npm start
   ```
3. **Open in Browser**:
   ```
   http://localhost:5173
   ```

---
## Contributing
Contributions are welcome! Feel free to fork the repo and submit pull requests.

---
## Acknowledgments
Built with ❤️ by Dharshan Kumar.
