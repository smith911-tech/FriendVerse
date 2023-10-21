import UnderConstruction from "../GeneralComponent/UnderConstruction";
import { useThemeStore } from "../Zustand";
export default function Othersimpression() {
    const theme = useThemeStore((state: any) => state.theme);
    return (
      <main
        className={` mt-3  ${
          theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"
        }`}
      >
        <div
          className={`pt-10 pb-28 ${
            theme ? "bg-[#000] text-[white]" : "bg-[#ffffffd3] text-[black]"
          }`}
        >
          <UnderConstruction />
        </div>
      </main>
    );
}
