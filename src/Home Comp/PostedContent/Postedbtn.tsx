interface Props {
  post: any;
  Popover: any;
}
import { AiTwotoneLike } from "react-icons/ai";
import { useThemeStore } from "../../Zustand";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import Likebutton from "./Post Buttons/Likebutton";
import Sharebutton from "./Post Buttons/Sharebutton";
import Commentbutton from "./Post Buttons/Commentbutton";
import Repost from "./Post Buttons/Repost";
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState, useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RotatingLines } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useInViewport } from "react-in-viewport";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
export default function Postedbtn({ post, Popover }: Props) {
  //? uid
  let userid = sessionStorage.getItem("UserId");
  const theme = useThemeStore((state: any) => state.theme);
  const [likes, setlikes] = useState<any[]>([]);
  const [impressionData, setImpressionData] = useState<any[]>([]);
  const [SuggestData, setSuggestData] = useState<any[]>([]);
  const [repostData, setRepostData] = useState<any[]>([]);
  const [IsEqualToPath, setIsEqualToPath] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  useEffect(() => {
    const handleSnapshot = (snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setlikes(data);
    };
    const handleSnapshoted = (snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSuggestData(data);
    };
    const handleGetImpression = (snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setImpressionData(data);
    };
    const handleGetRepost = (snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRepostData(data);
    };
    const handleGetComment = (snapshot: any) => {
      const data = snapshot.docs
        .map((doc: any) => ({ ...doc.data(), id: doc.id }))
        .filter((comment: any) => comment.PostId === post.id); // Filter comments by PostId
      setComments(data);
    };
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "Likes"),
      handleSnapshot
    );
    const unsubscribed = onSnapshot(collection(db, "users"), handleSnapshoted);
    const unsubscribImpression = onSnapshot(
      collection(db, "posts", post.id, "Impression"),
      handleGetImpression
    );
    const unsubscribRepost = onSnapshot(
      collection(db, "Repost"),
      handleGetRepost
    );
    const unsubscribComment = onSnapshot(
      collection(db, "Comment"),
      handleGetComment
    );
    return () => {
      unsubscribe();
      unsubscribed();
      unsubscribImpression();
      unsubscribRepost();
      unsubscribComment();
    };
  }, []);

  const matchingSuggestions =
    SuggestData &&
    SuggestData.filter((suggest) =>
      likes.some((like) => like.id === suggest.id)
    );

  let Likes;
  const LikesCount = (likes && likes?.length) || 0;

  if (LikesCount >= 1000000) {
    Likes = (LikesCount / 1000000).toFixed(1) + "m";
  } else if (LikesCount >= 1000) {
    Likes = (LikesCount / 1000).toFixed(1) + "k";
  } else {
    Likes = LikesCount.toString();
  }
  const RefDoc: any = useRef();

  const { inViewport } = useInViewport(RefDoc);
  useEffect(() => {
    const checkImpression = async () => {
      const impressionRef = doc(
        db,
        "posts",
        post.id,
        "Impression",
        userid as string
      );

      try {
        const impressionSnapshot = await getDoc(impressionRef);

        // Check if the impression document already exists
        if (!impressionSnapshot.exists()) {
          if (inViewport) {
            const DataDocImpression = doc(
              db,
              "posts",
              post.id,
              "Impression",
              userid as string
            );
            setDoc(DataDocImpression, {
              time: new Date(),
            });
          }
        }
      } catch (error) {
        console.error("Error checking impression:", error);
      }
    };

    checkImpression();
  }, [inViewport]);
  let impression;
  const impressionCount = (impressionData && impressionData?.length) || 0;

  if (impressionCount >= 1000000) {
    impression = (impressionCount / 1000000).toFixed(1) + "m";
  } else if (impressionCount >= 1000) {
    impression = (impressionCount / 1000).toFixed(1) + "k";
  } else {
    impression = impressionCount.toString();
  }

  const matchingReposts = repostData.filter((repost) => {
    return repost.PostId === post.id;
  });

  let Repostcount;
  const matchingRepostsCount = matchingReposts?.length || 0;
  if (matchingRepostsCount >= 1000000) {
    Repostcount = (matchingRepostsCount / 1000000).toFixed(1) + "m";
  } else if (matchingRepostsCount >= 1000) {
    Repostcount = (matchingRepostsCount / 1000).toFixed(1) + "k";
  } else {
    Repostcount = matchingRepostsCount.toString();
  }
  const pathToCompare = `/Post/${post.id}`;
  const currentPath = window.location.pathname;
  useEffect(() => {
    if (currentPath === pathToCompare) {
      setIsEqualToPath(true);
    } else {
      setIsEqualToPath(false); // Reset to false if they don't match
    }
  }, [currentPath, pathToCompare]);

  let comment;
  const CommentsCount = (impressionData && comments?.length) || 0;

  if (CommentsCount >= 1000000) {
    comment = (CommentsCount / 1000000).toFixed(1) + "m";
  } else if (CommentsCount >= 1000) {
    comment = (CommentsCount / 1000).toFixed(1) + "k";
  } else {
    comment = CommentsCount.toString();
  }

  return (
    <main ref={RefDoc} className="mt-3 px-3">
      <section>
        <div
          className={`${
            LikesCount === 0 &&
            impressionCount === 0 &&
            matchingRepostsCount === 0 &&
            CommentsCount === 0
              ? "hidden"
              : "flex mb-1 justify-between"
          }
            `}
        >
          <Popover.Button
            title="Likes"
            className={`flex hover:underline cursor-pointer select-none 
                    ${LikesCount > 0 ? " visible" : " invisible"}`}
          >
            <button className="text-white text-base bg-blue-600 rounded-2xl -rotate-12 p-[2px] select-none">
              <AiTwotoneLike />
            </button>
            <span
              className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}
            >
              {Likes}
            </span>
          </Popover.Button>
          <main className="flex  gap-2">
            <span
              title="Reposts"
              className={`flex hover:underline cursor-pointer
                        ${
                          matchingRepostsCount > 0 ? " visible" : " invisible"
                        }`}
            >
              <button className=" rounded-2xl  pt-[2.3px] text-lg outline-none">
                <BiRepost />
              </button>
              <span
                className={` text-xs mt-1 ${
                  theme ? "text-[#ffffffa2]" : "text-[#000000a6]"
                }`}
              >
                {Repostcount}
              </span>
            </span>
            <span
              title="Commments"
              className={`flex hover:underline cursor-pointer 
                        ${CommentsCount > 0 ? "block" : " hidden"}`}
            >
              <button className=" rounded-2xl  pt-[2.3px] mr-[2px] text-base outline-none">
                <FaRegComment />
              </button>
              <span
                className={` text-xs mt-1 ${
                  theme ? "text-[#ffffffa2]" : "text-[#000000a6]"
                }`}
              >
                {comment}
              </span>
            </span>
            <span
              title="Impression"
              className={`flex hover:underline cursor-pointer 
                        ${impressionCount > 0 ? " visible" : " invisible"}`}
            >
              <button className=" rounded-2xl  p-[2px] outline-none">
                <TbBrandGoogleAnalytics />
              </button>
              <span
                className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}
              >
                {impression}
              </span>
            </span>
          </main>
        </div>
        <hr />
      </section>
      <article className="flex gap-[1%] justify-center select-none">
        <Likebutton post={post} likes={likes} />
        <Repost post={post} />
        <Commentbutton post={post} />
        <Sharebutton post={post} />
      </article>
      <Popover.Panel
        className={` z-10 -ml-2 overflow-auto ${
          theme ? "bg-black text-[#ffff]" : "bg-white text-[#000000]"
        }
            ${
              IsEqualToPath
                ? "fixed top-[120px] lg1150:w-[53%] h-[60%] md800:w-[58%] w-[94%]"
                : "absolute w-full top-0 rounded-2xl h-full"
            }`}
      >
        <header className="flex justify-between px-3 py-3">
          <h2 className=" text-lg">Reactions</h2>
          <Popover.Button>
            <FaXmark className=" text-2xl" />
          </Popover.Button>
        </header>
        <hr />
        <article className=" px-2 my-2">
          {matchingSuggestions.length > 0 ? (
            matchingSuggestions.map((data: any) => (
              <Link
                to={`${
                  userid !== data.id ? `/User/${data.username}` : "/Profile"
                }`}
                key={data.id}
              >
                <div className="flex w-full py-2">
                  {data.profileImage === "" ? (
                    <div
                      className={`text-[52px] rounded-full ${
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
                      className="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <section className="flex flex-col ml-1">
                    <p className="font-bold text-base flex">
                      {data.fullName}
                      {data && data.Verify && (
                        <span className="text-[#1d9bf0] mt-1">
                          <VscVerifiedFilled />
                        </span>
                      )}
                    </p>
                    <p
                      className={`-mt-[2px] font-semibold text-sm ${
                        theme ? "text-[#ffffffc3]" : "text-[#0000009f]"
                      }`}
                    >
                      @{data.username}
                    </p>
                  </section>
                </div>
                <p className="font-medium ml-[52px] text-sm -mt-1 mb-3">
                  {data.bio}
                </p>
                <hr />
              </Link>
            ))
          ) : (
            <div className=" min-h-screen  w-full">
              <div className=" flex justify-center w-full">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="50"
                  visible={true}
                />
              </div>
            </div>
          )}
        </article>
      </Popover.Panel>
    </main>
  );
}
