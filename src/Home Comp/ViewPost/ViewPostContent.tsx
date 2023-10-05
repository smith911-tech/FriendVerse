interface Props {
    Post: any
    SuggestData : any
    userData : any
}
import { useThemeStore } from '../../Zustand';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { BiSolidUserCircle, BiTimeFive, BiDotsHorizontal } from 'react-icons/bi'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Postedarticle from "../PostedContent/Postedarticle"
import PostedVideo from "../PostedContent/PostedVideos"
import PostedCode from "../PostedContent/PostedCode"
import PostedImages from "../PostedContent/PostedImages"
import Postedbtn from "../PostedContent/Postedbtn"
import PostComment from './Postcomment';
import { Oval } from 'react-loader-spinner'
import { Popover } from '@headlessui/react'
import { FaCopy } from 'react-icons/fa6'
import { FiShare2 } from 'react-icons/fi'
import { message } from 'antd';
import { collection,  doc, deleteDoc, getDocs, query, where } from "firebase/firestore"
import { RiDeleteBinLine } from 'react-icons/ri'
import { db } from '../../firebase-config'
import PostedYtLink from ".././PostedContent/PostedYtLink"
import PostNotAvaliable from '../../GeneralComponent/PostNotAvailable';
import PostPop from '../../assets/PostNotify.mp3'
import ViewComment from './ViewComments';

