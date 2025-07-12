"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AppliedCollegesPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch("/api/application");
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch applications.");
        }
      } catch (err) {
        console.error("Network error fetching applications:", err);
        setError("Could not connect to the server to fetch applications.");
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500">Loading applied colleges...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-white">
        <div className="alert alert-error shadow-lg w-auto max-w-md">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-black tracking-tight">
        My Applications 📝
      </h1>

      {applications.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-10">
          You haven't applied to any colleges yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8"> {/* Changed to a single column grid for horizontal cards */}
          {applications.map((application) => (
            <div key={application._id} className="card lg:card-side bg-base-100 shadow-xl compact">
              {application.collegeImageSrc && (
                <figure className="relative lg:w-1/3 w-full h-48 lg:h-auto">
                  <Image
                    src={application.collegeImageSrc}
                    alt={application.collegeName || "College"}
                    fill
                    className="object-cover lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl" // Rounded only on appropriate corners for horizontal layout
                    priority // Adjust priority based on your page structure
                  />
                </figure>
              )}

              <div className="card-body p-6 lg:w-2/3 w-full">
                {/* College Name and Logo */}
                <div className="flex items-center gap-4 mb-4">
                  {application.collegeLogo && (
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                        <Image
                          src={application.collegeLogo}
                          alt={`${application.collegeName} logo`}
                          width={48}
                          height={48}
                          className="rounded-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <h2 className="card-title text-3xl font-bold text-black">{application.collegeName}</h2>
                </div>

                {/* Applicant Info */}
                <p className="text-md text-gray-700 mb-4">
                  Applied by: <span className="font-semibold">{application.applicantName}</span>
                </p>

                {/* Application Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 mb-4">
                  <p>
                    <span className="font-medium">Email:</span> {application.applicantEmail}
                  </p>
                  <p>
                    <span className="font-medium">Application Date:</span> {application.applicationDate}
                  </p>
                  <p>
                    <span className="font-medium">Last Degree:</span> {application.previousEducation}
                  </p>
                  <p>
                    <span className="font-medium">GPA/CGPA:</span> {application.gpa}
                  </p>
                </div>

                {/* Personal Statement (optional) */}
                {application.personalStatement && (
                  <div className="bg-base-200 p-4 rounded-lg mb-4 shadow-inner">
                    <p className="font-medium text-gray-800 mb-1">Personal Statement:</p>
                    <p className="text-sm italic text-gray-600">
                      "{application.personalStatement.length > 200
                        ? application.personalStatement.substring(0, 200) + '...'
                        : application.personalStatement}"
                    </p>
                  </div>
                )}

                {/* College Review (as a sub-card/dedicated section) */}
                {application.collegeReview && (
                  <div className="card bg-info text-info-content shadow-md p-4 mt-4">
                    <div className="card-body p-0">
                      <h3 className="card-title text-xl font-semibold mb-2">Your Review:</h3>
                      <p className="text-sm leading-relaxed">
                        "{application.collegeReview}"
                      </p>
                    </div>
                  </div>
                )}

                <div className="card-actions justify-end mt-4">
                  {/* Optional: Add more actions or details button here */}
                  {/* <button className="btn btn-outline btn-sm">View Full Application</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}