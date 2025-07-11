import React from "react";

export const College_review = () => {
  return (
    <div className="mx-16">
      <h1 className="my-16 text-3xl">Read what students tell about their college experience :</h1>

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
              How do I create an account?
            </div>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-sm">
              Click on "Forgot Password" on the login page and follow the
              instructions sent to your email.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm">
              Go to "My Account" settings and select "Edit Profile" to make
              changes.
            </div>
          </div>
        </div>


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
              How do I create an account?
            </div>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-sm">
              Click on "Forgot Password" on the login page and follow the
              instructions sent to your email.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm">
              Go to "My Account" settings and select "Edit Profile" to make
              changes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
