interface Props{
    SuggestData : any
}
import { collection, onSnapshot } from "firebase/firestore"
import { db } from '../firebase-config'
import {useState, useEffect} from 'react'
import { useThemeStore } from '../Zustand'
import { BiSolidUserCircle, BiTimeFive, BiDotsHorizontal } from 'react-icons/bi'
import { Link } from "react-router-dom"
import { VscVerifiedFilled } from 'react-icons/vsc'
import Postedarticle from "./PostedContent/Postedarticle"
import PostedVideo from "./PostedContent/PostedVideos"
import PostedCode from "./PostedContent/PostedCode"
import PostedImages from "./PostedContent/PostedImages"
import Postedbtn from "./PostedContent/Postedbtn"
import { RotatingLines } from "react-loader-spinner";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Postsection({SuggestData}: Props) {
    let userid = sessionStorage.getItem('UserId')
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    //! states
    const [Posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 

    useEffect(() => {
        const handleSnapshot = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id 
            }));
            setIsLoading(false);
            setPosts(data);
        };
        const unsubscribe = onSnapshot(collection(db, "posts"), handleSnapshot);
        return () => {
            unsubscribe();
        };
    }, [])

    // ! date calculation
    const formatPostDate = (timestamp: any): string => {
        const currentDate: any = new Date();
        const postDate = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
        const timeDiffInSeconds = Math.floor((currentDate - postDate) / 1000);

        if (timeDiffInSeconds < 60) {
            return `${timeDiffInSeconds}s ago`;
        } else if (timeDiffInSeconds < 3600) {
            const minutes = Math.floor(timeDiffInSeconds / 60);
            return `${minutes}m ago`;
        } else if (timeDiffInSeconds < 86400) { // 24 hours in seconds
            const hours = Math.floor(timeDiffInSeconds / 3600);
            return `${hours}h ago`;
        } else if (timeDiffInSeconds < 604800) {
            const days = Math.floor(timeDiffInSeconds / 86400);
            return `${days}d ago`;
        } else if (timeDiffInSeconds < 31536000) { // 365 days in seconds
            const day = postDate.getDate();
            const month = postDate.toLocaleString('default', { month: 'short' });
            return `${day} ${month}`;
        } else {
            const day = postDate.getDate();
            const month = postDate.toLocaleString('default', { month: 'short' });
            const year = postDate.getFullYear() % 100; // Get last two digits of year
            return `${day} ${month} ${year}`;
        }
    };
    
    // Sort the Posts array based on the post timestamps
    const sortedPosts = Posts.slice().sort((a, b) => b.time.toMillis() - a.time.toMillis());
    return(
        <main>
            <section className="md970:w-[90%] block mb-0 mx-auto mt-4">
                {isLoading ? ( // Render loading state
                        <div className=" flex justify-center w-full">
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="50"
                                visible={true}
                            />
                        </div>
                ) : (
                    sortedPosts.map((post) => {
                        const authorData = SuggestData.find((user: any) => user.id === post.author);
                        if (authorData) {
                            const formattedDate = formatPostDate(post.time);
                            return (
                                <article className={` py-3 rounded-md mb-4 ${theme 
                                ? "bg-black text-[#ffff]" : "bg-white text-[#000000]"}`} key={post.id}>
                                    <main className="flex px-2 justify-between">
                                        <aside className="flex">
                                        <section>
                                            {authorData.profileImage === "" ? (
                                                <Link to={`${userid !== post.author ? `/User/${authorData.username}` : '/Profile'}`}>
                                                    <div className={`text-[40px] rounded-full select-none 
                                        ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                                        <BiSolidUserCircle />
                                                    </div>
                                                </Link>
                                            ) : (
                                                <Link to={`${userid !== post.author ? `/User/${authorData.username}` : '/Profile'}`}>
                                                    <LazyLoadImage
                                                        effect="blur"
                                                        src={authorData.profileImage}
                                                        alt="Profile"
                                                        className="w-10 h-10 rounded-full object-cover select-none "
                                                    />
                                                </Link>
                                            )}
                                        </section>
                                        <span>
                                                <Link to={`${userid !== post.author ? `/User/${authorData.username}` : '/Profile'}`} className=' ml-2 text-sm font-medium flex hover:underline select-none '>
                                                    {authorData.fullName}
                                                    {authorData.Verify && (
                                                        <span className='text-[#1d9bf0] mt-[2px]'>
                                                            <VscVerifiedFilled />
                                                        </span>
                                                    )}
                                                </Link>
                                            <span className={`ml-2 text-sm flex gap-[2px] select-none
                                            ${theme ? " text-[#ffffffaa]" : "text-[#000000a0]"}`}>
                                                {formattedDate}
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
                                    <section>
                                        {post.article ? <Postedarticle post={post} /> : null}
                                        {post.video ? <PostedVideo post={post}/> : null}
                                        {post.Code ? <PostedCode post={post} /> : null}
                                        {post.images ? <PostedImages post={post} /> : null}
                                    </section>
                                    <Postedbtn post={post}/>
                                </article>
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