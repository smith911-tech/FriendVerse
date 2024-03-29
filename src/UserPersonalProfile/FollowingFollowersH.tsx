import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useThemeStore } from "../Zustand";

export default function FollowersFollowingH() {
  const theme = useThemeStore((state: any) => state.theme);
  const username = sessionStorage.getItem("username");
  const name = sessionStorage.getItem("name");
  return (
    <header
      className={`py-3 select-none sticky top-14 z-[60] 
        ${theme ? "bg-black" : "bg-white"}`}
    >
      <section className="flex px-2 gap-5">
        <Link
          to="/Profile"
          className={`text-2xl m-2 p-2 rounded-full transition-all cursor-pointer 
                ${theme ? "hover:bg-[#ffffff7d] " : "hover:bg-[#00000050] "}`}
        >
          <AiOutlineArrowLeft />
        </Link>
        <div>
          <p className=" font-semibold text-lg">{name}</p>
          <p
            className={`font-semibold 
                    ${theme ? "text-[#ffffffa0]" : "text-[#000000bf]"}`}
          >
            @{username}
          </p>
        </div>
      </section>
      <section className="flex gap-2 px-2 mb-1">
        <Link
          to="/Followers"
          className={`w-1/2 mt-2  py-3 text-center font-semibold transition-all 
                ${theme ? "hover:bg-[#ffffff5b]" : " hover:bg-[#0000004e]"}`}
        >
          <NavLink to="/Followers" className="ProfileActiveF pb-1">
            Followers
          </NavLink>
        </Link>
        <Link
          to="/Following"
          className={`w-1/2 mt-2  py-3 text-center font-semibold transition-all 
                ${theme ? "hover:bg-[#ffffff5b]" : " hover:bg-[#0000004e]"}`}
        >
          <NavLink to="/Following" className="ProfileActiveF pb-1">
            Following
          </NavLink>
        </Link>
      </section>
      <hr />
    </header>
  );
}
