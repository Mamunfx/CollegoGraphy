"use client";

import { useEffect, useState } from "react";

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchColleges() {
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data);
      setLoading(false);
    }
    fetchColleges();
  }, []);

  if (loading) {
    return <div>Loading colleges...</div>;
  }

  return (
    <div>
      <h1>Colleges List</h1>
      {colleges.length === 0 ? (
        <p>No colleges found.</p>
      ) : (
        colleges.map((college) => (
          <div key={college._id} className="college-card">
            <h2>{college.name}</h2>
            <p>{college.description}</p>
            <p>Location: {college.location}</p>
            <p>Established: {college.established}</p>
            {college.reviews?.map((review, index) => (
              <div key={index}>
                <p>{review.userEmail}</p>
                <p><strong>Review {index + 1}:</strong> {review.comment}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
