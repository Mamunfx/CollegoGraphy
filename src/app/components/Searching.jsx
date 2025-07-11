"use client";
import React from "react";

const Searching = () => {
  return (
    <div className=" mx-16 ">
      <div className="flex items-center gap-7">
        <h1>Search top universities :</h1>
      <div>
        <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" />
      </label>
      </div>
      </div>
      <hr  className="w-10/12 mx-auto mt-12"/>
    </div>
  );
};

export default Searching;
