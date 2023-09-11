interface Props{
    post: any
    Likes: any
    LikesCount: any
}
import { db } from '../../firebase-config';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useState } from 'react';
import { BiLike } from 'react-icons/bi'
import { useThemeStore } from '../../Zustand';
import { AiTwotoneLike } from 'react-icons/ai'
export default function Likebutton({post}: Props){
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
    return(
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
    )
}