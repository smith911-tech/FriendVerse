interface userdatas{
    SuggestData: any
}
import { AiOutlineSearch } from 'react-icons/ai'
import { BiLeftArrowAlt } from 'react-icons/bi'
import {  useState, useEffect, useRef} from "react";
import { GoAlertFill } from 'react-icons/go'
import { Link } from "react-router-dom";
import { BiSolidUserCircle } from 'react-icons/bi'
import useThemeStore from '../Zustand';
export default function UserSearchData({ SuggestData }: userdatas){
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const [searchTerm, setSearchTerm] = useState<string>("");
    function getSuggestions(searchTerm: any) {
        const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
        const regex = new RegExp(escapedTerm, 'i'); // 'i' flag for case-insensitive matching
        return SuggestData.filter((data: any) => regex.test(data.fullName || data.username)).slice(0, 5);
    }
    let userid = sessionStorage.getItem('UserId')

    function HandleBack() {
        window.history.go(-3);
    }

    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);


    return(
        <main>
            <header className={`shadow-sm py-3 px-2 flex gap-2
                    ${theme ? "bg-black text-white" : "bg-[white] text-black"}
                    `}>
                <div className='text-4xl pb-2 h-9 cursor-pointer' onClick={HandleBack}>
                    <BiLeftArrowAlt />
                </div>
                <input type="text" className={`w-full h-9 outline-none rounded-xl px-3
                ${theme ? "bg-[#1b1d21]" : " bg-[#f0f2f5]"}
                `} placeholder='Search FriendVerse' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ref={inputRef}/>
                <span className='text-3xl cursor-pointer  '>
                    <AiOutlineSearch />
                </span>
            </header>
            {searchTerm && (
                <div className={`absolute  w-full mt-1  shadow z-10 -ml-2 overflow-y-auto overflow-x-hidden ${getSuggestions(searchTerm).length === 0 ? " h-[inherit] " : "h-[inherit] "} ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
                    {getSuggestions(searchTerm).length === 0 ? (
                        <button className="ml-2 py-3 w-full font-semibold flex justify-center gap-2">
                            <span className=" text-2xl text-red-600"><GoAlertFill /></span>
                            <h2>User doesn't exist</h2>
                        </button>
                    ) : (
                        getSuggestions(searchTerm).filter((data: any) => data.id !== userid).map((data: any) => (
                            <Link to={`/${data.username}`} onClick={(() => {
                                window.scrollTo(0, 0);
                            })}>
                                <button
                                    className={`cursor-pointer w-full select-none flex  my-4 ml-4 rounded-2xl  gap-2 
                                    ${theme ? "hover:bg-[#ffffff17]" : "hover:bg-[#e1e6e7]"}
                                    `}
                                    onClick={() => setSearchTerm('')}
                                    key={data.id}>
                                    <div>
                                        {data.profileImage === "" ? (
                                            <div className={`text-[48px] rounded-full  
                                            ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                                <BiSolidUserCircle />
                                            </div>
                                        ) : (
                                            <img
                                                src={data.profileImage}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-left font-semibold whitespace-nowrap overflow-hidden w-[90%] text-ellipsis">{data.fullName}</p>
                                        <p
                                            className={`text-sm text-left ${theme ? "text-[#ffffffd4]" : "text-[#000000a9]"}`}><span className='select-none'>@</span>{data.username}</p>
                                    </div>
                                </button>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </main>
    )
}