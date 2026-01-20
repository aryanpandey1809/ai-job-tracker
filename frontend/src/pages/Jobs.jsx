import { useEffect, useState } from "react";
import { getJobs, applyJob } from "../api/api";
import JobCard from "../components/JobCard";
import ApplyPopup from "../components/ApplyPopup";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [popupJob, setPopupJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: ''
  });

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    // Apply client-side filtering
    let result = jobs;
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.location) {
      result = result.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.type) {
      result = result.filter(job => 
        job.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    setFilteredJobs(result);
  }, [jobs, filters]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const apply = (job) => {
    window.open(job.applyUrl, "_blank");
    setPopupJob(job);
  };

  const confirm = async (status) => {
    if (status) {
      await applyJob({ jobId: popupJob.id, status });
    }
    setPopupJob(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Dream Job</h1>
      
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location..."
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      
      {/* Job Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      </div>
      
      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading jobs...</p>
        </div>
      ) : (
        /* Job Listings */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onApply={apply} />
          ))}
        </div>
      )}
      
      {/* No Jobs Found Message */}
      {!loading && filteredJobs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
      
      {/* Apply Popup */}
      <ApplyPopup job={popupJob} onSelect={confirm} />
    </div>
  );
}