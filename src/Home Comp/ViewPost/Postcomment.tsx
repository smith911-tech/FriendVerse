import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { BiSolidUserCircle } from 'react-icons/bi'
import { useThemeStore } from '../../Zustand';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineCamera, AiOutlineVideoCameraAdd } from 'react-icons/ai'
import { BsEmojiSmile } from 'react-icons/bs'
import { HiOutlineGif, HiOutlinePaperAirplane } from 'react-icons/hi2'

interface Props{
    userData : any
}
export default function PostComment({userData}: Props) {
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <article>
            <section className="flex px-1">
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
                    ${theme ? "bg-[#1b1d21]" : "bg-[#f0f2f5]"}`}>
                    <TextareaAutosize
                        className={`w-full px-4 text-lg rounded-xl outline-none pt-2 placeholder:select-none ${theme ? "bg-[#1b1d21]" : "bg-[#f0f2f5]"}`}
                        maxLength={200}
                        placeholder='Write a comment' />
                        <article className="flex justify-between px-4 pt-2">
                        <div className={`flex gap-2 mt-1 
                        ${theme ? " text-[#ffffffa5]" : " text-[#000000ab]"}`}>
                            <span className=" text-xl cursor-pointer" title="Emoji">
                                <BsEmojiSmile />
                            </span>
                            <span className=" text-xl cursor-pointer" title="Gallery">
                                <AiOutlineCamera />
                            </span>
                            <span className=" text-xl cursor-pointer" title="Video">
                                <AiOutlineVideoCameraAdd />
                            </span>
                            <span className=" text-xl cursor-pointer" title="Gif">
                                <HiOutlineGif />
                            </span>
                            </div>
                        <span 
                        className={` cursor-pointer text-2xl ${theme ? "text-[#ffffffa5]" : "text-[#000000ab]"}`} title="Comment">
                            <HiOutlinePaperAirplane /></span>
                        </article>
                </div>
            </section>
        </article>
    )
}