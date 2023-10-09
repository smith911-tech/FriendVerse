import { useThemeStore } from '../Zustand';
import { useState, useEffect } from 'react'
import { RotatingLines } from "react-loader-spinner";
import PostNotAvaliable from '../GeneralComponent/PostNotAvailable';
import { collection, onSnapshot } from "firebase/firestore"
import { db } from '../firebase-config';
import ViewOtherPostOnProfile from './ViewOther-slides-details/ViewOtherPostOnProfile';
interface Props {
    data: any
}

export default function OthersPosts({data}: Props){
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    const [postData, setPostData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const Userid = data && data.id
    useEffect(() => {
        const handleGetPost = (snapshot: any) => {
            const data = snapshot.docs
                .map((doc: any) => ({ ...doc.data(), id: doc.id }))
                .filter((post: any) => post.author === Userid as string);
            setIsLoading(false);
            setPostData(data);
        };
        const unsubscribePost = onSnapshot(collection(db, "posts",), handleGetPost);
        return () => {
            unsubscribePost()
        };
    }, []);
    const PostDataByTime = postData.sort((a, b) => b.time - a.time);
    const PersonalData = data
    
    return(
        <main className={` mt-3 
        ${theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"}`}>
            {isLoading ? (
                <section className={`py-10 ${theme ? " bg-black" : "bg-white"}`}>
                    <div className='flex items-center justify-center gap-2 py-5'>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                        <p className='text-lg'>Loading Post...</p>
                    </div>
                </section>
            ) : (
                <section>
                    {postData.length === 0 ? (
                        <div className={` pt-10 pb-28 ${theme ? " bg-black" : "bg-white"}`}>
                            <PostNotAvaliable />
                        </div>
                    ) : (
                        <ViewOtherPostOnProfile                         
                        PersonalData={PersonalData}
                        PostDataByTime={PostDataByTime}/>
                    )}
                </section>
            )}
        </main>
    )
}