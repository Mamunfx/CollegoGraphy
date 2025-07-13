"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopColleges() {
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
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-white">
        <span className="text-xl text-gray-500">Loading colleges...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-black tracking-tight">Top colleges in the town</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {colleges.slice(0, 3).map((college) => (
          <div
            key={college._id}
            className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md flex flex-col transition-transform hover:-translate-y-1 group"
          >
            <div className="w-full h-56 relative">
              <Image
                src={college.image_src}
                alt={college.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-1 flex flex-col p-6">

              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 bg-white border border-gray-300 rounded-full shadow p-1 w-16 h-16 flex items-center justify-center">
                  <Image
                    src={college.logo}
                    alt={`${college.name} logo`}
                    width={48}
                    height={48}
                    className="rounded-full object-contain"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-black">{college.name}</h2>
              </div>
              <div className="flex flex-wrap gap-2 mb-3 items-center">
                <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">
                  Admission: {college.admission_date}
                </span>
                <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">
                  Research: {college.number_of_research}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-medium text-black text-sm">Events: </span>
                <span className="text-gray-700 text-sm">
                  {(college.events?.slice(0, 2) || []).join(", ")}
                  {college.events?.length > 2 ? "..." : ""}
                </span>
              </div>
              <div className="mb-2 flex gap-2 flex-wrap">
                {college.sports_facilities?.slice(0, 2).map((sport, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-black px-2 py-1 rounded text-xs font-medium border border-gray-200"
                  >
                    {sport}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-4 flex">
                <Link
                  href={`/colleges/${college._id}`}
                  className="ml-auto bg-black text-white font-bold py-2 px-8 rounded-full shadow hover:bg-gray-800 transition-all duration-200"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}