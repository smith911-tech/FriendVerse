interface Props {
    SuggestData : any
    Popover : any
    handleInputClick: () => void
    isSearchInput: boolean
}
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useEffect, useRef, useState} from "react";
import { GoAlertFill } from 'react-icons/go'
import { Link } from "react-router-dom";
import { BiSolidUserCircle } from 'react-icons/bi'
import {useThemeStore} from '../Zustand';
import { VscVerifiedFilled } from 'react-icons/vsc'

export default function HeaderSearch({SuggestData, Popover, isSearchInput}: Props){
    
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isSearchInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchInput]);

    const [searchTerm, setSearchTerm] = useState<string>("");


    function getSuggestions(searchTerm: any) {
        const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
        const regex = new RegExp(escapedTerm, 'i'); // 'i' flag for case-insensitive matching
        return SuggestData.filter((data: any) => regex.test(data.fullName || data.username)).slice(0, 5);
    }
    let userid = sessionStorage.getItem('UserId')

    const theme = useThemeStore((state: any) => state.theme);

    return(
        <header>
            <section className='flex gap-2 pb-4'>
                <Popover.Button className={` text-4xl pb-2 rounded-full h-9
                ${theme ? "hover:bg-[#1b1d21] " : "hover:bg-[#f0f2f5] "}`}>
                    <BiLeftArrowAlt />
                </Popover.Button>
                <input type="text" className={`w-full h-9 outline-none rounded-lg px-3 
                ${theme ? "bg-[#1b1d21]" : "bg-[#f0f2f5]"}`} placeholder='Search FriendVerse' ref={inputRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </section>
            {searchTerm && (
                <div className={`absolute w-full   shadow z-10 -ml-2 overflow-y-auto overflow-x-hidden ${getSuggestions(searchTerm).length === 0 ? " h-[inherit] " : "h-44 "} 
                ${theme ? "bg-black" : "bg-white"}`}>
                    {getSuggestions(searchTerm).length === 0 ? (
                        <button className="ml-2 py-3 w-full font-semibold flex justify-center gap-2">
                            <span className=" text-2xl text-red-600"><GoAlertFill /></span>
                            <h2>User doesn't exist</h2>
                        </button>
                    ) : (
                        getSuggestions(searchTerm).filter((data: any) => data.id !== userid).map((data: any) => (
                            <Link to={`/User/${data.username}`}>
                                <button
                                    className={`cursor-pointer w-full select-none flex  my-4 ml-1 rounded-2xl gap-2
                                    ${theme ? "hover:bg-[#1b1d21] " : "hover:bg-[#f0f2f5] "}`}
                                    onClick={() => {setSearchTerm('')
                                        window.scrollTo(0, 0);
                                }}
                                    key={data.id}>
                                    <div>
                                        {data.profileImage === "" ? (
                                            <div className='text-[48px]   rounded-full '>
                                                <BiSolidUserCircle />
                                            </div>
                                        ) : (
                                            <img
                                                src={data.profileImage}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full   object-cover   "
                                            />
                                        )}
                                    </div>
                                    <div className='full'>
                                        <p
                                            className="text-left font-semibold whitespace-nowrap overflow-hidden w-[100%] text-ellipsis flex">{data.fullName}
                                            {data && data.Verify && (
                                                <span className='text-[#1d9bf0] mt-1 '>
                                                    <VscVerifiedFilled />
                                                </span>
                                            )}
                                        </p>
                                        <p
                                            className={`text-sm text-left
                                            ${theme ? "text-[#ffffffcd]" : " text-[#000000a9]"}`}><span className='select-none'>@</span>{data.username}</p>
                                    </div>
                                </button>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </header>
    )
}