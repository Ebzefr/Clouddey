// src/utils/firebaseStorage.js
import { 
    ref, 
    uploadBytesResumable, 
    getDownloadURL, 
    deleteObject,
    listAll,
    getMetadata
  } from 'firebase/storage';
  import { storage } from '../firebase';
  import api from '../services/api';
  
  /**
   * Upload a file to Firebase Storage and register it with the backend
   * @param {File} file - The file to upload
   * @param {String} folderId - Optional folder ID
   * @param {Function} onProgress - Optional callback for upload progress
   * @returns {Promise} - Resolves with file data from the backend
   */
  export const uploadFile = async (file, folderId = null, onProgress = null) => {
    // Generate a unique storage path
    const userId = auth.currentUser.uid;
    const timestamp = new Date().getTime();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const storagePath = `user_files/${userId}${folderId ? `/${folderId}` : ''}/${timestamp}_${sanitizedFileName}`;
    
    // Create a storage reference
    const storageRef = ref(storage, storagePath);
    
    // Start the upload
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Return a promise that resolves when upload is complete
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          
          // Call progress callback if provided
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          // Handle successful upload
          try {
            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Register file with backend
            const fileData = {
              name: file.name,
              firebase_storage_path: storagePath,
              size: file.size, 
              mime_type: file.type || 'application/octet-stream',
              parent_folder: folderId,
              download_url: downloadURL
            };
            
            // Send file metadata to Django backend
            const response = await api.post('/files/', fileData);
            resolve(response.data);
          } catch (error) {
            console.error('Failed to register file with backend:', error);
            
            // Delete the uploaded file from Firebase if backend registration fails
            try {
              await deleteObject(storageRef);
            } catch (deleteError) {
              console.error('Failed to delete orphaned file:', deleteError);
            }
            
            reject(error);
          }
        }
      );
    });
  };
  
  /**
   * Download a file from Firebase Storage
   * @param {Object} fileObj - File object containing firebase_storage_path
   * @returns {Promise} - Resolves with download URL
   */
  export const downloadFile = async (fileObj) => {
    try {
      const storageRef = ref(storage, fileObj.firebase_storage_path);
      const url = await getDownloadURL(storageRef);
      
      // Create an anchor element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileObj.name;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      return url;
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  };
  
  /**
   * Delete a file from Firebase Storage and the backend
   * @param {Object} fileObj - File object to delete
   * @returns {Promise} - Resolves when deletion is complete
   */
  export const deleteFile = async (fileObj) => {
    try {
      // Delete from Firebase Storage
      const storageRef = ref(storage, fileObj.firebase_storage_path);
      await deleteObject(storageRef);
      
      // Delete from backend
      await api.delete(`/files/${fileObj.id}/`);
      
      return { success: true };
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  };
  
  /**
   * Get file metadata from Firebase Storage
   * @param {String} path - Firebase storage path
   * @returns {Promise} - Resolves with file metadata
   */
  export const getFileMetadata = async (path) => {
    try {
      const storageRef = ref(storage, path);
      return await getMetadata(storageRef);
    } catch (error) {
      console.error('Failed to get metadata:', error);
      throw error;
    }
  };
  
  /**
   * List all files in a directory
   * @param {String} path - Directory path
   * @returns {Promise} - Resolves with array of references
   */
  export const listFiles = async (path) => {
    try {
      const storageRef = ref(storage, path);
      return await listAll(storageRef);
    } catch (error) {
      console.error('Failed to list files:', error);
      throw error;
    }
  };
  
  /**
   * Copy a file to a new location
   * @param {String} sourcePath - Source file path
   * @param {String} destinationPath - Destination path
   * @returns {Promise} - Resolves when copy is complete
   */
  export const copyFile = async (sourcePath, destinationPath) => {
    try {
      // Get the file data
      const sourceRef = ref(storage, sourcePath);
      const url = await getDownloadURL(sourceRef);
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Upload to new location
      const destRef = ref(storage, destinationPath);
      await uploadBytesResumable(destRef, blob);
      
      return { success: true, path: destinationPath };
    } catch (error) {
      console.error('Failed to copy file:', error);
      throw error;
    }
  };
  
  /**
   * Upload multiple files with progress tracking
   * @param {Array} files - Array of File objects
   * @param {String} folderId - Optional folder ID
   * @param {Function} onTotalProgress - Callback for total progress
   * @param {Function} onFileComplete - Callback when a file completes
   * @returns {Promise} - Resolves when all uploads complete
   */
  export const uploadMultipleFiles = async (files, folderId = null, onTotalProgress = null, onFileComplete = null) => {
    const totalFiles = files.length;
    let completedFiles = 0;
    let totalProgress = 0;
    
    const uploadPromises = Array.from(files).map((file, index) => {
      return uploadFile(
        file,
        folderId,
        (progress) => {
          // Calculate total progress across all files
          const fileWeight = 1 / totalFiles;
          const oldFileProgress = totalProgress / totalFiles * index;
          const newFileProgress = progress / 100 * fileWeight;
          
          totalProgress = totalProgress - oldFileProgress + newFileProgress;
          
          if (onTotalProgress) {
            onTotalProgress(totalProgress);
          }
        }
      ).then(result => {
        completedFiles++;
        
        if (onFileComplete) {
          onFileComplete(result, completedFiles, totalFiles);
        }
        
        return result;
      });
    });
    
    return Promise.all(uploadPromises);
  };
  
  /**
   * Generate a unique filename to avoid collisions
   * @param {String} originalName - Original filename
   * @returns {String} - Unique filename
   */
  export const generateUniqueFilename = (originalName) => {
    const timestamp = new Date().getTime();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop();
    const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
    
    return `${baseName}_${timestamp}_${randomStr}.${extension}`;
  };
  
  // Helper function to calculate file size display
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };