import React from "react";
import { v4 as uuidv4 } from "uuid";

const Navbar = () => {
  return (
    <nav className="bg-cyan-950 flex justify-between p-2 text-white">
      <div className="logo flex ">
        <img
          src="./todo.png"
          alt=""
          className="h-8 w-8 mt-1 ml-5 cursor-pointer "
        />
        <span className="font-bold text-xl ml-0.5 hover:cursor-pointer mt-1">
          i-Task
        </span>
      </div>
      <ul className="flex gap-10 mx-8 ">
        <li className="hover:cursor-pointer hover:font-bold transition-all text-lg">
          Home
        </li>
        <li className="hover:cursor-pointer hover:font-bold transition-all text-lg">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
