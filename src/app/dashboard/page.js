"use client";

import { useSession, signOut } from "next-auth/react"; 
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [message, setMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (session?.user) {
      setUserName(session.user.name || session.user.email || "");
      setPhotoURL(session.user.image || "");
    }
  }, [status, router, session]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    if (!session?.user?.email) {
      setMessage("Error: User email not found.");
      setIsUpdating(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${session.user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          photoURL: photoURL,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(`Error updating profile: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      setMessage("An unexpected error occurred during profile update.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Loading session...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md md:max-w-lg lg:max-w-xl text-center">
          <div className="flex flex-col items-center mb-8">
            {session.user?.image || photoURL ? (
              <img
                src={photoURL || session.user?.image}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-black shadow-md mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/96x96/cccccc/333333?text=${(session.user?.name || session.user?.email || 'User').charAt(0).toUpperCase()}`;
                }}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-4xl font-bold mb-4">
                {(session.user?.name || session.user?.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
              Welcome, {session.user?.name || session.user?.email}!
            </h1>
            <p className="text-gray-600 text-lg">You are logged in.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="userName" className="block text-left text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="photoURL" className="block text-left text-sm font-medium text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoURL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </button>
            </form>

            {message && (
              <p className={`mt-4 text-sm ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}