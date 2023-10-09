interface Props{
    SuggestData: any
}
import { useThemeStore } from '../Zustand';
import { collection, onSnapshot} from "firebase/firestore"
import { db } from '../firebase-config';
import { useState, useEffect } from 'react'
import { RotatingLines } from "react-loader-spinner";
import PostNotAvaliable from '../GeneralComponent/PostNotAvailable';
export default function Post({ SuggestData }: Props) {
    const [postData, setPostData] = useState<any[]>([])
    //? uid
    let userid = sessionStorage.getItem('UserId')
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const handleGetPost = (snapshot: any) => {
            const data = snapshot.docs
                .map((doc: any) => ({ ...doc.data(), id: doc.id }))
                .filter((post: any) => post.author === userid as string); // Filter Posts by userid
            setIsLoading(false);
            setPostData(data);
        };
        const unsubscribePost = onSnapshot(collection(db, "posts",), handleGetPost);
        return () => {
            unsubscribePost()
        };
    }, []);
    const PostDataByTime = postData.sort((a, b) => b.time - a.time);
    const UserData = SuggestData.find((suggestion: any) => suggestion.id === userid);
    
    return (
        <main className={` mt-3 
        ${theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"}`}>
            {isLoading ? (
                <div className='flex items-center justify-center gap-2 py-5'>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                    />
                    <p className='text-lg text-gray-600'>Loading Post...</p>
                </div>
            ): (
                <section>
                    {PostDataByTime ? (
                        <div className={` pt-10 pb-28 ${theme ? " bg-black" : "bg-white"}`}>
                            <PostNotAvaliable />
                        </div>
                    ): (
                        <section>
                            
                        </section>
                    )}
                </section>
            )}
        </main>
    )
}