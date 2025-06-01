import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <div className="main navbar  text-black ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Forum</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          <a className=" logo ml-4 text-xl font-bold">BuildTrack</a>
        </div>
        <div className="nav navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            <li>
              <a>Home</a>
            </li>
            <li>
              <summary>Forum</summary>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <a className="log btn mr-4 rounded-4xl text-xl  bg-amber-400  text-black px-7">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
