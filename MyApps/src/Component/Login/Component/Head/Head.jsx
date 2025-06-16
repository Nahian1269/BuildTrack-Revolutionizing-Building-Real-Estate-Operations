import { NavLink } from "react-router-dom";

const Head = () => {
    return (
        <div>
        <div className="navbar text-black">
  <div className="flex-1">
    <a className=" text-3xl text-black font-bold ">BuildTrack</a>
  </div>
  <div className="flex-none font-bold ">
    <ul className="menu menu-horizontal px-1">
      <li><NavLink><a>Home</a></NavLink></li>
  <li><NavLink><a>Forum</a></NavLink></li>
    <li><NavLink><a>Contact</a></NavLink></li>
    </ul>
  </div>
</div>
        </div>
    );
};

export default Head;