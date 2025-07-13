"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function AppliedCollegesPage() {
  const [yourApplications, setYourApplications] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [currentAppForReview, setCurrentAppForReview] = useState(null);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewScore, setReviewScore] = useState("");

  const getYourApplications = async () => {
    try {
      const res = await fetch("/api/application");
      if (res.ok) {
        const appData = await res.json();
        setYourApplications(appData.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)));
      } else {
        const problemData = await res.json();
        setFetchError(problemData.message || "Couldn't grab your applications. Mind trying again?");
      }
    } catch (err) {
      console.error("Network issue retrieving applications:", err);
      setFetchError("Can't connect to get your applications. Is your internet playing up?");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getYourApplications();
  }, []);

  const openReviewForm = (application) => {
    setCurrentAppForReview(application);
    setIsReviewFormOpen(true);

    const yourExistingReview = application.allCollegeReviews?.find(
      (review) => review.isCurrentApplicantReview
    );

    if (yourExistingReview) {
      setReviewComment(yourExistingReview.comment || "");
      setReviewScore(yourExistingReview.rating || "");
    } else {
      setReviewComment("");
      setReviewScore("");
    }
  };

  const submitYourReview = async (e) => {
    e.preventDefault();
    if (!currentAppForReview) return;

    const yourLatestReview = {
      reviewerName: currentAppForReview.applicantName,
      reviewerEmail: currentAppForReview.applicantEmail,
      comment: reviewComment,
      rating: reviewScore ? parseFloat(reviewScore) : null,
      createdAt: new Date().toISOString(),
      isCurrentApplicantReview: true,
    };

    let updatedReviewsForCollege = [...(currentAppForReview.allCollegeReviews || [])];

    const existingReviewIndex = updatedReviewsForCollege.findIndex(
      (review) => review.isCurrentApplicantReview
    );

    if (existingReviewIndex !== -1) {
      updatedReviewsForCollege[existingReviewIndex] = yourLatestReview;
    } else {
      updatedReviewsForCollege.push(yourLatestReview);
    }

    updatedReviewsForCollege.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    try {
      const res = await fetch(`/api/application/${currentAppForReview._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allCollegeReviews: updatedReviewsForCollege }),
      });

      if (res.ok) {
        alert(`Your review for ${currentAppForReview.collegeName} is in! `);
        setIsReviewFormOpen(false);
        setReviewComment("");
        setReviewScore("");
        setCurrentAppForReview(null);
        getYourApplications();
      } else {
        const problemData = await res.json();
        alert(`Oh! Failed to submit review : ${problemData.message || "Something didn't quite work. Please try again."}`);
      }
    } catch (error) {
      console.error("Network hiccup during review submission:", error);
      alert("Can't connect! Check your internet and try again.");
    }
  };

  if (pageLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500">Just gathering your applied colleges...</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-white">
        <div className="alert alert-error shadow-lg w-auto max-w-md">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Oops! Something went wrong: {fetchError}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-black tracking-tight">
        Your College Applications 
      </h1>

      {yourApplications.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-10">
          Looks like you havenot applied to any colleges yet. Time to get applying!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {yourApplications.map((application) => (
            <div key={application._id} className="card lg:card-side bg-base-100 shadow-xl compact">
              {application.collegeImageSrc && (
                <figure className="relative lg:w-1/3 w-full h-48 lg:h-auto">
                  <Image
                    src={application.collegeImageSrc}
                    alt={application.collegeName || "College"}
                    fill
                    className="object-cover lg:rounded-l-xl lg:rounded-tr-none rounded-t-xl"
                    priority
                  />
                </figure>
              )}

              <div className="card-body p-6 lg:w-2/3 w-full">
                <div className="flex items-center gap-4 mb-4">
                  {application.collegeLogo && (
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring  ring-offset-base-100 ring-offset-2 flex items-center justify-center">
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

                <p className="text-md text-gray-700 mb-4">
                  Applied by: <span className="font-semibold">{application.applicantName}</span>
                </p>

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

                {application.personalStatement && (
                  <div className="bg-base-200 p-4 rounded-lg mb-4 shadow-inner">
                    <p className="font-medium text-gray-800 mb-1">Your Personal Statement:</p>
                    <p className="text-sm italic text-gray-600">
                      {application.personalStatement.length > 200
                        ? application.personalStatement.substring(0, 200) + '...'
                        : application.personalStatement}
                    </p>
                  </div>
                )}

                {application.allCollegeReviews && application.allCollegeReviews.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">What people are saying about {application.collegeName}:</h3>
                    <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
                      {application.allCollegeReviews.map((review, index) => (
                        <div
                          key={`${application._id}-review-${index}`}
                          className={`card bg-base-200 shadow-sm p-4 ${review.isCurrentApplicantReview ? 'border-l-4 border-primary' : ''}`}
                        >
                          <p className="font-semibold text-gray-800">{review.reviewerName}</p>
                          {review.rating && (
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <span className="mr-1">Rating:</span>
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                              <span className="ml-1">({review.rating})</span>
                            </div>
                          )}
                          <p className="text-sm italic text-gray-700 mt-2">{review.comment}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Reviewed on: {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn  bg-black text-white rounded-full"
                    onClick={() => openReviewForm(application)}
                  >
                    Write/Edit Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isReviewFormOpen && createPortal(
        <dialog id="review_modal" className="modal" open={isReviewFormOpen}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Your Review for {currentAppForReview?.collegeName}</h3>
            <p className="py-4 text-sm text-gray-600">Got thoughts? Share your experience or update your review here.</p>
            <form onSubmit={submitYourReview} className="grid gap-4 py-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Your Thoughts</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="What do you think about this college?"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                ></textarea>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Give a Score (1 to 5 Stars)</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="e.g., 4"
                  className="input input-bordered w-full"
                  value={reviewScore}
                  onChange={(e) => setReviewScore(e.target.value)}
                  required
                />
              </label>
              <div className="modal-action">
                <button type="submit" className="btn bg-black text-white rounded-full">
                  Send Review
                </button>
                <button
                  type="button"
                  className="btn  rounded-full"
                  onClick={() => setIsReviewFormOpen(false)}
                >
                  Not Now
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop" onClick={() => setIsReviewFormOpen(false)}>
            <button>close</button>
          </form>
        </dialog>,
        document.body
      )}
    </div>
  );
}