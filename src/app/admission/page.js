"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function AdmissionPage() {
  const [colleges, setColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedCollegeToApply, setSelectedCollegeToApply] = useState(null);

  const [yourFullName, setYourFullName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [dateOfApplication, setDateOfApplication] = useState("");
  const [lastDegreeEarned, setLastDegreeEarned] = useState("");
  const [yourGpa, setYourGpa] = useState("");
  const [yourPersonalStatement, setYourPersonalStatement] = useState("");
  const [yourCollegeReview, setYourCollegeReview] = useState("");
  const [yourReviewRating, setYourReviewRating] = useState("");

  useEffect(() => {
    async function getColleges() {
      try {
        const response = await fetch("/api/colleges");
        const collegeData = await response.json();
        setColleges(collegeData);
      } catch (error) {
        console.error("Failed to load colleges:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getColleges();
  }, []);

  const initiateApplication = (college) => {
    setSelectedCollegeToApply(college);
    setIsApplicationModalOpen(true);
    setYourCollegeReview("");
    setYourReviewRating("");
  };

  const sendApplication = async (event) => {
    event.preventDefault();
    if (!selectedCollegeToApply) return;

    let existingCollegeReviews = [];
    try {
      const collegeDetailsResponse = await fetch(
        `/api/colleges/${selectedCollegeToApply._id}`
      );
      if (collegeDetailsResponse.ok) {
        const collegeDetails = await collegeDetailsResponse.json();
        if (collegeDetails.reviews && Array.isArray(collegeDetails.reviews)) {
          existingCollegeReviews = [...collegeDetails.reviews];
        }
      } else {
        console.warn(
          `Could not get reviews for ${selectedCollegeToApply.name}.`
        );
      }
    } catch (error) {
      console.error("Error fetching college reviews:", error);
    }

    let newApplicantReview = null;
    if (yourCollegeReview.trim() !== "") {
      newApplicantReview = {
        reviewerName: yourFullName,
        reviewerEmail: yourEmail,
        comment: yourCollegeReview,
        rating: yourReviewRating ? parseFloat(yourReviewRating) : null,
        createdAt: new Date().toISOString(),
        isFromCurrentApplicant: true,
      };
    }

    let combinedReviews = [...existingCollegeReviews];

    if (newApplicantReview) {
      const reviewIdentifier = `${newApplicantReview.reviewerEmail}-${newApplicantReview.comment}`;
      const reviewIndex = combinedReviews.findIndex(
        (review) => `${review.reviewerEmail}-${review.comment}` === reviewIdentifier
      );

      if (reviewIndex !== -1) {
        combinedReviews[reviewIndex] = newApplicantReview;
      } else {
        combinedReviews.push(newApplicantReview);
      }
    }

    combinedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const submittedApplicationData = {
      collegeId: selectedCollegeToApply._id,
      collegeName: selectedCollegeToApply.name,
      collegeImageSrc: selectedCollegeToApply.image_src,
      collegeLogo: selectedCollegeToApply.logo,
      applicantName: yourFullName,
      applicantEmail: yourEmail,
      applicationDate: dateOfApplication,
      previousEducation: lastDegreeEarned,
      gpa: parseFloat(yourGpa),
      personalStatement: yourPersonalStatement,
      allCollegeReviews: combinedReviews,
    };

    try {
      const submissionResponse = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittedApplicationData),
      });

      if (submissionResponse.ok) {
        alert(`Your application to ${selectedCollegeToApply.name} has been sent!`);
        setIsApplicationModalOpen(false);
        setYourFullName("");
        setYourEmail("");
        setDateOfApplication("");
        setLastDegreeEarned("");
        setYourGpa("");
        setYourPersonalStatement("");
        setYourCollegeReview("");
        setYourReviewRating("");
      } else {
        const errorDetails = await submissionResponse.json();
        alert(
          `Application failed: ${
            errorDetails.message || "Something went wrong. Please try again."
          }`
        );
      }
    } catch (error) {
      console.error("Network error during application submission:", error);
      alert("Could not connect to the server. Check your internet and try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500">Loading colleges...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-black tracking-tight">
        Ready to Apply
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college) => (
          <div
            key={college._id}
            className="card bg-base-100 shadow-md compact cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => initiateApplication(college)}
          >
            <figure className="h-48 relative">
              <Image
                src={college.image_src}
                alt={college.name}
                fill
                className="object-cover"
                priority
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                    <Image
                      src={college.logo}
                      alt={`${college.name} logo`}
                      width={40}
                      height={40}
                      className="rounded-full object-contain"
                    />
                  </div>
                </div>
                <h2 className="card-title text-xl font-semibold text-black leading-tight">
                  {college.name}
                </h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Admission Date:{" "}
                <span className="font-medium">{college.admission_date}</span>
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn bg-black text-white rounded-full w-full"
                  onClick={(event) => {
                    event.stopPropagation();
                    initiateApplication(college);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isApplicationModalOpen &&
        createPortal(
          <dialog id="admission_modal" className="modal" open={isApplicationModalOpen}>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Applying to {selectedCollegeToApply?.name}</h3>
              <p className="py-4 text-sm text-gray-600">
                Please provide your details to complete the application.
              </p>
              <form onSubmit={sendApplication} className="grid gap-4 py-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Your Full Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="input input-bordered w-full"
                    value={yourFullName}
                    onChange={(e) => setYourFullName(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Your Email</span>
                  </div>
                  <input
                    type="email"
                    placeholder="your@example.com"
                    className="input input-bordered w-full"
                    value={yourEmail}
                    onChange={(e) => setYourEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Application Date</span>
                  </div>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={dateOfApplication}
                    onChange={(e) => setDateOfApplication(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Your Last Degree</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Bachelor of Arts"
                    className="input input-bordered w-full"
                    value={lastDegreeEarned}
                    onChange={(e) => setLastDegreeEarned(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Your GPA/CGPA</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 3.50"
                    className="input input-bordered w-full"
                    value={yourGpa}
                    onChange={(e) => setYourGpa(e.target.value)}
                    required
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Personal Statement</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Tell us about your academic goals and why this college interests you..."
                    value={yourPersonalStatement}
                    onChange={(e) => setYourPersonalStatement(e.target.value)}
                  ></textarea>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">College Review (Optional)</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Share your thoughts about this college..."
                    value={yourCollegeReview}
                    onChange={(e) => setYourCollegeReview(e.target.value)}
                  ></textarea>
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Review Rating (Optional, 1-5)</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="e.g., 4"
                    className="input input-bordered w-full"
                    value={yourReviewRating}
                    onChange={(e) => setYourReviewRating(e.target.value)}
                  />
                </label>
                <div className="modal-action">
                  <button type="submit" className="btn bg-black text-white rounded-full">
                    Submit Application
                  </button>
                  <button
                    type="button"
                     className="btn rounded-full"
                    onClick={() => setIsApplicationModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={() => setIsApplicationModalOpen(false)}>
              <button>Close</button>
            </form>
          </dialog>,
          document.body
        )}
    </div>
  );
}