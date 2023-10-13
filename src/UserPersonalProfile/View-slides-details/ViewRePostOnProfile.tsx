import { useThemeStore } from "../../Zustand";
import { BiSolidUserCircle, BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { VscVerifiedFilled } from "react-icons/vsc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Popover } from "@headlessui/react";
import { FaCopy } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { BiDotsHorizontal } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { db } from "../../firebase-config";
import { message } from "antd";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Postedarticle from "../../Home Comp/PostedContent/Postedarticle";
import PostedVideo from "../../Home Comp/PostedContent/PostedVideos";
import PostedCode from "../../Home Comp/PostedContent/PostedCode";
import PostedImages from "../../Home Comp/PostedContent/PostedImages";
import Postedbtn from "../../Home Comp/PostedContent/Postedbtn";
import PostedYtLink from "../../Home Comp/PostedContent/PostedYtLink";
import { BiRepost } from "react-icons/bi";
interface Props {
  RePostDataByTime: any;
  SuggestData: any;
}

export default function ViewRepostOnProfile({
  RePostDataByTime,
  SuggestData,
}: Props) {
  const theme = useThemeStore((state: any) => state.theme);
  //? uid
  let userid = sessionStorage.getItem("UserId");

  // ! date calculation
  const formatPostDate = (timestamp: any): string => {
    const currentDate: any = new Date();
    const postDate = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
    const timeDiffInSeconds = Math.floor((currentDate - postDate) / 1000);

    if (timeDiffInSeconds < 60) {
      return `${timeDiffInSeconds}s ago`;
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (timeDiffInSeconds < 86400) {
      // 24 hours in seconds
      const hours = Math.floor(timeDiffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (timeDiffInSeconds < 604800) {
      const days = Math.floor(timeDiffInSeconds / 86400);
      return `${days}d ago`;
    } else if (timeDiffInSeconds < 31536000) {
      // 365 days in seconds
      const day = postDate.getDate();
      const month = postDate.toLocaleString("default", { month: "short" });
      return `${day} ${month}`;
    } else {
      const day = postDate.getDate();
      const month = postDate.toLocaleString("default", { month: "short" });
      const year = postDate.getFullYear() % 100; // Get last two digits of year
      return `${day} ${month} ${year}`;
    }
  };
  const CopySuccessful = () => {
    message.success("Copied");
  };
  const DeleteSuccessful = () => {
    message.success("Post Deleted");
  };
  const handleCopyClick = (id: string) => {
    CopySuccessful();
    const url = `https://friend-verse.vercel.app/Post/${id}`;
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };
  const handleShare = async (id: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: "Check out this awesome content!",
          url: `/Post/${id}`,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("chrome")) {
        alert(
          "Sharing is not supported on this browser. Please use the share menu in Chrome."
        );
      } else if (userAgent.includes("firefox")) {
        alert(
          "Sharing is not supported on this browser. Please use the share menu in Firefox."
        );
      } else {
        alert("Sharing is not supported on this browser.");
      }
    }
  };
  const handleDelete = async (Postid: String) => {
    try {
      // Delete comments associated with the post
      const commentsSnapshot = await getDocs(
        query(collection(db, "Comment"), where("PostId", "==", Postid))
      );

      commentsSnapshot.forEach(async (commentDoc) => {
        await deleteDoc(doc(db, "Comment", commentDoc.id));
      });

      await deleteDoc(doc(db, "posts", Postid as string));

      DeleteSuccessful();
    } catch (error) {
      console.error("Error deleting post and associated comments: ", error);
    }
  };

  return (
    <main className=" pt-4 pb-28">
      {RePostDataByTime.map((post: any) => {
        const PersonalData =
          SuggestData &&
          SuggestData.find((suggestion: any) => suggestion.id === post.author);
        if (PersonalData) {
          return (
            <main key={post.id}>
              <Popover
                className={`py-3 rounded-md mb-4 relative ${
                  theme ? "bg-black text-[#ffff]" : "bg-white text-[#000000]"
                }`}
              >
                <div
                  className={`  ${
                    theme ? " text-[#ffffffb0]" : " text-[#000000aa]"
                  }`}
                >
                  <Link to="/Profile" className="flex ml-4 text-sm gap-1 pb-4">
                    <BiRepost className=" text-xl" />
                    <h2>You Reposted</h2>
                  </Link>
                </div>
                <main className="flex px-2 justify-between">
                  <aside className="flex">
                    <section>
                      {PersonalData.profileImage === "" ? (
                        <Link
                          to={`${
                            userid !== post.author
                              ? `/User/${PersonalData.username}`
                              : "/Profile"
                          }`}
                        >
                          <div
                            className={`text-[40px] rounded-full select-none 
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
                        <Link
                          to={`${
                            userid !== post.author
                              ? `/User/${PersonalData.username}`
                              : "/Profile"
                          }`}
                        >
                          <LazyLoadImage
                            effect="blur"
                            src={PersonalData.profileImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover select-none "
                          />
                        </Link>
                      )}
                    </section>
                    <span>
                      <Link
                        to={`${
                          userid !== post.author
                            ? `/User/${PersonalData.username}`
                            : "/Profile"
                        }`}
                        className=" ml-2 text-sm font-medium flex hover:underline select-none "
                      >
                        {PersonalData.fullName}
                        {PersonalData.Verify && (
                          <span className="text-[#1d9bf0] mt-[2px]">
                            <VscVerifiedFilled />
                          </span>
                        )}
                      </Link>
                      <span
                        className={`ml-2 text-sm flex gap-[2px] select-none${  theme ? " text-[#ffffffaa]" : "text-[#000000a0]"}`}
                      >
                        {formatPostDate(post?.time)}
                        <span className="mt-1">
                          <BiTimeFive />
                        </span>
                      </span>
                    </span>
                  </aside>
                  <Popover className="relative">
                    <Popover.Button className="outline-none">
                      <aside className=" text-2xl my-[6px] cursor-pointer">
                        <BiDotsHorizontal />
                      </aside>
                    </Popover.Button>
                    <Popover.Panel
                      className={`absolute top-10 right-3 shadow-2xl z-20 w-56 py-2  rounded                                                    ${
                        theme
                          ? "bg-[#303031] text-[#ffff]"
                          : "bg-[white] text-[#000000]"
                      }`}
                    >
                      <div className=" flex flex-col w-full">
                        <Popover.Button
                          onClick={() => handleCopyClick(post.id)}
                          className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer"
                        >
                          <FaCopy className="text-2xl px-1" />{" "}
                          <p>Copy link to post</p>
                        </Popover.Button>
                        <Popover.Button
                          onClick={() => handleShare(post.id)}
                          className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer"
                        >
                          <FiShare2 className="text-2xl px-1" /> <p>Share</p>
                        </Popover.Button>
                        {userid === post.author && (
                          <Popover.Button
                            onClick={() => handleDelete(post.id)}
                            className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer text-red-700"
                          >
                            <RiDeleteBinLine className="text-2xl px-1" />{" "}
                            <p>Delete Post</p>
                          </Popover.Button>
                        )}
                      </div>
                    </Popover.Panel>
                  </Popover>
                </main>
                <section>
                  {post.article ? <Postedarticle post={post} /> : null}
                  {post.video ? <PostedVideo post={post} /> : null}
                  {post.Code ? <PostedCode post={post} /> : null}
                  {post.images ? <PostedImages post={post} /> : null}
                  {!post.images && !post.Code && !post.video ? (
                    <PostedYtLink post={post} />
                  ) : null}
                </section>
                <Postedbtn post={post} Popover={Popover} />
              </Popover>
            </main>
          );
        }
      })}
    </main>
  );
}
