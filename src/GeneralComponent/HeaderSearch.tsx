interface userdatas {
    SuggestData : any
    Popover : any
    handleInputClick: () => void
    isSearchInput: boolean
}
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useEffect, useRef } from "react";

export default function HeaderSearch({SuggestData, Popover, isSearchInput}: userdatas){
    console.log(SuggestData);
    
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isSearchInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchInput]);

    return(
        <header>
            <section className='flex gap-2 pb-4'>
                <Popover.Button  className=' text-4xl pb-2 rounded-full hover:bg-[#f0f2f5] h-9'>
                    <BiLeftArrowAlt />
                </Popover.Button>
                <input type="text" className='w-full h-9 bg-[#f0f2f5] outline-none rounded-lg px-3' placeholder='Search FriendVerse' ref={inputRef} />
            </section>
        </header>
    )
}