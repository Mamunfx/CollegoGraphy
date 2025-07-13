"use client";

import React, { useState } from 'react';
import { Mail, User, Image, Lock, Loader2 } from 'lucide-react';

const App = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!email || !fullName || !password || !confirmPassword) {
      setError('Please fill in all the required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Oops! Your passwords don\'t match. Please try again.');
      return;
    }
    if (password.length < 6) {
      setError('Your password needs to be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: email,
          userName: fullName,
          profilePictureUrl: profilePictureUrl,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      setSuccess('Success! Your account has been created. Welcome!');
      setEmail('');
      setFullName('');
      setProfilePictureUrl('');
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Something went wrong with your registration. Please give it another shot.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-[1.01] border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Create Your Account
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Join us and unlock a world of possibilities!
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 text-sm" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="profilePictureUrl" className="sr-only">Profile Picture URL (Optional)</label>
            <div className="relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image className="h-5 w-5 text-gray-400" aria-hidden="true" alt="photo" />
              </div>
              <input
                id="profilePictureUrl"
                name="profilePictureUrl"
                type="url"
                autoComplete="photo"
                className="appearance-none block w-full px-10 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Photo URL (Optional)"
                value={profilePictureUrl}
                onChange={(e) => setProfilePictureUrl(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

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
                disabled={isSubmitting}
              />
            </div>
          </div>

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
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent font-medium rounded-full text-white bg-black shadow-lg hover:shadow-xl text-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creating your account...
                </>
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

export default App;