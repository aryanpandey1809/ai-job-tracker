import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseResume(file) {
  const buffer = await file.toBuffer();
  
  // Check if it's a PDF file
  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } 
  // Handle text files
  else if (file.mimetype.startsWith('text/')) {
    return buffer.toString('utf8');
  } 
  // Handle DOCX files
  else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer: buffer });
    return result.value;
  }
  
  throw new Error('Unsupported file type. Please upload a PDF, TXT, or DOCX file.');
}