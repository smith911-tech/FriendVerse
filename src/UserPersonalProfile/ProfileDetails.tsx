interface Props {
  userData: any | null;
  handleInputClick: () => void;
  isInputClicked: boolean;
  handleBodyClick: () => void;
  SuggestData: any;
}
import { BsFillPencilFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import ProfileSLideBtn from "./ProfileSlideBtn";
import UpdateP from "./UpdateP";
import { useState } from "react";
import { useThemeStore } from "../Zustand";
import { Link } from "react-router-dom";
import { VscVerifiedFilled } from "react-icons/vsc";
export default function UserProfileDetails({
  userData,
  handleInputClick,
  isInputClicked,
  handleBodyClick,
  SuggestData,
}: Props): JSX.Element {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|(?!www\.)[^\s]+\.[^\s]+)/g;

  const replaceUrlsWithLinks = (text: string) => {
    return text.replace(urlRegex, (url) => {
      if (url.startsWith("http") || url.startsWith("www.")) {
        const actualUrl = url.startsWith("www.") ? "http://" + url : url;
        return `<a href="${actualUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${removeHttpFromUrl(
          url
        )}</a>`;
      } else {
        return `<a href="http://${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${url}</a>`;
      }
    });
  };

  const removeHttpFromUrl = (url: string) => {
    return url.replace(/^(https?:\/\/|www\.)/, "");
  };

  const formattedBio =
    userData && userData.bio ? replaceUrlsWithLinks(userData.bio) : null;

  // ! Data of birth convertion from timestamp
  const dataofbirth = userData && userData.dateOfBirth;
  const DODValue = new Date(dataofbirth.seconds * 1000);

  //! Define an array to get the month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //! Formatting the date to show as "15 January 2004"
  const formattedDate = `${DODValue.getDate()} ${
    monthNames[DODValue.getMonth()]
  } ${DODValue.getFullYear()}`;

  // ! date of birth hidden or not state
  const [showDOB, setShowDOB] = useState<boolean>(true);

  //! Theme Mode
  const theme = useThemeStore((state: any) => state.theme);

  let Followers = "0";
  let Following = "0";

  if (userData) {
    const followersCount = userData.Followers?.length || 0;

    if (followersCount >= 1000000) {
      Followers = (followersCount / 1000000).toFixed(1) + "m";
    } else if (followersCount >= 1000) {
      Followers = (followersCount / 1000).toFixed(1) + "k";
    } else {
      Followers = followersCount.toString();
    }

    const followingCount = userData.Following?.length || 0;

    if (followingCount >= 1000000) {
      Following = (followingCount / 1000000).toFixed(1) + "m";
    } else if (followingCount >= 1000) {
      Following = (followingCount / 1000).toFixed(1) + "k";
    } else {
      Following = followingCount.toString();
    }
  }

  return (
    <>
      <section
        className={`w-full px-6 py-2 smm500:px-2  
            ${
              theme
                ? isInputClicked
                  ? " bg-[#000000] opacity-30 cursor-default"
                  : "bg-[#000] cursor-auto"
                : isInputClicked
                ? "bg-[#000000ca] cursor-default"
                : "bg-[#fff] cursor-auto"
            }`}
      >
        <button
          onClick={handleInputClick}
          className="block my-0 ml-auto bg-[#3b82f6] text-white font-semibold py-1 px-2 rounded-lg"
        >
          <div className="flex gap-[2px] select-none">
            <p className="mt-1">
              <BsFillPencilFill />
            </p>
            <h2>Edit Profile</h2>
          </div>
        </button>
        <section className=" mb-2">
          <h2 className=" font-semibold text-xl mt-1 flex">
            {userData && userData.fullName}
            {userData && userData.Verify && (
              <span className="text-[#1d9bf0] mt-1 text-[22px]">
                <VscVerifiedFilled />
              </span>
            )}
          </h2>
          <p className={`${theme ? "text-[#ffffffbc]" : "text-[#000000a5] "}`}>
            <span className="select-none">@</span>
            {userData && userData.username}
          </p>
        </section>
        <section className=" mb-2">
          <p
            className={` font-medium ${
              theme ? "text-[#ffffffd2]" : "text-[#000000c1]"
            }`}
            dangerouslySetInnerHTML={{ __html: formattedBio || "" }}
          />
        </section>
        <section
          className={`flex flex-wrap ${
            (userData && userData.showDOB) || userData.Location ? "mb-2" : "m-0"
          }`}
        >
          <h2 className={`flex  ${userData.Location ? " mr-2" : "m-0"}`}>
            <span className=" text-xl ">
              {userData && userData.Location && <IoLocationOutline />}
            </span>
            {userData && userData.Location}
          </h2>
          {userData.showDOB && (
            <h2 className="flex ">
              <span className=" text-xl">
                {userData && userData.dateOfBirth && <LiaBirthdayCakeSolid />}
              </span>
              {userData && userData.dateOfBirth && (formattedDate as string)}
            </h2>
          )}
        </section>
        <ul
          className={`flex  font-medium mb-2 ${
            theme ? "text-[#ffffffda]" : "text-[#000000a5]"
          }`}
        >
          <li className="flex gap-1">
            <span
              className={`select-none ${
                theme ? "text-[white]" : "text-[black] "
              }`}
            >
              {Followers}
            </span>
            <Link to="/Followers" className=" hover:underline">
              Followers
            </Link>
          </li>
          <li className="list-disc ml-7"></li>
          <li className=" gap-1 flex">
            <span
              className={`select-none ${
                theme ? "text-[white]" : "text-[black] "
              }`}
            >
              {Following}
            </span>
            <Link to="/Following" className=" cursor-pointer hover:underline">
              Following
            </Link>
          </li>
        </ul>
        <hr />
      </section>
      <section
        className={isInputClicked ? " brightness-[0.2]" : " brightness-100"}
      >
        <ProfileSLideBtn
          handleBodyClick={handleBodyClick}
          SuggestData={SuggestData}
        />
      </section>
      <UpdateP
        isInputClicked={isInputClicked}
        userData={userData}
        handleBodyClick={handleBodyClick}
        showDOB={showDOB}
        setShowDOB={setShowDOB}
        SuggestData={SuggestData}
      />
    </>
  );
}
