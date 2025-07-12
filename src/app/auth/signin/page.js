// my-auth-app/app/auth/signin/page.js
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleCredentialsSignIn = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(result.error);
        }
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred during sign-in.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h1>
        </div>


        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}


        <form className="mt-8 space-y-6" onSubmit={handleCredentialsSignIn}>
          <div className="rounded-md shadow-sm space-y-8">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black rounded-full"
            >
              Sign In with Email
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 1792 1792"><path d="M896 786l-203 129q-12 8-27 8-15 0-27-8-12-8-12-23v-128q0-15 12-23l203-129q12-8 27-8 15 0 27 8zm205-242l203-129q12-8 27-8 15 0 27 8l-203 129q-12 8-27 8-15 0-27-8zm-410 0l-203-129q-12-8-27-8-15 0-27 8l203 129q12 8 27 8 15 0 27-8zm205-242l203-129q12-8 27-8 15 0 27 8l-203 129q-12 8-27 8-15 0-27-8zm-410 0l-203-129q-12-8-27-8-15 0-27 8l203 129q12 8 27 8 15 0 27-8zm205-242l203-129q12-8 27-8 15 0 27 8l-203 129q-12 8-27 8-15 0-27-8zm-410 0l-203-129q-12-8-27-8-15 0-27 8l203 129q12 8 27 8 15 0 27-8z"></path></svg>
            Sign In with Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c6.627 0 12-5.373 12-12s-5.373-12-12-12zm4.5 19h-1.5c-1.625 0-2.5.5-2.5 1.5v1h4v-2c0-1-1-1.5-2.5-1.5zm1.5-6c0-2.761-2.239-5-5-5s-5 2.239-5 5c0 1.381.5 2.625 1.5 3.5v1.5h7v-1.5c1-1 1.5-2.119 1.5-3.5zm-3-4c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm-6 9c.5-1 1.5-1.5 2.5-1.5h1.5c1 0 2.5.5 2.5 1.5v1h-7v-1z" clipRule="evenodd"/></svg>
            Sign In with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}