"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenIcon,
  CalendarIcon,
  ChevronLeftIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

export default function CollegeDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollege() {
      if (!id) return;
      try {
        const res = await fetch(`/api/colleges/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch college data");
        }
        const data = await res.json();
        setCollege(data);
      } catch (error) {
        console.error(error);
        setCollege(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCollege();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          
          <p className="mt-4 text-lg text-gray-600">Loading Details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          College Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          We couldnt find the college youre looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Back to Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className=" min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Colleges
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative">
            <Image
              src={college.image_src}
              alt={`${college.name} campus`}
              width={1200}
              height={400}
              className="w-full h-48 md:h-64 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 flex items-center gap-4">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg flex-shrink-0">
                <Image
                  src={college.logo}
                  alt={`${college.name} logo`}
                  fill
                  className="rounded-full object-contain bg-white"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]">
                  {college.name}
                </h1>
                <p className="text-gray-200 text-sm mt-1 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1.5" />
                  {college.location || "Location not specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard
                icon={<CalendarIcon className="h-6 w-6 text-blue-500" />}
                label="Admission Date"
                value={college.admission_date}
              />
              <StatCard
                icon={
                  <BookOpenIcon className="h-6 w-6 text-green-500" />
                }
                label="Research Papers"
                value={college.number_of_research}
              />

              <StatCard
                icon={<StarIcon className="h-6 w-6 text-yellow-500" />}
                label="Rating"
                value={
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < college.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                }
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Section title="About">{college.details}</Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <Section title="Upcoming Events">
                    <ul className="space-y-3">
                      {college.events?.map((event, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 font-bold mr-3">
                            ›
                          </span>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </Section>
                  <Section title="Sports Facilities">
                    <ul className="space-y-3">
                      {college.sports_facilities?.map((sport, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 font-bold mr-3">
                            ✓
                          </span>
                          {sport}
                        </li>
                      ))}
                    </ul>
                  </Section>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Section title="Student Reviews">
                  {college.reviews && college.reviews.length > 0 ? (
                    <ul className="space-y-6">
                      {college.reviews.map((review, idx) => (
                        <li key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                               <Image
                                 src={review.userImage || `https://i.pravatar.cc/40?u=${review.userEmail}`}
                                 alt={review.userEmail}
                                 width={40}
                                 height={40}
                                 className="rounded-full"
                               />
                            </div>
                            <div>
                               <p className="font-semibold text-gray-800 text-sm">{review.userEmail}</p>
                               <div className="flex items-center">
                                 {[...Array(5)].map((_, i) => (
                                   <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}/>
                                 ))}
                               </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No reviews yet.</p>
                  )}
                </Section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 transition-all hover:shadow-md hover:bg-white">
      <div className="bg-white p-3 rounded-full border border-gray-200">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>

        <div className="text-lg font-bold text-gray-800">{value}</div>
      </div>
    </div>
  );
}


function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-100">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}