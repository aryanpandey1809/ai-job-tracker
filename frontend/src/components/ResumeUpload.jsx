import { useState } from 'react';

export default function ResumeUpload({ onUpload }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      const response = await fetch('http://localhost:4000/resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Resume uploaded successfully!');
        onUpload && onUpload();
      } else {
        setUploadStatus('Failed to upload resume');
      }
    } catch (error) {
      setUploadStatus('Error uploading resume');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Upload Your Resume</h3>
      <p className="text-gray-600 text-sm mb-3">Upload a PDF, DOCX, or TXT file to get personalized job recommendations</p>
      
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFileUpload}
        disabled={isUploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          disabled:opacity-50"
      />
      
      {isUploading && (
        <p className="mt-2 text-blue-600 text-sm">Processing your resume...</p>
      )}
      
      {uploadStatus && !isUploading && (
        <p className={`mt-2 text-sm ${uploadStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
}