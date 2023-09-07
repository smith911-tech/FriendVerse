interface Props {
    Post: any
}
import { useThemeStore } from '../../Zustand';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react'

export default function ViewPostContent({Post}: Props){
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);

    function HandleBack() {
        navigate("/Home")
    }
    const navigate = useNavigate()
    const handlePopState = () => {
        if (window.location.pathname === `/Post/${Post.id}`) {
            navigate(-1)
        }
    };
    useEffect(() => {
        window.addEventListener('popstate', handlePopState);
    }, [navigate]);


    return(
        <main>
            <header className={`
            sticky top-16 z-[50] flex py-2 gap-3 pl-1 w-full
            ${theme ? "bg-[black]" : "bg-[white]"}`}>
                <span onClick={HandleBack} className={`text-xl py-[5px] px-[3px] rounded-full cursor-pointer
                ${theme ? "hover:bg-[#ffffff3e]" : "hover:bg-[#00000041]"}`}>
                    <AiOutlineArrowLeft />
                </span>
                <p className=' font-medium text-xl select-none'>Post</p>
            </header>
        </main>
    )
}