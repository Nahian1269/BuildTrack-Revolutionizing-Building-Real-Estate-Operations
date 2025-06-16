import React from "react";
import "./Header.css";
import { Hammer, User, Code, Truck, Building2 } from "lucide-react";

import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className=" pt-5 bg-slate-300 pb-10">
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
          <div className="flex text-center gap-3">
            <div className="flex justify-center mb-6">
              <Hammer className="h-13 w-13  text-amber-500" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-4">BuildTracks</h1>
          </div>
        </div>

        <div className="nav navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl font-bold">
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
          <NavLink to="/role">
            <a className="log btn mr-4 rounded-4xl text-2xl  bg-amber-400  text-black px-7">
              Login
            </a>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
