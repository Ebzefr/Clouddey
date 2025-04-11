// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroImage from '../assets/hero-image.svg';
import fileSharing from '../assets/file-sharing.svg';
import syncAcross from '../assets/sync-across.svg';
import teamCollaboration from '../assets/team-collaboration.svg';
import step1 from '../assets/step1.svg';
import step2 from '../assets/step2.svg';
import step3 from '../assets/step3.svg';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              An innovative approach for storing and sharing your files online
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Clouddey is a secure file manager that allows you to store, share, and access your files from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
  to="/signup" 
  style={{ backgroundColor: '#F36404' }}
  className="hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg text-center transition duration-300"
>
  Get Started
</Link>
              <Link 
                to="/login" 
                className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 text-center transition duration-300"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src={heroImage} alt="Cloud storage illustration" className="w-full" />
          </div>
        </div>
      </section>
      
      {/* Value Props Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Speed. Security. Simplicity — without the markup.
          </h2>
          <p className='mb-6 text-center'>You can choose continue to use centralized cloud storage but we have some better reasons for you to start moving 
            to decentralized storage because it is simply the future of the internet.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Speed Card */}
            <div className="bg-blue-900 text-white rounded-lg p-8">
              <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Speed</h3>
              <p className="mb-4">Fast uploads and downloads with optimized file transfer technology</p>
              <a href="#" className="text-sm font-medium underline">Learn more →</a>
            </div>
            
            {/* Security Card */}
            <div className="bg-orange-500 text-white rounded-lg p-8">
              <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Security</h3>
              <p className="mb-4">End-to-end encryption keeps your files safe and private</p>
              <a href="#" className="text-sm font-medium underline">Learn more →</a>
            </div>
            
            {/* No subscription Card */}
            <div className="bg-blue-900 text-white rounded-lg p-8">
              <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">No subscription</h3>
              <p className="mb-4">Straightforward pricing with no hidden fees or complicated terms</p>
              <a href="#" className="text-sm font-medium underline">Learn more →</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Collaboration Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">
          Streamlined interface, built for effortless <span className="text-orange-500">team collaboration</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-8">
          {/* File Sharing Card */}
          <div className="bg-orange-100 rounded-lg p-8">
            <h3 className="text-xl text-blue-900 text-center font-bold mb-3">File Sharing</h3>
            <p className="mb-6">Securely share files with anyone — teammates or external 
              partners — while staying in control with access settings, edit tracking, and smart content analytics.</p>
            <img src={fileSharing} alt="File sharing" className="mt-6 w-full" />
          </div>
          
          {/* Sync Across Card */}
          <div className="bg-blue-600 text-white rounded-lg p-8">
            <h3 className="text-xl text-center font-bold mb-3">Sync Devices</h3>
            <p className="mb-6">Seamlessly sync and receive files across all your devices in a secure environment-with one Clouddey account. 
              Whether you're on desktop, tablet, or mobile, your files stay up-to-date and accessible anytime, anywhere.</p>
            <img src={syncAcross} alt="Sync across devices" className="mt-6 w-full" />
          </div>
        </div>
        
        {/* Team collaboration card */}
        <div className="bg-orange-100 rounded-lg p-8">
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold mb-3">Team collaboration <span className="text-orange-500">made easy</span></h3>
            <p className="mb-6 text-gray-700">Securely share and work together with Clouddey simple file storage and sharing, 
              easy user management, unlimited file size, password protected links and more.</p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium">Get Started</a>
              <a href="#" className="text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300">Learn more</a>
            </div>
          </div>
          <img src={teamCollaboration} alt="Team collaboration" className="mt-6 w-full" />
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3 text-center">Pricing Plan</h2>
          <p className="text-center text-gray-600 mb-12">Access to complete feature-packed storage solution with simple and transparent pricing</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Free</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold">$0.99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <a href="#" className="block bg-gray-200 text-gray-800 text-center py-2 rounded-lg font-medium mb-6">Select</a>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    5 GB Storage
                  </li>
                  {/* More list items */}
                </ul>
              </div>
            </div>
            
            {/* Basic Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden ring-2 ring-orange-500">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Basic</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold">$1.99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <a href="#" className="block bg-orange-500 text-white text-center py-2 rounded-lg font-medium mb-6">Select</a>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    50 GB Storage
                  </li>
                  {/* More list items */}
                </ul>
              </div>
            </div>
            
            {/* Standard Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Standard</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl font-bold">$2.99</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <a href="#" className="block bg-gray-200 text-gray-800 text-center py-2 rounded-lg font-medium mb-6">Select</a>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    500 GB Storage
                  </li>
                  {/* More list items */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How it works?</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Clouddey makes collaboration and file sharing seamless that allows users to store and manage files online and share them with others.
        </p>
        
        <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-0">
            <div className="bg-orange-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="text-lg font-bold mb-2">Create an account</h3>
            <img src={step1} alt="Create account" className="mt-4" />
          </div>
          
          {/* Dotted line connectors */}
          <div className="hidden md:block border-t-2 border-dashed border-gray-300 flex-1 mx-4"></div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-0">
            <div className="bg-orange-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="text-lg font-bold mb-2">Upload your files</h3>
            <img src={step2} alt="Upload files" className="mt-4" />
          </div>
          
          {/* Dotted line connectors */}
          <div className="hidden md:block border-t-2 border-dashed border-gray-300 flex-1 mx-4"></div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-500 text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="text-lg font-bold mb-2">Share file instantly</h3>
            <img src={step3} alt="Share files" className="mt-4" />
          </div>
        </div>
      </section>
      
      {/* Ready to get started Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Ready to get started?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Whether you're an individual or business, Clouddey has the right solution for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Individual */}
          <div className="bg-blue-900 text-white rounded-lg p-8 flex items-start">
            <div className="mr-6">
              <div className="bg-white text-blue-900 h-10 w-10 rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Are you an individual?</h3>
              <p className="mb-6">
                Perfect for freelancers and individuals looking for a simple solution to store and share files.
              </p>
              <a href="#" className="bg-white text-blue-900 px-6 py-2 rounded-lg font-medium">Get Started</a>
            </div>
          </div>
          
          {/* Business */}
          <div className="bg-orange-100 rounded-lg p-8 flex items-start">
            <div className="mr-6">
              <div className="bg-orange-500 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Are you business?</h3>
              <p className="mb-6 text-gray-700">
                Perfect for teams and businesses looking to enhance collaboration and file management.
              </p>
              <a href="#" className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;