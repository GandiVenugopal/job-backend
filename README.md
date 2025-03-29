Job Recommendation System:


A full-stack MERN application that allows users to sign up, upload their resume, extract skills using NLP, and get personalized job recommendations based on those skills. The system includes a React frontend, Node.js/Express backend, MongoDB Atlas for data storage, and is deployed on AWS EC2 and Vercel with HTTPS.


Features:
JWT-based user authentication (register/login)
Resume upload and storage in AWS S3
Skill extraction from resumes
Job listing scraping via JSearch API (automated with cron every 24 hours)
CI/CD pipeline with GitHub Actions
Deployment on AWS EC2 (backend) + Vercel (frontend)
Domain + HTTPS secured (`https://jobrecommender.online`)


***Live API : https://job-frontend-beige.vercel.app/




The frontend is built using React.js (Vite) and deployed on Vercel. It connects to the backend via secure REST APIs and enables users to:

1. User Registration / Login
   
    -Users visit the app and can sign up with their name, email, and password.
   
    -Passwords are hashed securely and authenticated via JWT tokens.
   
    -On successful login, a token is saved in localStorage for authenticated access.

2. Resume Upload + Skill Extraction
   
    -Authenticated users can upload their resume in PDF or DOCX format.
   
    -The file is uploaded to AWS S3.
   
    -On the backend, a basic NLP parser extracts keywords/skills from the resume content.
   
    -Extracted skills are stored with the user’s profile in MongoDB.

3. Job Recommendation
    
    -After skill extraction, the user can view AI-powered job recommendations.
   
    -The system matches user skills with fetched job listings using keyword comparison.
   
    -Jobs are scraped via the JSearch API, saved in MongoDB, and filtered based on skills.



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



