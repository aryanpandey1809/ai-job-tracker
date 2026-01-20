export default function ApplyPopup({ job, onSelect }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-2">Apply Confirmation</h3>
        <p className="mb-4">Did you apply to <strong>{job.title}</strong> at <strong>{job.company}</strong>?</p>
        
        <div className="space-y-2">
          <button 
            onClick={() => onSelect("Applied")}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Yes, Applied Now
          </button>
          <button 
            onClick={() => onSelect("Browsing")}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
            No, Just Browsing
          </button>
          <button 
            onClick={() => onSelect("Earlier")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            Applied Earlier
          </button>
        </div>
        
        <button 
          onClick={() => onSelect(null)}
          className="w-full mt-3 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}