interface Props{
    post: any
}
import { AiTwotoneLike } from 'react-icons/ai'
import { useThemeStore } from '../../Zustand';
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { BiLike, BiRepost } from 'react-icons/bi'
import { TbMessage } from 'react-icons/tb'
import { FaShare } from 'react-icons/fa'
import { db } from '../../firebase-config';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Postedbtn({post}: Props) {
    // ! theme 
    const theme = useThemeStore((state: any) => state.theme);
    //? uid
    let userid = sessionStorage.getItem('UserId')
    // Assuming you have state for the postLiked status
    const [isLiked, setIsLiked] = useState(post.Likes ? post.Likes.includes(userid) : false);

    const handleLike = async () => {
        try {
            const DataDocRefLiked = doc(db, "users", userid as string)
            await updateDoc(DataDocRefLiked, {
                Liked: arrayUnion(post.id)
            })
            const DataDocRefLikes = doc(db, "posts", post.id)
            await updateDoc(DataDocRefLikes, {
                Likes: arrayUnion(userid)
            })
            console.log("Liked successful!");
            setIsLiked(true); // Update the state
        }
        catch (error) {
            console.error("Error Liked:", error);
        }
    }

    const handleUnLiked = async () => {
        try {
            const userDocRefLiked = doc(db, "users", userid as string);
            await updateDoc(userDocRefLiked, {
                Liked: arrayRemove(post.id)
            });
            const userDocRefLikes = doc(db, "posts", post.id);
            await updateDoc(userDocRefLikes, {
                Likes: arrayRemove(userid)
            });
            console.log("Unliked successful!");
            setIsLiked(false); // Update the state
        } catch (error) {
            console.error("Error UnLikes:", error);
        }
    }
    let Likes = '0';
    const LikesCount = post && post.Likes?.length || 0;
    if (post) {
        if (LikesCount > 9999) {
            Likes = (LikesCount / 1000).toFixed(1) + 'k';
        } else {
            Likes = LikesCount.toString();
        }
    }
    const navigate = useNavigate()
    const handleViewPost = (id: string) => {
        if (window.location.pathname === '/Home') {
            navigate(`/Post/${id}`);
        } else {
            return null
        }
    }
    return (
        <main className="mt-3 px-3">
            <section>
            <div  className='flex mb-1 justify-between'>
                    <span title='Likes' 
                    className={`flex hover:underline cursor-pointer 
                    ${LikesCount > 0 ? " visible" : " invisible"}`}>
                        <button className='text-white text-base bg-blue-600 rounded-2xl -rotate-12 p-[2px]'>
                            <AiTwotoneLike />
                        </button>
                        <span className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}>{Likes}
                        </span>
                    </span>
                    <span title='Impression' className='flex hover:underline cursor-pointer'>
                        <button className=' rounded-2xl  p-[2px]'>
                            <TbBrandGoogleAnalytics />
                        </button>
                        <span className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}>10.5k</span>
                    </span>
            </div>
            <hr />
            </section>
            <article className="flex gap-[1%] justify-center">
                <button
                    onClick={isLiked ? handleUnLiked : handleLike}
                    className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1  
                    ${theme 
                    ? 'text-white hover:bg-[#ffffff3c]' 
                    : 'text-black hover:bg-[#0000004f]'}`}
                >
                    <span className={`text-2xl  ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} ${isLiked ? 'text-blue-500' : ''} `}>
                        {isLiked ? <AiTwotoneLike /> : <BiLike />} {/* Change icons accordingly */}
                    </span>
                    <span className={`text-[15px] smm500:text-[12px] ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"} ${isLiked ? 'text-blue-500' : ''}`}>
                        Like
                    </span>
                </button>
                <button className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1 
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}>
                    <span className={`text-2xl  ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} `}>
                        <BiRepost />
                    </span>
                    <span className={`text-[15px] smm500:text-[12px]  ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"}`}>
                        Repost
                    </span>
                </button>
                <button onClick={() => handleViewPost(post && post.id)} className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1 
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}>
                    <span className={`text-2xl  ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} `}>
                        <TbMessage />
                    </span>
                    <span className={`text-[15px] smm500:text-[12px]  ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"}`}>
                        Comment
                    </span>
                </button>
                <button className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1 smm500:hidden
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}>
                    <span className={`text-2xl   ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} `}>
                        <FaShare />
                    </span>
                    <span className={`text-[15px] smm500:text-[12px]  ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"}`}>
                        Share
                    </span>
                </button>
            </article>
        </main>
    )
}