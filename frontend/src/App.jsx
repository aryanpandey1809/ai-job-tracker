import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import ResumeUpload from './components/ResumeUpload';
import ChatSidebar from './components/ChatSidebar';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">AI Job Tracker</Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
            </nav>
            
            <button 
              onClick={() => setChatOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <span>AI Assistant</span>
              <span className="ml-2 bg-white text-blue-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">?</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 flex justify-around">
            <Link to="/" className="text-gray-700 hover:text-blue-600 py-2 px-4">Dashboard</Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 py-2 px-4">Jobs</Link>
          </div>
        </div>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12 py-6">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2026 AI Job Tracker. All rights reserved.</p>
          </div>
        </footer>

        {/* Chat Sidebar */}
        <ChatSidebar isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </Router>
  );
}

export default App;