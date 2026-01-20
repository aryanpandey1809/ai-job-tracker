import { useState, useEffect } from 'react';
import ResumeUpload from '../components/ResumeUpload';
import ChatSidebar from '../components/ChatSidebar';

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    appliedJobs: 0,
    matchedJobs: 0
  });

  // Mock stats - in a real app, these would come from the backend
  useEffect(() => {
    // Simulate fetching stats
    setStats({
      totalJobs: 5,
      appliedJobs: 2,
      matchedJobs: 3
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Tracker Dashboard</h1>
        <button 
          onClick={() => setChatOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <span>AI Assistant</span>
          <span className="ml-2 bg-white text-blue-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">?</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Jobs</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalJobs}</p>
          <p className="text-gray-500 mt-1">Available positions</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Applied Jobs</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.appliedJobs}</p>
          <p className="text-gray-500 mt-1">Submitted applications</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Matched Jobs</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.matchedJobs}</p>
          <p className="text-gray-500 mt-1">Good fit for your skills</p>
        </div>
      </div>

      {/* Resume Upload Section */}
      <ResumeUpload />

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <p className="font-medium">Applied to Frontend Developer at Google</p>
            <p className="text-gray-500 text-sm">2 hours ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <p className="font-medium">Resume uploaded successfully</p>
            <p className="text-gray-500 text-sm">Yesterday</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-1">
            <p className="font-medium">Found 3 jobs with 70%+ match</p>
            <p className="text-gray-500 text-sm">2 days ago</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="/jobs" 
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center transition-colors"
          >
            Browse Jobs
          </a>
          <button 
            onClick={() => setChatOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-center transition-colors"
          >
            Ask AI Assistant
          </button>
        </div>
      </div>

      {/* Chat Sidebar */}
      <ChatSidebar isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}