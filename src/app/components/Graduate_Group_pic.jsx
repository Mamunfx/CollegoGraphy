'use client'; 

import React from 'react';

const universityData = [
  {
    "collegeName": "Stanford University",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1200px-Seal_of_Leland_Stanford_Junior_University.svg.png",
    "establishedDate": "1885-10-01",
    "graduateBatchNo": 125,
    "faculty": 1200,
    "graduatePhoto": "https://i.ibb.co/wFn73xGv/pexels-clmcdk-fejcn-2057437867-29229906.jpg"
  },
  {
    "collegeName": "University of Oxford",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Arms_of_University_of_Oxford.svg/1200px-Arms_of_University_of_Oxford.svg.png",
    "establishedDate": "1096-01-01",
    "graduateBatchNo": 800,
    "faculty": 1500,
    "graduatePhoto": "https://i.ibb.co/Df3fVg0q/pexels-hson-13091880.jpg"
  },
  {
    "collegeName": "Harvard University",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/270px-Harvard_University_coat_of_arms.svg.png",
    "establishedDate": "1636-09-08",
    "graduateBatchNo": 350,
    "faculty": 2000,
    "graduatePhoto": "https://i.ibb.co/tprfwjD0/pexels-george-pak-7973124.jpg"
  },
  {
    "collegeName": "California Institute of Technology",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Seal_of_the_California_Institute_of_Technology.svg/1200px-Seal_of_the_California_Institute_of_Technology.svg.png",
    "establishedDate": "1891-09-23",
    "graduateBatchNo": 90,
    "faculty": 300,
    "graduatePhoto": "https://i.ibb.co/V6ys8yM/pexels-karolina-grabowska-8106659.jpg"
  },
  {
    "collegeName": "University of Cambridge",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/1200px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png",
    "establishedDate": "1209-01-01",
    "graduateBatchNo": 750,
    "faculty": 1400,
    "graduatePhoto": "https://i.ibb.co/7N088nZw/pexels-karolina-grabowska-8106649.jpg"
  },
  {
    "collegeName": "Yale University",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/255px-Yale_University_Shield_1.svg.png",
    "establishedDate": "1701-10-09",
    "graduateBatchNo": 280,
    "faculty": 1100,
    "graduatePhoto": "https://i.ibb.co/Y4P5LCQ5/pexels-kalmshoota-1184580.jpg"
  },
  {
    "collegeName": "Massachusetts Institute of Technology",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/MIT_Seal.svg/1024px-MIT_Seal.svg.png",
    "establishedDate": "1861-04-10",
    "graduateBatchNo": 160,
    "faculty": 1000,
    "graduatePhoto": "https://i.ibb.co/jjX0gBt/pexels-hai-nguyen-825252-1699414.jpg"
  },
  {
    "collegeName": "Princeton University",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/800px-Princeton_seal.svg.png",
    "establishedDate": "1746-10-22",
    "graduateBatchNo": 200,
    "faculty": 900,
    "graduatePhoto": "https://i.ibb.co/zVH97JMZ/pexels-pixabay-267885.jpg"
  },
  {
    "collegeName": "Columbia University",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Columbia_coat_of_arms_no_crest.svg/330px-Columbia_coat_of_arms_no_crest.svg.png",
    "establishedDate": "1754-05-25",
    "graduateBatchNo": 320,
    "faculty": 1300,
    "graduatePhoto": "https://i.ibb.co/0VnZJd4C/pexels-emily-ranquist-493228-1205651.jpg"
  }
];

export const Graduate_Group_pic = () => {
  return (
    <div className='min-h-screen bg-base-200 font-inter py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className="text-center mb-12 text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
         Esteemed Graduate Alumni
        </h1>

        <div className='grid grid-cols-1  lg:grid-cols-3  gap-10'>
          {universityData.map((university, index) => (
            <div
              key={index}
              className="bg-white rounded-sm shadow-xl overflow-hidden
                         transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
                         flex flex-col border border-gray-100"
            >

              <div className="p-4 flex flex-col flex-grow">
  
                <div className="flex items-center mb-4">
                  <img
                    src={university.logo}
                    alt={`${university.collegeName} Logo`}
                    className="w-10 h-10 object-contain rounded-full mr-3 shadow-sm"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/D1D5DB/4B5563?text=Logo"; }}
                  />
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {university.collegeName}
                  </h2>
                </div>

  
                <div className="text-gray-700 text-base mb-5 space-y-2">
                  <p className="flex items-center">
                    <svg className="w-5 h-5  mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span className="font-semibold">Established:</span> {new Date(university.establishedDate).getFullYear()}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5  mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M9 20v-2a3 3 0 00-5.356-1.857M9 20H.644C.287 20 0 19.713 0 19.356V4.644C0 4.287.287 4 0.644 4h18.712c.357 0 .644.287.644.644V19.356c0 .357-.287.644-.644.644H9zM12 10a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="font-semibold">Graduate Batch:</span> {university.graduateBatchNo}
                  </p>
                  <p className="flex items-center">
                    <svg className="w-5 h-5  mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path></svg>
                    <span className="font-semibold">Faculty Members:</span> {university.faculty}
                  </p>
                </div>
              </div>


              <figure className="w-full h-64 overflow-hidden mt-auto">
                <img
                  src={university.graduatePhoto}
                  alt={`Graduate group from ${university.collegeName}`}
                  className="w-full h-full object-cover  transition-transform duration-300 hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/333333?text=Graduate+Photo"; }}
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graduate_Group_pic;
