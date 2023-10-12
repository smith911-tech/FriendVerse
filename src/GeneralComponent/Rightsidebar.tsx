interface Props {
  SuggestData: any;
  userData: any;
}
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { GoAlertFill } from "react-icons/go";
import { BiSolidUserCircle } from "react-icons/bi";
import VerfiyId from "./VerifyBox";
import ProfileProgress from "../Home Comp/ProfileProgress";
import { Link } from "react-router-dom";
import { useThemeStore } from "../Zustand";
import { SuccessLoginM, FilldetailsError } from "../Error-SuccessM";
import { VscVerifiedFilled } from "react-icons/vsc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export default function SideDashboard({
  SuggestData,
  userData,
}: Props): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const theme = useThemeStore((state: any) => state.theme);

  function getSuggestions(searchTerm: any) {
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
    const regex = new RegExp(escapedTerm, "i"); // 'i' flag for case-insensitive matching
    return SuggestData.filter((data: any) =>
      regex.test(data.fullName || data.username)
    ).slice(0, 5);
  }

  let userid = sessionStorage.getItem("UserId");

  // ! Sucess message
  const [successFul, setSuccessful] = useState<string | boolean>(false);
  // ! error message
  const [error, setError] = useState<string | boolean>(false);
  return (
    <main className="lg1150:block hidden px-1 pt-2 relative">
      <section
        className={`${
          theme ? "bg-black" : "bg-[white] "
        } px-2 py-2 shadow relative mb-8`}
      >
        <div className="flex relative">
          <input
            type="text"
            className={`w-full py-2 pl-10 pr-1  outline-[#117DD5] border  rounded-2xl  border-solid ${
              theme
                ? "bg-black text-white border-[#117DD5]"
                : "bg-[#eff3f4] text-black border-white"
            }`}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className={`text-xl cursor-pointer absolute top-[10px] left-3 ${
              theme ? " text-white" : "text-black"
            }`}
          >
            <CiSearch />
          </div>
        </div>
        {searchTerm && (
          <div
            className={`absolute w-full   shadow z-10 -ml-2 overflow-y-auto overflow-x-hidden ${
              getSuggestions(searchTerm).length === 0
                ? " h-[inherit] "
                : "h-44 "
            } ${theme ? "bg-black" : "bg-white "}`}
          >
            {getSuggestions(searchTerm).length === 0 ? (
              <button
                className={`ml-2 py-3 w-full font-semibold flex justify-center gap-2 ${
                  theme ? "text-white" : "text-black"
                }`}
              >
                <span className=" text-2xl text-red-600">
                  <GoAlertFill />
                </span>
                <h2>User doesn't exist</h2>
              </button>
            ) : (
              getSuggestions(searchTerm)
                .filter((data: any) => data.id !== userid)
                .map((data: any) => (
                  <Link to={`/User/${data.username}`}>
                    <button
                      className={`cursor-pointer w-full select-none flex  my-4 ml-1 rounded-2xl gap-2 ${
                        theme ? "hover:bg-[#ffffff17]" : "hover:bg-[#e1e6e7]"
                      }`}
                      onClick={() => {
                        setSearchTerm("");
                        window.scrollTo(0, 0);
                      }}
                      key={data.id}
                    >
                      <div>
                        {data.profileImage === "" ? (
                          <div
                            className={`text-[48px] rounded-full ${
                              theme ? "text-white" : "text-[#000000d7]"
                            }`}
                          >
                            <BiSolidUserCircle />
                          </div>
                        ) : (
                          <LazyLoadImage
                            effect="blur"
                            src={data.profileImage}
                            alt="Profile"
                            className="w-12 h-12 rounded-full   object-cover   "
                          />
                        )}
                      </div>
                      <div
                        className={`${
                          theme ? "text-white" : "text-[#000000a9]"
                        }`}
                      >
                        <p className="text-left font-semibold flex">
                          {data.fullName}
                          {data && data.Verify && (
                            <span className="text-[#1d9bf0] mt-1 ">
                              <VscVerifiedFilled />
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-left">
                          <span className="select-none">@</span>
                          {data.username}
                        </p>
                      </div>
                    </button>
                  </Link>
                ))
            )}
          </div>
        )}
      </section>
      <VerfiyId
        userData={userData}
        setSuccessful={setSuccessful}
        setError={setError}
      />
      <ProfileProgress userData={userData} />
      {successFul && <SuccessLoginM successFul={successFul} />}
      {error && <FilldetailsError error={error} />}
    </main>
  );
}
