import { ImNotification } from "react-icons/im";
import { useThemeStore } from "../Zustand";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function PostNotAvaliable() {
  const theme = useThemeStore((state: any) => state.theme);
  const [changeTextBypath, setchangeTextBypath] = useState<string>("");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/Post/")) {
      setchangeTextBypath("Post Not available");
    } else {
      setchangeTextBypath("No post yet");
    }
  }, [location.pathname]);
  return (
    <article className={theme ? "text-[#ffffff9f]" : "text-[#00000089]"}>
      <main className="flex justify-center">
        <ImNotification
          className={`text-[100px] ${
            theme ? "text-[#ffffff9f]" : "text-[#00000089]"
          }`}
        />
      </main>
      <h2 className=" text-center mt-4 text-xl ">{changeTextBypath}</h2>
    </article>
  );
}
