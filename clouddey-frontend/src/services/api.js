// src/services/api.js
import axios from 'axios';
import { auth } from '../firebase';

const API_URL = 'http://localhost:8000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the Firebase token to each request
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API endpoints
export const filesApi = {
  getFiles: (folderId = null) => {
    const params = folderId ? { folder: folderId } : {};
    return api.get('/files/', { params });
  },
  uploadFile: (file, folderId = null) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) {
      formData.append('parent_folder', folderId);
    }
    return api.post('/files/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteFile: (fileId) => api.delete(`/files/${fileId}/`),
  starFile: (fileId) => api.post(`/files/${fileId}/star/`),
  trashFile: (fileId) => api.post(`/files/${fileId}/trash/`),
};

export const foldersApi = {
  getFolders: (parentId = null) => {
    const params = parentId ? { folder: parentId } : {};
    return api.get('/folders/', { params });
  },
  getFolderContents: (folderId) => api.get(`/folders/${folderId}/contents/`),
  createFolder: (name, parentId = null) => {
    const data = { name };
    if (parentId) {
      data.parent_folder = parentId;
    }
    return api.post('/folders/', data);
  },
  deleteFolder: (folderId) => api.delete(`/folders/${folderId}/`),
};

export const sharingApi = {
  getSharedItems: () => api.get('/shared/'),
  shareItem: (itemType, itemId, userEmail, permission = 'view') => {
    return api.post('/shared/', {
      [itemType]: itemId,
      shared_with: userEmail,
      permission,
    });
  },
  updatePermission: (shareId, permission) => {
    return api.patch(`/shared/${shareId}/`, { permission });
  },
  removeShare: (shareId) => api.delete(`/shared/${shareId}/`),
};

export default api;