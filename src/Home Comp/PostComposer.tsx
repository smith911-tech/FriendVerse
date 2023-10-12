interface Props {
  handleBodyClick: () => void;
  handleInputClick: () => void;
  isInputClicked: boolean;
  userData: any;
}
import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useThemeStore } from "../Zustand";
import PostController from "./PostController";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export default function PostSection({
  handleBodyClick,
  userData,
  isInputClicked,
  handleInputClick,
}: Props): JSX.Element {
  const firstName = userData?.fullName?.split(" ")[0] ?? "Loading....";

  //! Theme Mode
  const theme = useThemeStore((state: any) => state.theme);
  return (
    <>
      <header
        className={` mb-2 py-2 px-5 rounded-2xl shadow md970:w-[90%] block mt-0 mx-auto select-none  smm500:py-[1px] smm500:px-2 ${
          theme ? "bg-black" : "bg-white"
        }`}
      >
        <nav className="flex justify-between gap-2">
          <div>
            {userData ? (
              <section>
                {userData.profileImage === "" ? (
                  <Link to="/Profile">
                    <div
                      className={`text-[48px] rounded-full 
                                        ${
                                          theme
                                            ? "text-white"
                                            : "text-[#000000d7]"
                                        }`}
                    >
                      <BiSolidUserCircle />
                    </div>
                  </Link>
                ) : (
                  <Link to="/Profile">
                    <LazyLoadImage
                      effect="blur"
                      src={userData.profileImage}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Link>
                )}
              </section>
            ) : (
              <div
                className={`text-[48px] rounded-full 
                                        ${
                                          theme
                                            ? "text-white"
                                            : "text-[#000000d7]"
                                        }`}
              >
                <BiSolidUserCircle />
              </div>
            )}
          </div>
          <input
            readOnly
            type="text"
            onClick={handleInputClick}
            className={`w-[90%] cursor-pointer h-10  rounded-2xl mt-1 px-4 outline-none 
                        ${theme ? "bg-[#1b1d21]" : "bg-[#f0f2f5]"}`}
            placeholder={`What's on your mind, ${firstName}?`}
          />
        </nav>
      </header>
      <PostController
        userData={userData}
        isInputClicked={isInputClicked}
        handleBodyClick={handleBodyClick}
      />
    </>
  );
}
