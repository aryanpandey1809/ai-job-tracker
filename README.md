# AI Job Tracker

An AI-powered job tracking application that helps users find and apply to jobs with intelligent matching and assistance.

## 🚀 Features

- **Smart Job Matching**: Uses AI to match jobs to your resume and skills
- **Resume Parsing**: Upload PDF, DOCX, or TXT resumes for analysis
- **Application Tracking**: Track your job applications and statuses
- **AI Assistant**: Get career advice and job recommendations from an AI assistant
- **Job Filtering**: Filter jobs by location, type, and keywords
- **Real-time Updates**: See how well each job matches your skills

## 🛠️ Tech Stack

- **Backend**: Fastify (Node.js)
- **Frontend**: React + Tailwind CSS
- **AI Integration**: OpenAI API for job matching and chat assistance
- **Database**: Redis for storing user state and applications
- **File Processing**: PDF parsing and DOCX processing

## 📁 Project Structure

```
ai-job-tracker/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── jobs.js
│   │   │   ├── resume.js
│   │   │   ├── apply.js
│   │   │   └── chat.js
│   │   ├── services/
│   │   │   ├── aiMatch.js
│   │   │   └── resumeParser.js
│   │   ├── data/jobs.json
│   │   ├── redis.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── JobCard.jsx
    │   │   ├── Filters.jsx
    │   │   ├── ResumeUpload.jsx
    │   │   ├── ApplyPopup.jsx
    │   │   └── ChatSidebar.jsx
    │   ├── pages/
    │   │   ├── Jobs.jsx
    │   │   └── Dashboard.jsx
    │   ├── api/api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── tailwind.config.js
```

## 🔧 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Add your API keys to the `.env` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
REDIS_URL=your_redis_connection_string_here
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🤖 AI Features

### Job Matching
The AI analyzes your resume and compares it with job descriptions to provide a percentage match along with reasons for the score.

### Chat Assistant
Ask the AI assistant questions about jobs, career advice, or skills improvement. The assistant has access to all available job listings.

## 🗄️ Database Schema

The application uses Redis for storing:
- Uploaded resume text (`resume` key)
- Application statuses (`applications` hash)

## 🌐 API Endpoints

### Jobs
- `GET /jobs` - Get all jobs with match scores
- `POST /resume` - Upload and parse resume
- `POST /apply` - Record job application status
- `POST /chat` - Chat with AI assistant

## 🚀 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the root directory to `/backend`
4. Add your environment variables
5. Deploy!

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Create a new project
3. Set the framework preset to Vite
4. Deploy!

### Redis (Upstash)
1. Sign up at Upstash
2. Create a new Redis database
3. Add the connection URL to your environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.