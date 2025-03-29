Job Recommendation System

A full-stack MERN application that allows users to sign up, upload their resume, extract skills using NLP, and get personalized job recommendations based on those skills. The system includes a React frontend, Node.js/Express backend, MongoDB Atlas for data storage, and is deployed on AWS EC2 and Vercel with HTTPS.

Features:
JWT-based user authentication (register/login)
Resume upload and storage in AWS S3
Skill extraction from resumes
Job listing scraping via JSearch API (automated with cron every 24 hours)
CI/CD pipeline with GitHub Actions
Deployment on AWS EC2 (backend) + Vercel (frontend)
Domain + HTTPS secured (`https://jobrecommender.online`)

Live API : https://job-frontend-beige.vercel.app/


Tech Stack

| Layer        | Tech Used                     |
|--------------|-------------------------------|
| Frontend     | React.js (Vite), Axios        |
| Backend      | Node.js, Express.js, Mongoose |
| Database     | MongoDB Atlas                 |
| Cloud Storage| AWS S3                        |
| Deployment   | AWS EC2, Vercel               |
| Domain       | BigRock + Let’s Encrypt (HTTPS) |
| CI/CD        | GitHub Actions + PM2          |



Live Demo
🔗 Frontend: https://job-frontend.vercel.app

🔗 Backend: https://jobrecommender.online


API Routes
Endpoint	Method	Description
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Log in and get JWT token
/api/upload/resume	POST	Upload resume and extract skills
/api/jobs/recommendations	GET	Get job recommendations
/api/jobs/seed (dev/test only)	POST	Seed jobs into DB



