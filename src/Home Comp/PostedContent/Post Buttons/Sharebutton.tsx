interface Props{
    post: any
}
import { FaShare } from 'react-icons/fa'
import { useThemeStore } from '../../../Zustand';
export default function Sharebutton({post}: Props){
    const theme = useThemeStore((state: any) => state.theme);
    const handleShare = async (id: string) => {
        try {
            await navigator.share({
                text: 'Check out this awesome content!',
                url: `/Post/${id}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }
    return(
        <button onClick={(() => handleShare(post.id))} className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1 smm500:hidden  outline-none
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}>
            <span className={`text-2xl   ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} `}>
                <FaShare />
            </span>
            <span className={`text-[15px] smm500:text-[12px]  ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"}`}>
                Share
            </span>
        </button>
    )
}