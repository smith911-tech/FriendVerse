import UnderConstruction from "../GeneralComponent/UnderConstruction";
import { useThemeStore } from "../Zustand";
export default function VideoSection() {
      const theme = useThemeStore((state: any) => state.theme);
  return (
    <main
      className={` ${
        theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"
      }`}
    >
      <div
        className={`pt-32 pb-28 min-h-[80vh] ${
          theme ? "bg-[#000] text-[white]" : "bg-[#ffffffd3] text-[black]"
        }`}
      >
        <UnderConstruction />
      </div>
    </main>
  );
}
