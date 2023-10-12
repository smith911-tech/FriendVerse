interface Props {
  SuggestData: any;
}
import { useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { GoTelescopeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { useThemeStore } from "../Zustand";
import { VscVerifiedFilled } from "react-icons/vsc";
import { RotatingLines } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ProfileLeftbar({ SuggestData }: Props): JSX.Element {
  let userid = sessionStorage.getItem("UserId");
  const theme = useThemeStore((state: any) => state.theme);

  const [shuffledData, setShuffledData] = useState(SuggestData.slice());

  useEffect(() => {
    const shuffled = [...SuggestData].sort(() => Math.random() - 0.5);
    setShuffledData(shuffled);
  }, [SuggestData]);

  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(8);
  useEffect(() => {
    const updateSliceRange = () => {
      const windowHeight = window.innerHeight;

      if (windowHeight <= 700) {
        setSliceStart(0);
        setSliceEnd(8);
      } else if (windowHeight <= 750) {
        setSliceStart(0);
        setSliceEnd(9);
      } else if (windowHeight <= 850) {
        setSliceStart(0);
        setSliceEnd(10);
      } else if (windowHeight <= 900) {
        setSliceStart(0);
        setSliceEnd(11);
      } else if (windowHeight <= 1100) {
        setSliceStart(0);
        setSliceEnd(12);
      } else {
        // Handle the case when windowHeight is greater than 1100
        setSliceStart(0);
        setSliceEnd(14);
      }
    };

    // Initial update
    updateSliceRange();

    // Listen for window resize events and update the slice range
    window.addEventListener("resize", updateSliceRange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateSliceRange);
    };
  }, []);

  return (
    <main className="md970:block hidden font-Inter pt-2 px-2">
      <section>
        {SuggestData.length === 0 ? (
          <div
            className={`min-h-[80vh]  w-full ${
              theme ? "bg-black " : "bg-white "
            }`}
          >
            <div className=" flex justify-center">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                visible={true}
              />
            </div>
          </div>
        ) : (
          <section
            className={` rounded-lg shadow py-2 ${
              theme ? "bg-black text-[#ffffffca]" : "bg-white text-[#000000d4]"
            }`}
          >
            <div className="flex text-lg justify-between mx-2">
              <h2 className="font-extrabold">Suggestions</h2>
              <span className="text-[#117dd5]">
                <GoTelescopeFill />
              </span>
            </div>
            {shuffledData
              .filter((data: any) => data.id !== userid)
              .slice(sliceStart, sliceEnd)
              .map((data: any) => (
                <Link to={`/User/${data.username}`} key={data.id}>
                  <div
                    key={data.id}
                    className="cursor-pointer w-full select-none flex my-4 ml-1 rounded-2xl gap-2"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
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
                          loading="lazy"
                          className="w-12 h-12 rounded-full object-cover "
                        />
                      )}
                    </div>
                    <div
                      className={`w-full ${
                        theme ? "text-[#ffffffca]" : "text-[#000000d4]"
                      }`}
                    >
                      <p className="text-left font-semibold whitespace-nowrap overflow-hidden w-[70%] text-ellipsis flex">
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
                  </div>
                </Link>
              ))}
          </section>
        )}
      </section>
    </main>
  );
}
