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

## ☁️ Hosting

This project is hosted on **Vercel** cloud and can be accessed at:  
🔗 [PG Buddy Website](https://pg-buddy-front-end.vercel.app)

**Test Credentials:**  
- **Username:** `guestuser`  
- **Password:** `guestuser`  

Or, you can create your own profile using the **Registration** page.

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
│   │   ├── Authentication/ # Authentication components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   ├── Home/           # Home page components
│   │   │   ├── Home.jsx
│   │   │   ├── MainPage/   # Main page subcomponents
│   │   │   │   ├── CreateTicketsPage/
│   │   │   │   │   ├── CreateTicketFullPage.jsx
│   │   │   │   ├── AllTicketsListPage/
│   │   │   │   │   ├── TicketListFullPage.jsx
│   │   │   │   ├── IndividualTicketsViewPage/
│   │   │   │       ├── IndividualTicketPage.jsx
│   │   ├── Food/           # Food-related components
│   │   │   ├── Food.jsx
│   │   ├── Stay/           # Stay-related components
│   │   │   ├── Stay.jsx
│   │   ├── Cafe/           # Cafe-related components
│   │   │   ├── Cafe.jsx
│   │   │   ├── OrderHistory/
│   │   │       ├── OrderHistoryPage.jsx
│   │   ├── Services/       # Services-related components
│   │   │   ├── Services.jsx
│   │   ├── Account/        # Account-related components
│   │   │   ├── Account.jsx
│   │   │   ├── Profile/
│   │   │   │   ├── ProfilePage.jsx
│   │   │   ├── KC/         # Knowledge Centre
│   │   │   │   ├── KnowledgeCentre.jsx
│   │   │   ├── Feedback/
│   │   │       ├── Feedback.jsx
│   ├── pages/              # Page components (if applicable)
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
<img width="1559" alt="image" src="https://github.com/user-attachments/assets/56859744-0fef-461a-b433-b086cdaf24c3" />
<img width="1559" alt="image" src="https://github.com/user-attachments/assets/f42538d4-4148-45c4-95f3-7a4d1381de30" />
<img width="1559" alt="Screenshot 2025-03-30 at 7 23 54 PM" src="https://github.com/user-attachments/assets/2d462f6e-17e7-4ea5-9563-f03e82f5c22c" />
<img width="1559" alt="Screenshot 2025-03-30 at 7 24 09 PM" src="https://github.com/user-attachments/assets/7a94c8af-921a-4f9e-b851-3ec8a53fbaa3" />

### Food Page
<img width="1559" alt="Screenshot 2025-03-30 at 7 24 20 PM" src="https://github.com/user-attachments/assets/0dec20a1-fd38-4d92-af05-16869d9a4092" />

### Stay Page
<img width="1559" alt="Screenshot 2025-03-30 at 7 24 42 PM" src="https://github.com/user-attachments/assets/515057c0-47c7-405c-a702-a39d945412ef" />

### Cafe Page
<img width="1559" alt="Screenshot 2025-03-30 at 7 25 08 PM" src="https://github.com/user-attachments/assets/c8c269db-13f2-4cc4-ad9d-4e8266515b3b" />
<img width="1559" alt="Screenshot 2025-03-30 at 7 26 15 PM" src="https://github.com/user-attachments/assets/65b0f3fc-1265-4032-bae1-628971241a3c" />

### Services Page
<img width="1559" alt="Screenshot 2025-03-30 at 7 25 21 PM" src="https://github.com/user-attachments/assets/a631c834-15f2-4e2c-a743-f165abddce43" />

### Accounts Page
<img width="1559" alt="Screenshot 2025-03-30 at 7 25 33 PM" src="https://github.com/user-attachments/assets/e9a39115-f02e-4314-af0f-ce9427a698be" />
<img width="1559" alt="Screenshot 2025-03-30 at 7 25 45 PM" src="https://github.com/user-attachments/assets/d156763e-dc45-4856-92d8-398e7013e10d" />
<img width="1559" alt="Screenshot 2025-03-30 at 7 25 58 PM" src="https://github.com/user-attachments/assets/b5f1f777-2d90-4900-8d03-898d7cc3b94e" />

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
