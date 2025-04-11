import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    OAuthProvider,
    updateProfile
  } from 'firebase/auth';
  import { auth } from '../firebase';
import cloudLogo from '../assets/logo1.webp';
import signupIllustration from '../assets/signup.svg';
import loginIllustration from '../assets/login.svg'; 

const AuthPage = ({ initialState = "signup" }) => {
    const [isFlipped, setIsFlipped] = useState(initialState === "login");
    const navigate = useNavigate();
    
    // Form states
    const [signupForm, setSignupForm] = useState({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    const [loginForm, setLoginForm] = useState({
      email: '',
      password: '',
      rememberMe: false
    });
    
    // Loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [loginError, setLoginError] = useState('');
    
    const flipCard = () => {
      setIsFlipped(!isFlipped);
      // Clear errors when switching forms
      setSignupError('');
      setLoginError('');
    };
    
    // Handle signup form changes
    const handleSignupChange = (e) => {
      const { name, value } = e.target;
      setSignupForm({
        ...signupForm,
        [name]: value
      });
    };
    
    // Handle login form changes
    const handleLoginChange = (e) => {
      const { name, value, type, checked } = e.target;
      setLoginForm({
        ...loginForm,
        [name]: type === 'checkbox' ? checked : value
      });
    };
    
    // Handle signup submission
    const handleSignup = async (e) => {
      e.preventDefault();
      setSignupError('');
      
      // Validate inputs
      if (signupForm.password !== signupForm.confirmPassword) {
        setSignupError('Passwords do not match');
        return;
      }
      
      if (signupForm.password.length < 6) {
        setSignupError('Password should be at least 6 characters');
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          signupForm.email, 
          signupForm.password
        );
        
        // Update user profile with full name
        await updateProfile(userCredential.user, {
          displayName: signupForm.fullName
        });
        
        // Redirect to dashboard after successful signup
        navigate('/dashboard');
      } catch (error) {
        console.error('Signup error:', error);
        let errorMessage = 'Failed to create an account.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak.';
        }
        
        setSignupError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Handle login submission
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoginError('');
      setIsLoading(true);
      
      try {
        // Sign in with email and password
        await signInWithEmailAndPassword(
          auth, 
          loginForm.email, 
          loginForm.password
        );
        
        // If successful, redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Failed to sign in.';
        
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid email or password.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many failed login attempts. Please try again later.';
        }
        
        setLoginError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Handle Google sign in
    const handleGoogleSignIn = async () => {
      setIsLoading(true);
      setSignupError('');
      setLoginError('');
      
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        
        // If successful, redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Google sign in error:', error);
        const errorMessage = 'Failed to sign in with Google.';
        
        if (isFlipped) {
          setLoginError(errorMessage);
        } else {
          setSignupError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    // Handle Apple sign in
    const handleAppleSignIn = async () => {
      setIsLoading(true);
      setSignupError('');
      setLoginError('');
      
      try {
        const provider = new OAuthProvider('apple.com');
        await signInWithPopup(auth, provider);
        
        // If successful, redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Apple sign in error:', error);
        const errorMessage = 'Failed to sign in with Apple.';
        
        if (isFlipped) {
          setLoginError(errorMessage);
        } else {
          setSignupError(errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-6">
        {/* Logo */}
        <div className="mb-4">
          <img src={cloudLogo} alt="Clouddey" className="h-8" />
        </div>
  
        {/* Auth Container with perspective for 3D effect */}
        <div className="max-w-5xl mx-auto w-full perspective-1000">
          <div 
            className={`relative preserve-3d duration-700 w-full ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ 
              transformStyle: 'preserve-3d', 
              transition: 'transform 0.7s',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Signup Card - Front */}
            <div 
              className="absolute backface-hidden w-full rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Left side - Signup Form */}
              <div className="md:w-5/12 bg-blue-900 p-6 md:p-8">
                <h1 className="text-white text-xl font-bold mb-4 text-center">Sign Up</h1>
                
                {signupError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4 text-xs">
                    {signupError}
                  </div>
                )}
                
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label className="block text-orange-500 mb-1 text-sm">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={signupForm.fullName}
                      onChange={handleSignupChange}
                      className="w-full p-2 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-orange-500 mb-1 text-sm">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={signupForm.email}
                      onChange={handleSignupChange}
                      className="w-full p-2 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-orange-500 mb-1 text-sm">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={signupForm.password}
                      onChange={handleSignupChange}
                      className="w-full p-2 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-orange-500 mb-1 text-sm">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={signupForm.confirmPassword}
                      onChange={handleSignupChange}
                      className="w-full p-2 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-3 text-center">
                    <p className="text-white text-xs">
                      Already have an account? <button type="button" onClick={flipCard} className="text-orange-500 hover:underline">Login</button>
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 text-white py-2 rounded font-medium hover:bg-orange-600 transition duration-300 text-sm uppercase disabled:opacity-50"
                  >
                    {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                  </button>
                  
                  <div className="text-center my-2 text-white text-xs">or</div>
                  
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full bg-white text-gray-800 py-2 rounded font-medium mb-2 flex items-center justify-center text-xs disabled:opacity-50"
                  >
                    <FcGoogle className="mr-2" />
                    Sign up with Google
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleAppleSignIn}
                    disabled={isLoading}
                    className="w-full bg-white text-gray-800 py-2 rounded font-medium flex items-center justify-center text-xs disabled:opacity-50"
                  >
                    <FaApple className="mr-2" />
                    Sign up with Apple
                  </button>
                </form>
              </div>
              
              {/* Right side - Signup Illustration */}
              <div className="md:w-7/12 bg-gray-100 flex items-center justify-center p-4">
                <img 
                  src={signupIllustration} 
                  alt="File synchronization illustration" 
                  className="max-w-full h-auto"
                />
              </div>
            </div>
  
            {/* Login Card - Back */}
            <div 
              className="absolute backface-hidden w-full rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row rotate-y-180"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {/* Left side - Login Illustration */}
              <div className="md:w-7/12 bg-gray-100 flex items-center justify-center p-4">
                <img 
                  src={loginIllustration || signupIllustration} 
                  alt="File synchronization illustration" 
                  className="max-w-full h-auto"
                />
              </div>
              
              {/* Right side - Login Form */}
              <div className="md:w-5/12 bg-blue-900 p-6 md:p-8">
                <h1 className="text-white text-xl font-bold mb-4 text-center">Login</h1>
                
                {loginError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4 text-xs">
                    {loginError}
                  </div>
                )}
                
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="block text-orange-500 mb-1 text-sm">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      className="w-full p-2 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-orange-500 mb-1 text-sm">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      className="w-full p-2 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="rememberMe" 
                        name="rememberMe"
                        checked={loginForm.rememberMe}
                        onChange={handleLoginChange}
                        className="mr-1 h-3 w-3" 
                      />
                      <label htmlFor="rememberMe" className="text-white text-xs">Remember me</label>
                    </div>
                    <a href="#" className="text-orange-500 text-xs hover:underline">Forgot password?</a>
                  </div>
                  
                  <div className="mb-3 text-center">
                    <p className="text-white text-xs">
                      Don't have an account? <button type="button" onClick={flipCard} className="text-orange-500 hover:underline">Sign Up</button>
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 text-white py-2 rounded font-medium hover:bg-orange-600 transition duration-300 text-sm uppercase disabled:opacity-50"
                  >
                    {isLoading ? 'LOGGING IN...' : 'LOGIN'}
                  </button>
                  
                  <div className="text-center my-2 text-white text-xs">or</div>
                  
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full bg-white text-gray-800 py-2 rounded font-medium mb-2 flex items-center justify-center text-xs disabled:opacity-50"
                  >
                    <FcGoogle className="mr-2" />
                    Login with Google
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleAppleSignIn}
                    disabled={isLoading}
                    className="w-full bg-white text-gray-800 py-2 rounded font-medium flex items-center justify-center text-xs disabled:opacity-50"
                  >
                    <FaApple className="mr-2" />
                    Login with Apple
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AuthPage;