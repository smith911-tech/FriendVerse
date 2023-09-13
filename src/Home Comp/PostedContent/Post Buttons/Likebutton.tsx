interface Props{
    post: any
    likes: any
}
import { db } from '../../../firebase-config';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { BiLike } from 'react-icons/bi'
import { useThemeStore } from '../../../Zustand';
import { AiTwotoneLike } from 'react-icons/ai'
import {useState, useEffect} from 'react'
export default function Likebutton({post, likes}: Props){
    // ! theme 
    const theme = useThemeStore((state: any) => state.theme);
    //? uid
    let userid = sessionStorage.getItem('UserId')
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        if (likes && userid) {
            const userLiked = likes.some((like: { Like: string | null; }) => like.Like === userid);
            setIsLiked(userLiked);
        }
    }, [likes, post]);

    const handleLike = async () => {
        setIsLiked(true); 
        try {
            const RepostRef = doc(db, "posts", post.id, 'Likes', userid as string)
            await setDoc(RepostRef, {
                Like: userid,
                time: new Date()
            })
            const ReportDocRef = doc(db, "users", userid as string, "Liked", post.id)
            await setDoc(ReportDocRef, {
                Liked: post.id,
                time: new Date()
            })
            console.log("Liked successful!");
        }
        catch (error) {
            console.error("Error Liked:", error);
            setIsLiked(false)
        }
    }

    const handleUnLiked = async () => {
        setIsLiked(false); // Update the state to indicate unliking
        try {
            // Remove the like from the post's Likes collection
            const RepostRef = doc(db, "posts", post.id, 'Likes', userid as string);
            await deleteDoc(RepostRef);
            // Remove the like from the user's Liked collection
            const ReportDocRef = doc(db, "users", userid as string, "Liked", post.id);
            await deleteDoc(ReportDocRef);
            console.log("Unliked successful!");
        } catch (error) {
            setIsLiked(false)
            console.error("Error Unliked:", error);
        }
    };

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