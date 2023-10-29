import UnderConstruction from "../GeneralComponent/UnderConstruction";
import { useThemeStore } from "../Zustand";
import { BsFillMicFill } from "react-icons/bs";
import {AiOutlinePlus} from 'react-icons/ai'
export default function SpaceSection() {
      const theme = useThemeStore((state: any) => state.theme);
  return (
    <main
      className={` ${
        theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"
      }`}
    >
      <div
        className={`pt-32 pb-28 min-h-[100vh] ${
          theme ? "bg-[#000] text-[white]" : "bg-[#ffffffd3] text-[black]"
        }`}
      >
        <UnderConstruction />
        <div className="fixed bottom-8 lg1150:right-[25%] md970:right-[13%] md800:right-[22%] sm500:right-[10%] smm500:right-[10%] sm650:bottom-24 z-50 text-2xl bg-[#3b82f6] p-3 rounded-full cursor-pointer text-white">
          <BsFillMicFill className="w-auto " />
          <AiOutlinePlus className=" absolute top-2 right-2 text-xs" />
        </div>
      </div>
    </main>
  );
}
