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