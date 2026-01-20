export default function JobCard({ job, onApply }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company} • {job.location}</p>
          <p className="text-sm text-gray-500 mt-1">{job.type}</p>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          job.score > 70 ? "bg-green-100 text-green-800" :
          job.score > 40 ? "bg-yellow-100 text-yellow-800" : 
          "bg-gray-100 text-gray-800"
        }`}>
          Match: {job.score}%
        </span>
      </div>
      
      <p className="mt-2 text-gray-700 text-sm">{job.description}</p>
      
      <div className="mt-3 flex flex-wrap gap-1">
        {job.skills.map((skill, index) => (
          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
            {skill}
          </span>
        ))}
      </div>
      
      <button 
        onClick={() => onApply(job)}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
        Apply
      </button>
    </div>
  );
}