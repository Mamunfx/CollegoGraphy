"use client"; // This directive marks the component as a Client Component

import React, { useState } from 'react';
import { Mail, User, Image, Lock, Loader2 } from 'lucide-react'; // Importing icons from lucide-react

// The main page component that will render the registration form
const page = () => {
  // State variables for form fields
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State variables for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Basic client-side validation
    if (!userEmail || !userName || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      // Construct the data payload for the API
      const response = await fetch('/api/users', { // Assuming your POST endpoint is at /api/users
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          userName,
          photoURL,
          password, // In a real application, you'd hash the password on the backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Registration successful!');
        // Clear form fields on success
        setUserEmail('');
        setUserName('');
        setPhotoURL('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Network error during registration:', error);
      setErrorMessage('Network error. Please check your connection.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Create Your Account
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Join us and unlock a world of possibilities!
        </p>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 text-sm" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="userEmail" className="sr-only">Email Address</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Email Address"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="userName" className="sr-only">Full Name</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="name"
                required
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Photo URL Input */}
          <div>
            <label htmlFor="photoURL" className="sr-only">Photo URL (Optional)</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                autoComplete="photo"
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Photo URL (Optional)"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent  font-medium rounded-full text-white bg-black  shadow-lg hover:shadow-xl text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;