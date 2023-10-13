interface Props {
  SuggestData: any;
  data: any;
}
import { useThemeStore } from "../Zustand";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import RepostNotAvaliable from "../GeneralComponent/RepostNotAvailable";
import ViewOtherRepostOnProfile from "./ViewOther-slides-details/ViewOtherRepostOnProfile";
export default function OtherRepost({ SuggestData, data }: Props) {
  const theme = useThemeStore((state: any) => state.theme);
  const [repostData, setRePostData] = useState<any[]>([]);
  const [Posts, setPosts] = useState<any[]>([]);
  const [repostedData, setRePostedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const userId = data && data.id;
    const handleGetPost = (snapshot: any) => {
      const data = snapshot.docs
        .map((doc: any) => ({ ...doc.data(), id: doc.id }))
        .filter((repost: any) => repost.RepostAuthor === userId); // Filter rePosts by userid
      setIsLoading(false);
      setRePostData(data);
    };
    const handleSnapshot = (snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setIsLoading(false);
      setPosts(data);
    };
    const unsubscribrePost = onSnapshot(
      collection(db, "Repost"),
      handleGetPost
    );
    const unsubscribe = onSnapshot(collection(db, "posts"), handleSnapshot);
    return () => {
      unsubscribe();
      unsubscribrePost();
    };
  }, []);
  useEffect(() => {
    const combined = repostData
      .filter((repost) => {
        const originalPost = Posts.find((post) => post.id === repost.PostId);
        return originalPost; // Only include reposts with matching posts
      })
      .map((repost) => {
        const originalPost = Posts.find((post) => post.id === repost.PostId);
        return {
          ...repost,
          ...originalPost,
        };
      });
    setRePostedData(combined);
  }, [repostData, Posts]);


  const RePostDataByTime = repostedData.sort(
    (a, b) => b.timeReposted - a.timeReposted
  );

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
          {RePostDataByTime.length === 0 ? (
            <div className={` pt-10 pb-28 ${theme ? " bg-black" : "bg-white"}`}>
              <RepostNotAvaliable />
            </div>
          ) : (
            <ViewOtherRepostOnProfile
              SuggestData={SuggestData}
              RePostDataByTime={RePostDataByTime}
              data={data}
            />
          )}
        </section>
      )}
    </main>
  );
}
