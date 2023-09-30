import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { BiSolidUserCircle } from 'react-icons/bi'
import { useThemeStore } from '../../Zustand';
import TextareaAutosize from 'react-textarea-autosize';
import { RiEmojiStickerFill } from 'react-icons/ri'
import { HiOutlinePaperAirplane } from 'react-icons/hi2'
import {useState} from 'react'
import Picker from '@emoji-mart/react'
import { FaXmark } from 'react-icons/fa6'

interface Props{
    userData : any
}
export default function PostComment({userData}: Props) {
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectEmoji, setSelectEmoji] = useState(false)

    function handleEmojiClick(emoji: any) {
        const newInputValue = inputValue + emoji.native;
        setInputValue(newInputValue);
    };
    function handleShowEmoji(){
        setSelectEmoji(!selectEmoji)
    }


    return(
        <article>
            <section className="flex px-1 mt-4">
                {userData ? (
                    <section>
                        {userData.profileImage === "" ? (
                            <Link to='/Profile' onClick={(() => {
                                window.scrollTo(0, 0);
                            })}>
                                <div className={`text-[48px] rounded-full  smm500:text-[40px] select-none ${theme ? "text-[white]" : "text-[#000000d7]"}`}>
                                    <BiSolidUserCircle />
                                </div>
                            </Link>
                        ) : (
                            <Link to='/Profile' onClick={(() => {
                                window.scrollTo(0, 0);
                            })}>
                                <LazyLoadImage
                                    effect="blur"
                                    src={userData.profileImage}
                                    alt="Profile"
                                    loading='lazy'
                                    className="w-12 h-11 rounded-full object-cover smm500:w-10 smm500:h-10 select-none"
                                />
                            </Link>
                        )}
                    </section>
                ) : (
                    <div className={`text-[48px] rounded-full  smm500:text-[40px] select-none ${theme ? "text-[white]" : "text-[#000000d7]"}`}>
                        <BiSolidUserCircle />
                    </div>
                )}
                <div className={`mx-2 w-full rounded-xl pb-3 
                    ${theme ? "bg-[#1b1d21] text-[#ffffffa5]" : "bg-[#f0f2f5] text-[#000000ab]"}`}>
                        {selectEmoji && (
                        <header className="  bg-[#151617] absolute top-52 py-3 z-50 smm500:w-[80%]">
                            <section className="flex justify-between px-2">
                                <p>Emoji</p>
                                <FaXmark className=' text-xl cursor-pointer' onClick={handleShowEmoji} />
                            </section>
                            <main className='  overflow-y-hidden h-60 '>
                                <Picker
                                    onEmojiSelect={(emoji: any) => handleEmojiClick(emoji)}
                                />
                            </main>
                        </header>
                        )}
                    <TextareaAutosize
                        autoFocus
                        className={`w-full px-4 text-lg rounded-xl outline-none pt-2 placeholder:select-none ${theme ? "bg-[#1b1d21]" : "bg-[#f0f2f5]"}`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        maxLength={200}
                        placeholder='Write a comment' 
                        />
                        <article className="flex justify-between px-4 pt-2">
                        <div className={`flex gap-2 mt-1 
                        ${theme ? " text-[#ffffffa5]" : " text-[#000000ab]"}`}>
                            <span className=" text-base cursor-pointer" title="Emoji" 
                            onClick={handleShowEmoji}>
                                <RiEmojiStickerFill />
                            </span>
                            </div>
                        <span 
                        className={` cursor-pointer text-xl ${theme ? "text-[#ffffffa5]" : "text-[#000000ab]"}`} title="Comment">
                            <HiOutlinePaperAirplane /></span>
                        </article>
                </div>
            </section>
        </article>
    )
}