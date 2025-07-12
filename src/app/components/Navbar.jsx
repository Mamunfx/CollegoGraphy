import Link from "next/link";
const Navbar = () => {
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
            <li>
              <Link href={"/"}>Products</Link>
            </li>
            <li>
              <Link href={"/"} >Pricing</Link>
            </li>

            </ul>
          </div>
         <Link href={"/"}>
          <img src="https://i.ibb.co/7dvtB1Fx/Collego-1.png" alt="Logo" className='h-16 w-24 object-cover' />
         </Link>
        </div>
        
        <div className="  rounded-xl shadow-sm p-1 px-8 gap-4 justify-center items-center fixed z-10 bg-base-100 navbar-center hidden lg:flex">
           <Link href={"/"}>
          <img src="https://i.ibb.co/7dvtB1Fx/Collego-1.png" alt="Logo" className='h-16 w-24 object-cover'/>
          </Link>
          <ul className="menu menu-horizontal px-1  text-lg">
            <li>
              <Link href={"/colleges"}>Colleges</Link>
            </li>
            <li>
              <Link href={"/admission"} >Admission</Link>
            </li>
            <li>
              <Link href={"/myCollege"} >My college</Link>
            </li>
            <li>
              <Link href={"/auth/signin"} >Sign in</Link>
            </li>
            <li>
              <Link href={"/auth/register"} >Sign up</Link>
            </li>

          </ul>
        </div>
      
<div className="navbar-end lg:hidden">
    <a className="btn bg-primary border-none text-white">Sign up</a>
  </div>

      </div>
    </div>
  );
};

export default Navbar;
