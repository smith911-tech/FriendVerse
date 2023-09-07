import { useThemeStore } from '../../Zustand';
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function ViewPostContent(){
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    function HandleBack() {
        window.history.go(-3);
    }


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
// useEffect(() => {
//     const handlePopState = () => {
//         if (window.location.pathname === '/post/data') {
//             history.push('/Home');
//         }
//     };
//     window.addEventListener('popstate', handlePopState);
//     return () => {
//         window.removeEventListener('popstate', handlePopState);
//     };
// }, [history]);