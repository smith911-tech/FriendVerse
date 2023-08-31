interface userDats{
    SuggestData : any
}
import { collection, onSnapshot } from "firebase/firestore"
import { db } from '../firebase-config'
import {useState, useEffect} from 'react'
import { useThemeStore } from '../Zustand'
import { LongCard } from '../GeneralComponent/LoadingCard'
import { BiSolidUserCircle, BiTimeFive, BiDotsHorizontal } from 'react-icons/bi'
import { Link } from "react-router-dom"
import { VscVerifiedFilled } from 'react-icons/vsc'

export default function Poststion({SuggestData}: userDats) {
    let userid = sessionStorage.getItem('UserId')
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    //! states
    const [Posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 

    // !suggestions user data
    useEffect(() => {
        const handleSnapshot = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setPosts(data);
            setIsLoading(false);
        };
        const unsubscribe = onSnapshot(collection(db, "posts"), handleSnapshot);
        return () => {
            unsubscribe();
        };
    }, [])

    return(
        <main>
            <section className="md970:w-[90%] block mb-0 mx-auto mt-4">
                {isLoading ? ( // Render loading state
                    <LongCard />
                ) : (
                    Posts.map((post) => {
                        const authorData = SuggestData.find((user: any) => user.id === post.author);
                        console.log(authorData)
                        if (authorData) {
                            return (
                                <div className={` py-3 rounded-md mb-8 ${theme 
                                ? "bg-black text-[#ffff]" : "bg-white text-[#000000]"}`} key={post.id}>
                                    <main className="flex px-2 justify-between">
                                        <aside className="flex">
                                        <section>
                                            {authorData.profileImage === "" ? (
                                                <Link to={`${userid !== post.author ? `/User/${post.username}` : '/Profile'}`}>
                                                    <div className={`text-[40px] rounded-full 
                                        ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                                        <BiSolidUserCircle />
                                                    </div>
                                                </Link>
                                            ) : (
                                                <Link to={`${userid !== post.author ? `/User/${post.username}` : '/Profile'}`}>
                                                    <img
                                                        src={authorData.profileImage}
                                                        alt="Profile"
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                </Link>
                                            )}
                                        </section>
                                        <span>
                                                <Link to={`${userid !== post.author ? `/User/${post.username}` : '/Profile'}`}className=' ml-2 text-sm font-medium flex'>
                                                    {authorData.fullName}
                                                    {authorData.Verify && (
                                                        <span className='text-[#1d9bf0] mt-[2px]'>
                                                            <VscVerifiedFilled />
                                                        </span>
                                                    )}
                                                </Link>
                                            <span className={`ml-2 text-sm flex gap-[2px] select-none
                                            ${theme ? " text-[#ffffffaa]" : "text-[#000000a0]"}`}>
                                                20hrs
                                                <span className="mt-1">
                                                    <BiTimeFive />
                                                </span>
                                            </span>
                                        </span>
                                        </aside>

                                        <aside className=" text-2xl my-[6px] cursor-pointer">
                                            <BiDotsHorizontal />
                                        </aside>
                                    </main>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })
                )}
            </section>
        </main>
    )
}