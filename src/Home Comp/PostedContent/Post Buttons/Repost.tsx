interface Props{
    post: any
}
import { useThemeStore } from '../../../Zustand';
import { BiRepost } from 'react-icons/bi'
// import { db } from '../../../firebase-config';
// import { addDoc, collection, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
export default function Repost({post}: Props) {
    //? uid
    // let userid = sessionStorage.getItem('UserId')
    const theme = useThemeStore((state: any) => state.theme);
    post
    
    // const handleRepost = async () => {
    //     try {
    //         await addDoc(collection(db, "users", userid as string, "Reposted"), {
    //             Reposted: arrayUnion(post.id),
    //             time: new Date()
    //         });
    //         await addDoc(collection(db, "posts", post.id, "Repost"), {
    //             Repost: arrayUnion(userid),
    //             time: new Date()
    //         });
    //         console.log("Repost successful!");
    //     }
    //     catch (error) {
    //         console.error("Error Repost:", error);
    //     }
    // }

    // const handleUnLiked = async () => {
    //     try {
    //         const userDocRefLiked = doc(db, "users", userid as string);
    //         await updateDoc(userDocRefLiked, {
    //             Liked: arrayRemove(post.id)
    //         });
    //         const userDocRefLikes = doc(db, "posts", post.id);
    //         await updateDoc(userDocRefLikes, {
    //             Likes: arrayRemove(userid)
    //         });
    //         console.log("Unliked successful!");
    //     } catch (error) {
    //         console.error("Error UnLikes:", error);
    //     }
    // }

    return(
        <button className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1 
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}>
            <span className={`text-2xl  ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} `}>
                <BiRepost />
            </span>
            <span className={`text-[15px] smm500:text-[12px]  ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"}`}>
                Repost
            </span>
        </button>
    )
}