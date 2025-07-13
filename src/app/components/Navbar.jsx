"use client"
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoadingSession(false);
    }
  }, [status]);

  if (loadingSession) {
    return (
      <div className='w-full h-20 flex justify-center items-center'>
        <div className="session-spinner"></div>
        <style jsx>{`
          .session-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top: 4px solid #000; /* Black spinner */
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className='w-11/12 mx-auto'>
      <div className="navbar bg-base-100 justify-center mt-6">
        <div className="navbar-start lg:hidden ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg font-bold"
            >
              <li>
                <Link href={"/colleges"} >Colleges</Link>
              </li>
              {
                status === "authenticated" ?
                  <>
                    <li><Link href={"/admission"} >Admission</Link></li>
                    <li><Link href={"/myCollege"} >My college</Link></li>
                    <li><Link href={"/dashboard"} >Profile</Link></li>
                    <li><button className="btn bg-black text-white rounded-full" onClick={() => signOut()}>Sign out</button></li>
                  </>
                  :
                  <>
                    <li><Link href={"/auth/signin"} ><button className="btn bg-black text-white rounded-full">Sign in</button></Link></li>
                    <li><Link href={"/auth/register"} ><button className="btn bg-black text-white rounded-full">Sign up</button></Link></li>
                  </>
              }
            </ul>
          </div>
          <Link href={"/"}>
            <img src="https://i.ibb.co/7dvtB1Fx/Collego-1.png" alt="Collego Logo" className='h-16 w-24 object-cover' />
          </Link>
        </div>

        <div className="rounded-xl shadow-sm p-1 px-8 gap-4 justify-center items-center fixed z-10 bg-base-100 navbar-center hidden lg:flex">
          <Link href={"/"}>
            <img src="https://i.ibb.co/7dvtB1Fx/Collego-1.png" alt="Collego Logo" className='h-16 w-24 object-cover' />
          </Link>
          <ul className="menu menu-horizontal px-1 text-lg">
            <li>
              <Link href={"/colleges"}>Colleges</Link>
            </li>
            {
              status === "authenticated" ?
                <>
                  <li><Link href={"/admission"} >Admission</Link></li>
                  <li><Link href={"/myCollege"} >My college</Link></li>
                  <li><Link href={"/dashboard"} >Profile</Link></li>
                  <li><button className="btn bg-black text-white rounded-full" onClick={() => signOut()}>Sign out</button></li>
                </>
                :
                <>
                  <li><Link href={"/auth/signin"} ><button className="btn bg-black text-white rounded-full">Sign in</button></Link></li>
                  <li><Link href={"/auth/register"} ><button className="btn bg-black text-white rounded-full">Sign up</button></Link></li>
                </>
            }
          </ul>
        </div>

        <div className="navbar-end lg:hidden">
          {status === "authenticated" ?
            <button className="btn" onClick={() => signOut()}>Sign out</button>
            : <Link href={"/auth/signin"} ><button className="btn">Sign in</button></Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;