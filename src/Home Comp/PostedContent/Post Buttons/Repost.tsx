interface Props{
    post: any
}
import { useThemeStore } from '../../../Zustand';
import { BiRepost } from 'react-icons/bi'
import {useState, useEffect} from 'react'
import { db } from '../../../firebase-config';
import { collection, addDoc, setDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore'; 
export default function Repost({post}: Props) {
    //? uid
    let userid = sessionStorage.getItem('UserId')
    const theme = useThemeStore((state: any) => state.theme);
    post
    const [isRepost, setIsRepost] = useState(false);

    // Function to check if the user has already reposted the post
    const checkRepostStatus = async () => {
        // Query the "Repost" collection to check if the user has reposted the post
        const repostQuery = query(collection(db, "Repost"), where("RepostAuthor", "==", userid), where("id", "==", post.id));

        try {
            const querySnapshot = await getDocs(repostQuery);

            // If a document exists in the 'Repost' collection, the user has already reposted this post
            setIsRepost(!querySnapshot.empty);
        } catch (error) {
            console.error("Error checking repost status:", error);
        }
    };

    // Call the checkRepostStatus function when the component mounts
    useEffect(() => {
        checkRepostStatus();
    }, []);


    const handleRepost = async () => {
        setIsRepost(true);
    // Check if the user has already reposted this post
        const repostQuery = query(collection(db, "Repost"), where("RepostAuthor", "==", userid), where("id", "==", post.id));

    try {
        const querySnapshot = await getDocs(repostQuery);

        // If a document exists in the 'Repost' collection, the user has already reposted this post
        if (!querySnapshot.empty) {
            console.log("User has already reposted this post.");
            setIsRepost(true);
            return;
        }

        // If the user hasn't reposted this post yet, add a new repost record
        await addDoc(collection(db, "Repost"), {
            RepostAuthor: userid,
            id: post.id,
            timeReposed: new Date()
        });
            const ReportDocRef = doc(db, "users", userid as string, "Repost", post.id)
            await setDoc(ReportDocRef, {
                RepostAuthor: userid,
                id: post.id,
                timeReposed: new Date()
            })
            console.log("Repost successful!");
        }
        catch (error) {
            console.error("Error Repost:", error);
            setIsRepost(false)
        }
    }

    const handleUnRepost = async () => {
        setIsRepost(false); // Update the state to indicate un-reposting

        try {
            // Remove the repost from the post's "Repost" collection
            const repostQuery = query(collection(db, "Repost"),
                where("RepostAuthor", "==", userid), where("id", "==", post.id)
            );

            const querySnapshot = await getDocs(repostQuery);

            if (!querySnapshot.empty) {
                // Delete the document from the "Repost" collection
                const repostDoc = querySnapshot.docs[0];
                await deleteDoc(repostDoc.ref);
            } else {
                console.log("User has not reposted this post.");
                return;
            }

            // Remove the repost from the user's "Repost" collection
            const userRepostDocRef = doc(db, "users", userid as string, "Repost", post.id);
            await deleteDoc(userRepostDocRef);

            console.log("UnRepost successful!");
        } catch (error) {
            setIsRepost(true); // Revert the state to indicate an error
            console.error("Error UnRepost:", error);
        }
    };

    return(
        <button onClick={isRepost ? handleUnRepost : handleRepost }
        className={`flex mt-1 w-[33%] justify-center py-[7px] rounded gap-1 
                ${theme ? "hover:bg-[#ffffff3c]" : "hover:bg-[#0000004f]"}`}>
            <span className={`text-2xl  ${theme ? "text-[#ffffffd3]" : "text-[#00000087]"} 
            ${isRepost ? "text-[#19c37d]" : ""}`}>
                <BiRepost />
            </span>
            <span className={`text-[15px] smm500:text-[12px]  ${theme ? "text-[#ffffffd3]" : "text-[#000000b7]"} ${isRepost ? "text-[#19c37d]" : ""}`}>
                Repost
            </span>
        </button>
    )
}