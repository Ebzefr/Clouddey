import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import api from '../services/api';
import { Home, Smartphone, Share2, Star, Trash2, Clock, Save, Plus, Folder, Users, MoreVertical } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(5); // Default 5GB for free users
  const navigate = useNavigate();

  // Fetch user data and files on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        try {
          // Fetch user storage info from your Django backend
          const userResponse = await api.get('/user-profile/');
          setStorageUsed(userResponse.data.storage_used); // in GB
          setStorageLimit(userResponse.data.storage_limit); // in GB
          
          // Fetch files and folders
          const filesResponse = await api.get('/files/');
          const foldersResponse = await api.get('/folders/');
          
          setFiles(filesResponse.data);
          setFolders(foldersResponse.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // User is not logged in, redirect to login
        navigate('/auth');
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);
  
  // Calculate storage percentage
  const storagePercentage = (storageUsed / storageLimit) * 100;
  
  // Handle file/folder creation
  const handleCreateFile = () => {
    // Implement file upload functionality
    console.log("Create new file");
  };
  
  const handleCreateFolder = () => {
    // Implement folder creation
    console.log("Create new folder");
  };
  
  const handleCreateTeam = () => {
    // Implement team creation
    console.log("Create new team");
  };
  
  // Handle file actions (download, share, delete, etc.)
  const handleFileAction = (fileId, action) => {
    console.log(`Perform ${action} on file ${fileId}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-48 bg-blue-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <img src="/clouddey-logo.svg" alt="Clouddey" className="h-8" />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="pt-2">
            <li className="px-4 py-3 flex items-center hover:bg-blue-800 cursor-pointer">
              <Home size={18} className="mr-3" />
              <span>My Cloud</span>
            </li>
            <li className="px-4 py-3 flex items-center hover:bg-blue-800 cursor-pointer">
              <Smartphone size={18} className="mr-3" />
              <span>Devices</span>
            </li>
            <li className="px-4 py-3 flex items-center hover:bg-blue-800 cursor-pointer">
              <Share2 size={18} className="mr-3" />
              <span>Shared</span>
            </li>
            <li className="px-4 py-3 flex items-center hover:bg-blue-800 cursor-pointer">
              <Star size={18} className="mr-3" />
              <span>Starred</span>
            </li>
            <li className="px-4 py-3 flex items-center hover:bg-blue-800 cursor-pointer">
              <Trash2 size={18} className="mr-3" />
              <span>Trash</span>
            </li>
            <li className="px-4 py-3 flex items-center hover:bg-blue-800 cursor-pointer">
              <Clock size={18} className="mr-3" />
              <span>Recently</span>
            </li>
            <li className="px-4 py-3 flex items-center hover:bg-blue-800 cursor-pointer">
              <Save size={18} className="mr-3" />
              <span>Backups</span>
            </li>
          </ul>
        </nav>
        
        {/* Storage Section */}
        <div className="p-4">
          <h3 className="text-sm mb-2">Storage</h3>
          <div className="h-2 bg-gray-700 rounded-full mb-2">
            <div 
              className="h-2 bg-orange-500 rounded-full" 
              style={{ width: `${storagePercentage}%` }}
            ></div>
          </div>
          <p className="text-sm">{storageUsed}GB of {storageLimit}GB used</p>
          
          <button 
            className="mt-4 bg-orange-500 text-white rounded-md text-sm py-2 px-4 w-full hover:bg-orange-600"
          >
            Upgrade Storage
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          {/* Search Bar */}
          <div className="w-1/2">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-gray-200 rounded-md py-2 px-4"
            />
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-orange-500 hover:text-orange-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            
          </div>
        </header>
        
        {/* Content Area */}
        <main className="p-6">
          {/* Create New Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div 
              onClick={handleCreateFile}
              className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center flex-col hover:shadow-md cursor-pointer border"
            >
              <div className="text-gray-400 mb-2">
                <Plus size={24} />
              </div>
              <h3 className="text-lg font-medium">New File</h3>
            </div>
            
            <div 
              onClick={handleCreateFolder}
              className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center flex-col hover:shadow-md cursor-pointer border"
            >
              <div className="text-gray-400 mb-2">
                <Folder size={24} />
              </div>
              <h3 className="text-lg font-medium">New Folder</h3>
            </div>
            
            <div 
              onClick={handleCreateTeam}
              className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center flex-col hover:shadow-md cursor-pointer border"
            >
              <div className="text-gray-400 mb-2">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-medium">New Team</h3>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-2 mb-6">
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'files' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setActiveTab('files')}
            >
              Files
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${activeTab === 'folders' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setActiveTab('folders')}
            >
              Folders
            </button>
          </div>
          
          {/* Files/Folders Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : files.length === 0 && folders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700">No files yet</h3>
              <p className="text-gray-500 mt-2">Upload a file or create a folder to get started</p>
              <button 
                onClick={handleCreateFile}
                className="mt-4 bg-orange-500 text-white rounded-md py-2 px-6 hover:bg-orange-600"
              >
                Upload File
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {files.map((file) => (
                <div key={file.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-200">
                    <div className="flex items-center">
                      <div className="bg-blue-500 text-white p-1 rounded mr-2">
                        <span className="text-xs">W</span>
                      </div>
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <button 
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => handleFileAction(file.id, 'menu')}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <div className="p-4 bg-white h-48 flex items-center justify-center">
                    {file.thumbnail ? (
                      <img src={file.thumbnail} alt={file.name} className="max-h-full" />
                    ) : (
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-500">Preview not available</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;