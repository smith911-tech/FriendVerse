import { ImNotification } from "react-icons/im";
import { useThemeStore } from "../Zustand";
export default function LikedPostNotAvailble() {
  const theme = useThemeStore((state: any) => state.theme);
  return (
    <article className={theme ? "text-[#ffffff9f]" : "text-[#00000089]"}>
      <main className="flex justify-center">
        <ImNotification
          className={`text-[100px] ${
            theme ? "text-[#ffffff9f]" : "text-[#00000089]"
          }`}
        />
      </main>
      <h2 className=" text-center mt-4 text-xl ">No post Liked</h2>
    </article>
  );
}
