🧾 CreditSea – Full Stack Credit Report Viewer

A full-stack web application built with Node.js (Express) and React for uploading, parsing, and displaying XML-based credit report data in a clean, responsive dashboard UI.



CREDITSEA/

├── backend/           # Express + MongoDB backend

│   ├── index.js       # Entry point for backend server

│   ├── database.js    # MongoDB connection

│   ├── report.js      # Mongoose schema/model

│   ├── reportcontrol.js # Controller logic

│   ├── .env           # Environment variables (not uploaded)

│   └── package.json   # Backend dependencies
│
├── credit-ui/         # React frontend (Credit Report Dashboard)

│   ├── src/           # React source code

│   ├── public/

│   ├── package.json   # Frontend dependencies

│   └── build/         # Production build (generated)

│
└── README.md          # This file


RUN BACKEND = Inside of backend just run { node index.js }
RUN FRONTEND = Inside of credit-ui just run { npm start }

FOR LIVE HOSTING VIEW-
BACKEND- https://creditsea-app-9e2d.onrender.com/      Open this backend hosting before the frontend cause it takes 2-3 mins to deploy as of sleep mode in free plan of render 😂
FRONTEND - https://credit-frontend.netlify.app/        Open this link for viewing the site.....
