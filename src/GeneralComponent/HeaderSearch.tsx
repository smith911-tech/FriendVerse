interface userdatas {
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

export default function HeaderSearch({SuggestData, Popover, isSearchInput}: userdatas){
    
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isSearchInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchInput]);

    const [searchTerm, setSearchTerm] = useState<string>("");


    function getSuggestions() {
        const regex = new RegExp(`${searchTerm}`);
        return SuggestData.filter((data: any) => regex.test(data.fullName || data.username)).slice(0, 5);
    }
    let userid = sessionStorage.getItem('UserId')

    return(
        <header>
            <section className='flex gap-2 pb-4'>
                <Popover.Button  className=' text-4xl pb-2 rounded-full hover:bg-[#f0f2f5] h-9'>
                    <BiLeftArrowAlt />
                </Popover.Button>
                <input type="text" className='w-full h-9 bg-[#f0f2f5] outline-none rounded-lg px-3' placeholder='Search FriendVerse' ref={inputRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </section>
            {searchTerm && (
                <div className={`absolute bg-white w-full   shadow z-10 -ml-2 overflow-y-auto overflow-x-hidden ${getSuggestions().length === 0 ? " h-[inherit] " : "h-44 "}`}>
                    {getSuggestions().length === 0 ? (
                        <button className="ml-2 py-3 w-full font-semibold flex justify-center gap-2">
                            <span className=" text-2xl text-red-600"><GoAlertFill /></span>
                            <h2>User doesn't exist</h2>
                        </button>
                    ) : (
                        getSuggestions().filter((data: any) => data.id !== userid).map((data: any) => (
                            <Link to={`/${data.username}`}>
                                <button
                                    className="cursor-pointer w-full select-none flex  my-4 ml-1 rounded-2xl hover:bg-[#e1e6e7] gap-2"
                                    onClick={() => setSearchTerm('')}
                                    key={data.id}>
                                    <div>
                                        {data.profileImage === "" ? (
                                            <div className='text-[48px]   rounded-full text-[#000000d7]'>
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
                                    <div>
                                        <p
                                            className="text-left font-semibold">{data.fullName}</p>
                                        <p
                                            className="text-sm text-left text-[#000000a9]"><span className='select-none'>@</span>{data.username}</p>
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