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
import { BiRepost } from 'react-icons/bi'
import { Popover } from '@headlessui/react'
import { FaCopy } from 'react-icons/fa6'
import { FiShare2 } from 'react-icons/fi'
import { message } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri'
import { doc, deleteDoc } from "firebase/firestore";
// import { ref, deleteObject } from "firebase/storage";

export default function Postsection({SuggestData}: Props) {
    let userid = sessionStorage.getItem('UserId')
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    //! states
    const [Posts, setPosts] = useState<any[]>([]);
    const [repost, setRepost] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const [repostedData, setRepostedData] = useState<any[]>([]);

    useEffect(() => {
        const handleSnapshot = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({
                ...doc.data(),
                id: doc.id 
            }));
            setIsLoading(false);
            setPosts(data);
        };
        const handleSnapshoted = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setRepost(data);
        };
        const unsubscribe = onSnapshot(collection(db, "posts"), handleSnapshot);
        const unsubscribed = onSnapshot(collection(db, 'Repost'), handleSnapshoted);
        return () => {
            unsubscribe();
            unsubscribed();
        };
    }, [])
    useEffect(() => {
        const combined = repost.map((repost) => {
            const originalPost = Posts.find((post) => post.id === repost.PostId);
            return {
                ...repost,
                ...originalPost,
            };
        });
        setRepostedData(combined);
    }, [repost, Posts]);


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
    }
    
    function generateRandomKey() {
        // Get the current timestamp
        const timestamp = Date.now();

        // Generate a random number between 1 and 1000
        const randomNumber = Math.floor(Math.random() * 1000) + 1;

        // Combine the timestamp and random number to create a unique key
        const uniqueKey = `${timestamp}-${randomNumber}`;

        return uniqueKey;
    }


    const CombinedData = [
        ...Posts,
        ...repostedData.filter((repost) => Posts.some((post) => post.id === repost.id))
    ];

    const CopySuccessful = () => {
        message.success('Copied');
    };


    const handleCopyClick = (id: string) => {
        CopySuccessful()
        const url = `https://friend-verse.vercel.app/Post/${id}`
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    };
    const handleShare = async (id: string) => {
        try {
            await navigator.share({
                text: 'Check out this awesome content!',
                url: `/Post/${id}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }
    const handleDelete = async (Postid: String) => {
        // const path = `Posts/${Postid}`
        // const storageRef = ref(storage, path);
        // console.log(storageRef);
        try {
            // await deleteOb(storageRef)
            await deleteDoc(doc(db, "posts", Postid as string));
        }
        catch(error) {
            console.log('error', error);
        }
        finally{
        }
    } 
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
                    CombinedData.map((post) => {
                        const authorData = SuggestData.find((user: any) => user.id === post.author);
                        const Repostauthor =SuggestData && SuggestData?.find((user: any) => user?.id === post?.RepostAuthor);
                        if (authorData) {
                            const formattedDate = formatPostDate(post.time);
                            return (
                                <main
                                key={post.RepostAuthor ? generateRandomKey() : post.id} className="relative">
                                    <Popover className={`py-3 rounded-md mb-4 relative ${theme
                                        ? "bg-black text-[#ffff]" : "bg-white text-[#000000]"}`}
                                        >
                                        <div className={`  ${theme
                                        ? " text-[#ffffffb0]" : " text-[#000000aa]"}`}>
                                            {Repostauthor && (
                                                <Link to={`${userid !== post.RepostAuthor ? `/User/${Repostauthor.username}` : '/Profile'}`} className="flex ml-4 text-sm gap-1 pb-4">
                                                    <BiRepost className=' text-xl' />
                                                    {userid === post.RepostAuthor ? 'You Reposted' : `${Repostauthor.username} Reposted`}
                                                </Link>
                                            )}
                                        </div>
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
                                            <Popover className='relative'>
                                                <Popover.Button className='outline-none'>
                                                    <aside className=" text-2xl my-[6px] cursor-pointer">
                                                        <BiDotsHorizontal />
                                                    </aside>
                                                </Popover.Button>
                                                <Popover.Panel 
                                                    className={`absolute top-10 right-3 shadow-2xl z-20 w-56 py-2  rounded                                                    ${theme ? "bg-[#303031] text-[#ffff]" : "bg-[white] text-[#000000]"}`}>
                                                    <div className=" flex flex-col w-full">
                                                        <Popover.Button 
                                                        onClick={(() => handleCopyClick(post.id))}
                                                        className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer">
                                                            <FaCopy className="text-2xl px-1"/> <p>Copy link to post</p>
                                                        </Popover.Button>
                                                        <Popover.Button
                                                        onClick={(() => handleShare(post.id))}
                                                        className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer">
                                                            <FiShare2 className="text-2xl px-1" /> <p>Share</p>
                                                        </Popover.Button>
                                                        {userid === post.author && (
                                                            <Popover.Button 
                                                                onClick={(() => handleDelete(post.id))}
                                                                className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer">
                                                                <RiDeleteBinLine className="text-2xl px-1" /> <p>Delete Post</p>
                                                            </Popover.Button>
                                                        )}
                                                    </div>
                                                </Popover.Panel>
                                            </Popover>
                                        </main>
                                        <section>
                                            {post.article ? <Postedarticle post={post} /> : null}
                                            {post.video ? <PostedVideo post={post} /> : null}
                                            {post.Code ? <PostedCode post={post} /> : null}
                                            {post.images ? <PostedImages post={post} /> : null}
                                        </section>
                                        <Postedbtn post={post} Popover={Popover}/>
                                    </Popover>
                                </main>
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