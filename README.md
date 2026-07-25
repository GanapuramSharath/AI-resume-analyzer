# 🚀 AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes using ATS principles, generates personalized improvement suggestions, tailors resumes for specific job descriptions, and provides recruiter-friendly feedback.

## ✨ Features

- 🔐 Google & Email Authentication (NextAuth)
- 📄 Upload PDF/DOC/DOCX resumes
- 🤖 AI-powered ATS Resume Analysis
- 📊 ATS Score with detailed insights
- 🎯 Resume Tailoring based on Job Description
- 💡 Personalized improvement suggestions
- 📚 Resume history
- ☁️ AWS S3 file storage
- ⚡ Redis caching for faster analysis
- 🐳 Dockerized deployment
- 🔄 Background worker processing

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- Redis

### Authentication
- NextAuth.js
- Google OAuth
- Credentials Authentication

### AI
- Groq API
- Llama 3.3 70B Versatile

### Cloud
- AWS S3
- Docker
- Docker Compose

---

## 📸 Screenshots

### Dashboard

> Add dashboard screenshot here

### Resume Analysis

> Add ATS analysis screenshot here

### Resume Tailoring

> Add tailoring screenshot here

---

## ⚙️ Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

AUTH_SECRET=
AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

AI_PROVIDER=groq

GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

REDIS_URL=
```

---

## 🚀 Running Locally

Clone the repository

```bash
git clone https://github.com/GanapuramSharath/AI-resume-analyzer.git
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate deploy
```

Start development server

```bash
npm run dev
```

---

## 🐳 Docker

Build and start containers

```bash
docker compose up --build
```

Stop containers

```bash
docker compose down
```

---

## 📂 Project Structure

```
app/
components/
lib/
services/
workers/
prisma/
public/
```

---

## 🎥 Demo

Live Demo:

```
https://your-domain.com
```

Demo Video:

```
https://youtu.be/your-video
```

---

## 📈 Future Improvements

- Resume version comparison
- AI Interview Preparation
- Cover Letter Generator
- Recruiter Dashboard
- Resume Templates
- Analytics Dashboard

---

## 👨‍💻 Author

**Sharath Teja**

GitHub:
https://github.com/GanapuramSharath

LinkedIn:
https://www.linkedin.com/in/sharath-teja-ganapuram-340246259/
Live Demo:http://sharathairesume.duckdns.org:3000/

---

⭐ If you found this project useful, consider giving it a star.