export default function ViewPostContent({Post, SuggestData, userData}: Props){
    const [soundDelete] = useState(new Audio(PostPop));
    let userid = sessionStorage.getItem('UserId')
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);

    function HandleBack() {
        navigate("/Home")
    }
    const navigate = useNavigate()
    const handlePopState = () => {
        if (window.location.pathname === `/Post/${Post.id}`) {
            navigate(-1)
        }
    };
    useEffect(() => {
        window.addEventListener('popstate', handlePopState);
    }, [navigate]);

    const authorData = SuggestData && Post && SuggestData.find((user: any) => user.id ===  Post.author);


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
        } else if (timeDiffInSeconds < 2419200) { // 28 days, approximately 4 weeks
            const weeks = Math.floor(timeDiffInSeconds / 604800);
            return `${weeks}w ago`;
        } else if (postDate.getFullYear() === currentDate.getFullYear()) {
            const month = postDate.toLocaleString('default', { month: 'short' });
            const day = postDate.getDate();
            return `${day} ${month}`;
        } else {
            const month = postDate.toLocaleString('default', { month: 'short' });
            const day = postDate.getDate();
            const year = postDate.getFullYear() % 100; // Get last two digits of year
            return `${day} ${month} ${year}`;
        }
    };
    const formattedDate = Post && formatPostDate(Post.time)

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        if (SuggestData && Post && userData) {
            setIsLoading(false);
        }
        else{
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        }
    }, [SuggestData, Post, userData]);;

    const CopySuccessful = () => {
        message.success('Copied');
    };
    const DeleteSuccessful = () => {
        message.success('Post Deleted');
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
        try {
            // Delete comments associated with the post
            const commentsSnapshot = await getDocs(
                query(collection(db, "Comment"), where("PostId", "==", Postid))
            );

            commentsSnapshot.forEach(async (commentDoc) => {
                await deleteDoc(doc(db, "Comment", commentDoc.id));
            });

            await deleteDoc(doc(db, "posts", Postid as string));
            soundDelete.play();
            DeleteSuccessful();
            navigate('/Home')
        } catch (error) {
            console.error("Error deleting post and associated comments: ", error);
        }
    };

    return(
        <main className='sm650:pb-20 relative w-full'>
            <header className={`
            sticky top-16 z-[50] flex py-2 gap-3 pl-1 w-full
            ${theme ? "bg-[black] text-white" : "bg-[white] text-black"}`}>
                <span onClick={HandleBack} className={`text-xl py-[5px] px-[3px] rounded-full cursor-pointer
                ${theme ? "hover:bg-[#ffffff3e]" : "hover:bg-[#00000041]"}`}>
                    <AiOutlineArrowLeft />
                </span>
                <p className=' font-medium text-xl select-none'>Post</p>
            </header>
            {isLoading ? (
                <div className='flex justify-center mt-4'>
                    <Oval
                        height={80}
                        width={80}
                        color="#328fdb"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="rgb(50,143,219,0.4)"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                </div>
            ) : (
                Post && authorData ? (
                        <article className={theme ? "bg-black text-[#ffff]" : "bg-white text-[#000000]"}>
                            <Popover className='py-3 rounded-md mb-4' key={Post.id}>
                                <main className="flex px-2 justify-between">
                                    <aside className="flex">
                                        <section>
                                            {authorData.profileImage === "" ? (
                                                <Link to={`${userid !== Post.author ? `/User/${authorData.username}` : '/Profile'}`}>
                                                    <div className={`text-[40px] rounded-full select-none ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                                        <BiSolidUserCircle />
                                                    </div>
                                                </Link>
                                            ) : (
                                                <Link to={`${userid !== Post.author ? `/User/${authorData.username}` : '/Profile'}`}>
                                                    <LazyLoadImage
                                                        effect="blur"
                                                        src={authorData.profileImage}
                                                        alt="Profile"
                                                        className="w-10 h-10 rounded-full object-cover select-none"
                                                    />
                                                </Link>
                                            )}
                                        </section>
                                        <span>
                                            <Link to={`${userid !== Post.author ? `/User/${authorData.username}` : '/Profile'}`} className='ml-2 text-sm font-medium flex hover:underline select-none '>
                                                {authorData.fullName}
                                                {authorData.Verify && (
                                                    <span className='text-[#1d9bf0] mt-[2px]'>
                                                        <VscVerifiedFilled />
                                                    </span>
                                                )}
                                            </Link>
                                            <span className={`ml-2 text-sm flex gap-[2px] select-none ${theme ? "text-[#ffffffaa]" : "text-[#000000a0]"}`}>
                                                {formattedDate}
                                                <span className="mt-1">
                                                    <BiTimeFive />
                                                </span>
                                            </span>
                                        </span>
                                    </aside>
                                    <Popover className='relative'>
                                        <Popover.Button>
                                            <aside className=" text-2xl my-[6px] cursor-pointer">
                                                <BiDotsHorizontal />
                                            </aside>
                                        </Popover.Button>
                                        <Popover.Panel
                                            className={`absolute top-10 right-3 shadow-2xl z-20 w-56 py-2  rounded ${theme ? "bg-[#303031] text-[#ffff]" : "bg-[white] text-[#000000]"}`}>
                                            <div className=" flex flex-col w-full">
                                                <Popover.Button
                                                    onClick={(() => handleCopyClick(Post.id))}
                                                    className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer">
                                                    <FaCopy className="text-2xl px-1" /> <p>Copy link to post</p>
                                                </Popover.Button>
                                                <Popover.Button
                                                    onClick={(() => handleShare(Post.id))}
                                                    className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer">
                                                    <FiShare2 className="text-2xl px-1" /> <p>Share</p>
                                                </Popover.Button>
                                                {userid === Post.author && (
                                                    <Popover.Button
                                                        onClick={(() => handleDelete(Post.id))}
                                                        className="flex gap-1 w-full py-2 pl-3 hover:bg-[#00000076] cursor-pointer text-red-700">
                                                        <RiDeleteBinLine className="text-2xl px-1" /> <p>Delete Post</p>
                                                    </Popover.Button>
                                                )}
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                </main>
                                <section>
                                    {Post.article ? <Postedarticle post={Post} /> : null}
                                    {Post.video ? <PostedVideo post={Post} /> : null}
                                    {Post.Code ? <PostedCode post={Post} /> : null}
                                    {Post.images ? <PostedImages post={Post} /> : null}
                                    {!Post.images && !Post.Code && !Post.video ? <PostedYtLink post={Post} /> : null}
                                </section>
                                <Postedbtn post={Post} Popover={Popover} />
                                <PostComment userData={userData} post={Post} />
                            </Popover>
                            <ViewComment post={Post} SuggestData={SuggestData} />
                    </article>
                ): (
                    <PostNotAvaliable />
                )
            )}
        </main>
    )
}