interface Props {
  SuggestData: any;
}
import { useThemeStore } from "../Zustand";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import LikedPostNotAvailble from "../GeneralComponent/LikedPostNotAvailable";
import ViewLikedPost from "./View-slides-details/ViewLikedPost";

export default function Liked({ SuggestData }: Props) {  
  const theme = useThemeStore((state: any) => state.theme);
  const [likedData, setLikedData] = useState<any[]>([])
  const [postData, setPostData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let userid = sessionStorage.getItem("UserId");
useEffect(() => {
  const handleGetPost = (snapshot: any) => {
    const data = snapshot.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setLikedData(data);
    setIsLoading(false);
  };

  const unsubscribeLiked = onSnapshot(collection(db, "users", userid as string, 'Liked'), handleGetPost);

  const handleGetPostData = (snapshot: any) => {
    const data = snapshot.docs
      .map((doc: any) => ({ ...doc.data(), id: doc.id })) // Filter Posts by userid
      setPostData(data);
      setIsLoading(false);
  };

  const unsubscribePostData = onSnapshot(collection(db, "posts"), handleGetPostData);

  return () => {
    unsubscribeLiked();
    unsubscribePostData();
  };
  }, []);
  useEffect(() => {
    const combined = likedData
      .filter((repost) => {
        const originalPost = postData.find((post) => post.id === repost.id);
        return originalPost; // Only include reposts with matching posts
      })
      .map((repost) => {
        const originalPost = postData.find((post) => post.id === repost.id);
        return {
          ...repost,
          ...originalPost,
        };
      });

    setData(combined);
  }, [likedData, postData]);
    const LikedDataByTime = data.sort((a, b) => b.timeLiked - a.timeLiked);
  
  return (
    <main
      className={` mt-3 ${
        theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"
      }`}
    >
      {isLoading ? (
        <section className={`py-10 ${theme ? " bg-black" : "bg-white"}`}>
          <div className="flex items-center justify-center gap-2 py-5">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
            <p className="text-lg">Loading Repost Data...</p>
          </div>
        </section>
      ) : (
        <section>
          {LikedDataByTime.length === 0 ? (
            <div className={` pt-10 pb-28 ${theme ? " bg-black" : "bg-white"}`}>
              <LikedPostNotAvailble />
            </div>
          ) : (
            <ViewLikedPost
              SuggestData={SuggestData}
              LikedDataByTime={LikedDataByTime}
            />
          )}
        </section>
      )}
    </main>
  );
}
