import { useThemeStore } from '../../../Zustand';
import { BiRepost } from 'react-icons/bi'
export default function Repost() {
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <button className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1 
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}>
            <span className={`text-2xl  ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} `}>
                <BiRepost />
            </span>
            <span className={`text-[15px] smm500:text-[12px]  ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"}`}>
                Repost
            </span>
        </button>
    )
}