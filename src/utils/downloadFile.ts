/**
 * Creates and triggers a download for a file with the given content
 * 
 * @param content - The file content
 * @param fileName - The name of the file to download
 * @param contentType - The content type of the file (default: 'text/plain')
 */
export const downloadFile = (
  content: string,
  fileName: string,
  contentType = 'text/plain'
): void => {
  // Create a blob with the content and appropriate content type
  const blob = new Blob([content], { type: `${contentType};charset=utf-8` });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  
  // Append to the document temporarily
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}; 