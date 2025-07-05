# Internshala
Personal Finance Visualizer 💰📊

A modern full-stack web app to visualize, track, and manage personal finances. Built using Next.js, React, Tailwind CSS, Node.js, Express, and MongoDB, it empowers users with insights into their income, expenses, and budgeting habits through an intuitive dashboard and interactive charts.

🔗 Live Demo

Coming Soon...

🚀 Features

✅ Stage 1: Transaction Tracker

Add/Edit/Delete transactions

Categorize income and expenses

View transaction list

Monthly overview chart

✅ Stage 2: Category Insights

Category-wise pie chart

Dashboard summary cards

Recent transactions panel

✅ Stage 3: Budgeting (Current Stage)

Set monthly category budgets

Budget vs actual comparison chart

Simple spending insights (over/under budget alerts)

🧠 Tech Stack

Frontend:

React + Next.js

TypeScript

Tailwind CSS

shadcn/ui & lucide-react for UI components

Recharts (for bar and pie charts)

Backend:

Node.js + Express

MongoDB + Mongoose

🗂 Folder Structure

/ (Root)
├── client/ (Frontend)
│   ├── components/
│   ├── pages/
│   └── utils/
├── server/ (Backend)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.ts
└── README.md

📦 Installation

# 1. Clone the repository
git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

⚙️ Running the App

Start Backend:

cd server
npm run dev

Start Frontend:

cd client
npm run dev

Visit: http://localhost:3000

🧪 API Endpoints

/api/transactions

GET - fetch all transactions

POST - add a new transaction

PUT - update transaction

DELETE - delete transaction

/api/budgets

GET - fetch budgets for a specific month/year

POST - set or update a monthly category budget

📊 Screenshots

Coming soon...

👨‍💻 Author

Shulin Agarwal🔗 Portfolio📧 shulinagarwal22@gmaikl.com

📝 License

This project is licensed under the MIT License.

