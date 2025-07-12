"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // For the modal

export default function AdmissionPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  // Form state for the application modal
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [previousEducation, setPreviousEducation] = useState("");
  const [gpa, setGpa] = useState("");
  const [personalStatement, setPersonalStatement] = useState("");
  const [collegeReview, setCollegeReview] = useState(""); // New state for college review

  useEffect(() => {
    async function fetchColleges() {
      const res = await fetch("/api/colleges");
      const data = await res.json();
      setColleges(data);
      setLoading(false);
    }
    fetchColleges();
  }, []);

  const handleApplyClick = (college) => {
    setSelectedCollege(college);
    setIsModalOpen(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    if (!selectedCollege) return;

    const applicationData = {
      collegeId: selectedCollege._id,
      collegeName: selectedCollege.name,
      collegeImageSrc: selectedCollege.image_src, // Added college image source
      collegeLogo: selectedCollege.logo,           // Added college logo
      applicantName,
      applicantEmail,
      applicationDate,
      previousEducation,
      gpa: parseFloat(gpa), // Ensure GPA is stored as a number
      personalStatement,
      collegeReview, // Added college review
    };

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (res.ok) {
        alert(`Application Submitted Successfully! 🎉\nYour application to ${selectedCollege.name} has been received.`);
        setIsModalOpen(false);
        // Reset form fields
        setApplicantName("");
        setApplicantEmail("");
        setApplicationDate("");
        setPreviousEducation("");
        setGpa("");
        setPersonalStatement("");
        setCollegeReview(""); // Reset college review
      } else {
        const errorData = await res.json();
        alert(`Application Failed 😞\n${errorData.message || "Something went wrong. Please try again."}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Network Error 🔌\nCould not connect to the server. Please check your internet connection.");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500">Loading colleges for admission...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-black tracking-tight">
        Apply for Admission 🎓
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((college) => (
          <div
            key={college._id}
            className="card bg-base-100 shadow-md compact cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleApplyClick(college)}
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
                  <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex items-center justify-center">
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
                Admission Date: <span className="font-medium">{college.admission_date}</span>
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary w-full"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card onClick from firing
                    handleApplyClick(college);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DaisyUI Modal */}
      {isModalOpen && createPortal(
        <dialog id="admission_modal" className="modal" open={isModalOpen}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Apply to {selectedCollege?.name}</h3>
            <p className="py-4 text-sm text-gray-600">Fill in your details to apply for admission.</p>
            <form onSubmit={handleSubmitApplication} className="grid gap-4 py-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Full Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="input input-bordered w-full"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="your@example.com"
                  className="input input-bordered w-full"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
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
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Degree</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g., Bachelor of Science"
                  className="input input-bordered w-full"
                  value={previousEducation}
                  onChange={(e) => setPreviousEducation(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">GPA/CGPA</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 3.75"
                  className="input input-bordered w-full"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  required
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Personal Statement</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Tell us about your academic goals and why you're interested in this college..."
                  value={personalStatement}
                  onChange={(e) => setPersonalStatement(e.target.value)}
                ></textarea>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Your Review (Optional)</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Share your thoughts about this college..."
                  value={collegeReview}
                  onChange={(e) => setCollegeReview(e.target.value)}
                ></textarea>
              </label>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Submit Application
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <button>close</button>
          </form>
        </dialog>,
        document.body // Portal the modal to the body to avoid z-index issues
      )}
    </div>
  );
}