interface Props {
  userData: any;
}
import { useState } from "react";
import { auth } from "../firebase-config";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { LongCard } from "../GeneralComponent/LoadingCard";
import DeleteModal from "./DeleteModal";
import { SuccessLoginM, FilldetailsError } from "../Error-SuccessM";
import { useThemeStore } from "../Zustand";
import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function SettingsInterface({ userData }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // ! Sucess message
  const [successFul, setSuccessful] = useState<string | boolean>(false);
  // ! error message
  const [error, setError] = useState<string | boolean>(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setSuccessful("Logging out...");
        // Clear cached data in localStorage
        localStorage.removeItem("userData");
        localStorage.removeItem("suggestData");
        setTimeout(() => {
          sessionStorage.removeItem("UserId");
          setSuccessful(false);
          navigate("/");
          window.scrollTo(0, 0);
        }, 1000);
      })
      .catch((error: any) => {
        console.error("Error logging out:", error);
      });
  };
  const theme = useThemeStore((state: any) => state.theme);
  const toggleTheme = useThemeStore((state: any) => state.toggleTheme);

  let userid = sessionStorage.getItem("UserId");

  const handleVerify = async (_e: any) => {
    const DataDocRef = doc(db, "users", userid as string);
    if (userData && userData.Verify) {
      setSuccessful("Verified Already");
    } else if (
      userData &&
      userData.bio &&
      userData.Location &&
      userData.coverImage &&
      userData.profileImage !== ""
    ) {
      try {
        await updateDoc(DataDocRef, {
          Verify: true,
        });
        setSuccessful("Verified Successfully");
      } catch (error) {
        console.log(error);
      }
    } else if (
      (userData && userData.bio) ||
      userData.Location ||
      userData.coverImage ||
      userData.profileImage === ""
    ) {
      try {
        await updateDoc(DataDocRef, {
          Verify: false,
        });
        setError("Complete Profile");
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setSuccessful(false);
      setError(false);
    }, 2000);
  };
  return (
    <>
      {userData ? (
        <main className={` px-4 py-4 pb-12 ${theme ? "bg-black" : "bg-gray"}`}>
          <section
            className={`py-3 sticky top-16 z-30 ${
              theme ? "bg-black" : "bg-[#f3f4f6]"
            }`}
          >
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              to="/Profile"
              className="text-blue-500 flex items-center gap-1"
            >
              <BsFillArrowLeftCircleFill className="text-xl" />
              <span>Back to Profile</span>
            </Link>
          </section>
          <section
            className={` rounded-lg shadow-lg p-6 relative mb-10 ${
              theme ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              {userData.profileImage === "" ? (
                <Link to="/Profile">
                  <div className="text-[2000px] rounded-full bg-gray-300  flex items-center justify-center">
                    <BiSolidUserCircle className="text-[#000000d7] text-[60px]" />
                  </div>
                </Link>
              ) : (
                <Link to="/Profile">
                  <LazyLoadImage
                    effect="blur"
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </Link>
              )}
              <div>
                <p className="text-xl font-semibold">{userData.fullName}</p>
                <p className="text-gray-600">@{userData.username}</p>
              </div>
            </div>
            <hr className="mb-6" />
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-1">
                <h2 className="text-lg font-semibold">Privacy Settings</h2>
                <select
                  id="postsPrivacy"
                  className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 
                                    ${theme ? "bg-black" : "bg-white"}`}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <hr />
              <div className="flex items-center justify-between gap-1">
                <h2 className="text-lg font-semibold">Theme Settings</h2>
                <select
                  id="theme"
                  className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 
                                    ${theme ? "bg-black" : "bg-white"}`}
                  onChange={toggleTheme}
                  value={theme ? "dark" : "light"}
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>
              <hr />
              <div className="space-y-4">
                <div
                  className={`rounded-lg p-4 space-y-2 select-none 
                                ${
                                  theme
                                    ? "dark:bg-gray-800 bg-blue-800"
                                    : "bg-blue-50 "
                                }`}
                >
                  <h2 className="text-lg font-semibold">
                    Identity Verification
                  </h2>
                  <p
                    className={`text-gray-600 ${
                      theme
                        ? "text-gray-300 dark:text-gray-400"
                        : "text-gray-600 "
                    }`}
                  >
                    Ensure your account's security by verifying your identity
                    with a valid identification document.
                  </p>
                  <button
                    onClick={handleVerify}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
                  >
                    {userData && userData.Verify ? "Verified" : "Get Verified"}
                  </button>
                </div>
                <hr />
                <div
                  className={` rounded-lg p-4 space-y-2 select-none 
                                ${
                                  theme
                                    ? "dark:bg-gray-800 bg-red-800"
                                    : "bg-red-50  "
                                }`}
                >
                  <h2 className="text-lg font-semibold">Logout</h2>
                  <p
                    className={`${
                      theme
                        ? "text-gray-300 dark:text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    Are you sure you want to logout?
                  </p>
                  <button
                    className="border rounded-lg px-6 py-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full transition-colors flex justify-center"
                    onClick={handleLogout}
                  >
                    <h2>Logout</h2>
                  </button>
                </div>
                <hr />
                <div className="flex justify-center select-none">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg w-full hover:bg-red-600 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </section>
          <div className="fixed top-7 right-[60px] z-50 w-96">
            {successFul && <SuccessLoginM successFul={successFul} />}
            {error && <FilldetailsError error={error} />}
          </div>
          {showDeleteModal && (
            <DeleteModal setShowDeleteModal={setShowDeleteModal} />
          )}
        </main>
      ) : (
        <div className="h-screen">
          <LongCard />
        </div>
      )}
    </>
  );
}
