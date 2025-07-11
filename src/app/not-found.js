'use client'
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  font-sans">
      <div className="relative mb-8">
        <span className="text-[10rem] font-extrabold text-red-400 drop-shadow-lg animate-bounce select-none">
          404
        </span>
       
        <style jsx>{`
          .animate-float {
            animation: float 2.5s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translate(-50%, 0);}
            50% { transform: translate(-50%, -10px);}
          }
        `}</style>
      </div>
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2">
        Lost in Space?
      </h1>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist.<br />
        Maybe you followed a broken link or entered a URL that does not exist.
      </p>
      <Link href="/" passHref>
        <p className="px-6 py-3  bg-red-400 rounded-full font-bold shadow-md">
          Take me Home
        </p>
      </Link>
    </div>
  );
}