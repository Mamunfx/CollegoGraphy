import React from "react";

export const College_review = () => {
  return (
    <div className="w-11/12 mx-auto pt-1">
      <h1 className="my-8 text-3xl">Read what students tell about their college experience </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 justify-center p-4">
          <div className="flex gap-4 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/800px-Harvard_University_coat_of_arms.svg.png"
              alt="college_logo"
              className="h-16"
            />

            <h2 className="text-center text-xl font-semibold">
              Harvard University
            </h2>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold">
              Incredible faculty and a vibrant student community.
            </div>
            <div className="collapse-content text-sm">
              Incredible faculty and a vibrant student community. A great experience all around !
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              Challenging academics but rewarding experience.
            </div>
            <div className="collapse-content text-sm">
              Challenging academics but rewarding experience. The support from faculty is exceptional. Recommended for those who are ready to work hard.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
             Tutorial system is unique and very effective.
            </div>
            <div className="collapse-content text-sm">
             Tutorial system is unique and very effective. The one-on-one interaction with tutors is invaluable. A must-visit for anyone serious about their studies.
            </div>
          </div>
          
        </div>


        <div className="flex flex-col gap-4 justify-center p-4">
          <div className="flex gap-4 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Arms_of_University_of_Oxford.svg/330px-Arms_of_University_of_Oxford.svg.png"
              alt="college_logo"
              className="h-16"
            />

            <h2 className="text-center text-xl font-semibold">
              University of Oxford
            </h2>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold">
              Rich history, excellent academic environment.
            </div>
            <div className="collapse-content text-sm">
              Rich history, excellent academic environment. A great place for
              interdisciplinary studies.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
             Tradition meets innovation here.
            </div>
            <div className="collapse-content text-sm">
              Tradition meets innovation here. The faculty is supportive and the campus is beautiful. Recommended for those who value a rich academic tradition.
              </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
