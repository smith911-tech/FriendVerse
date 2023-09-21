interface Props{
    post: any
    Popover : any
}
import { AiTwotoneLike } from 'react-icons/ai'
import { useThemeStore } from '../../Zustand';
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import Likebutton from './Post Buttons/Likebutton';
import Sharebutton from './Post Buttons/Sharebutton';
import Commentbutton from './Post Buttons/Commentbutton';
import Repost from './Post Buttons/Repost';
import { collection, onSnapshot, setDoc, doc} from "firebase/firestore"
import { db } from '../../firebase-config'
import { useState, useEffect, useRef } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import { BiSolidUserCircle } from 'react-icons/bi'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { RotatingLines } from "react-loader-spinner";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useInViewport } from 'react-in-viewport';
export default function Postedbtn({post, Popover}: Props) {
    //? uid
    let userid = sessionStorage.getItem('UserId')
    const theme = useThemeStore((state: any) => state.theme);
    const [likes, setlikes] = useState<any[]>([]);
    const [impressionData, setImpressionData] = useState<any[]>([]);
    const [SuggestData, setSuggestData] = useState<any[]>([]);
    useEffect(() => {
        const handleSnapshot = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setlikes(data);
        };
        const handleSnapshoted = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setSuggestData(data);
        };
        const handleImpression = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setImpressionData(data);
        };
        const unsubscribe = onSnapshot(collection(db, "posts",  post.id, 'Likes'), handleSnapshot);
        const unsubscribed = onSnapshot(collection(db, "users"), handleSnapshoted);
        const unsubscribImpression = onSnapshot(collection(db, "posts", post.id, 'Impression'), handleImpression);
        return () => {
            unsubscribe();
            unsubscribed();
            unsubscribImpression();
        };
    }, []);
    
    const matchingSuggestions = SuggestData && SuggestData.filter((suggest) => likes.some((like) => like.id === suggest.id));
    
    let Likes 
    const LikesCount = likes &&  likes?.length || 0;

    if (LikesCount > 999) {
        Likes = (LikesCount / 1000).toFixed(1) + 'k';
    } else {
        Likes = LikesCount.toString();
    }
    const RefDoc: any = useRef();


    const {inViewport} = useInViewport(
        RefDoc
    );
    useEffect(() => {
        const DataDocImpression = doc(db, "posts", post.id, 'Impression', userid as string)
        if (inViewport) {
            setDoc(DataDocImpression, {
                time: new Date()
            })
        }
    }, [inViewport])
    let impression
    const impressionCount = impressionData && impressionData?.length || 0;

    if (impressionCount > 999) {
        impression = (impressionCount / 1000).toFixed(1) + 'k';
    } else {
        impression = impressionCount.toString();
    }

    return (
        <main ref={RefDoc} className="mt-3 px-3">
            <section>
            <div className={`
            ${LikesCount === 0 && impressionCount === 0 ? "hidden" : "flex mb-1 justify-between"}
            `}>
                    <Popover.Button title='Likes' 
                    className={`flex hover:underline cursor-pointer 
                    ${LikesCount > 0 ? " visible" : " invisible"}`}>
                        <button className='text-white text-base bg-blue-600 rounded-2xl -rotate-12 p-[2px]'>
                            <AiTwotoneLike />
                        </button>
                        <span className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}>{Likes}
                        </span>
                    </Popover.Button>
                    <span title='Impression' className={`flex hover:underline cursor-pointer 
                        ${impressionCount > 0 ? " visible" : " invisible"}`}>
                        <button className=' rounded-2xl  p-[2px]'>
                            <TbBrandGoogleAnalytics />
                        </button>
                        <span className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}>{impression}</span>
                    </span>
            </div>
            <hr />
            </section>
            <article className="flex gap-[1%] justify-center">
                <Likebutton post={post} likes={likes} />
                <Repost post={post} />
                <Commentbutton post={post}/>
                <Sharebutton />
            </article>
            <Popover.Panel className={` absolute z-10 top-0 h-full w-full -ml-2 overflow-auto rounded-2xl ${theme ? "bg-black text-[#ffff]" : "bg-white text-[#000000]"}`}>
                <header className='flex justify-between px-3 py-3'>
                    <h2 className=' text-lg'>Reactions</h2> 
                    <Popover.Button>
                        <FaXmark className=' text-2xl' />
                    </Popover.Button>
                </header>
                <hr />
                <article className=' px-2 my-2'>
                    {matchingSuggestions.length > 0 ? (
                        matchingSuggestions.map((data: any) => (
                            <Link to={`${userid !== data.id ? `/User/${data.username}` : '/Profile'}`} key={data.id}>
                                <div className="flex w-full py-2">
                                    {data.profileImage === '' ? (
                                        <div className={`text-[52px] rounded-full ${theme ? 'text-white' : 'text-[#000000d7]'}`}>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <LazyLoadImage effect="blur" src={data.profileImage} alt='Profile' className='w-12 h-12 rounded-full object-cover' loading='lazy' />
                                    )}
                                    <section className='flex flex-col ml-1'>
                                        <p className='font-bold text-base flex'>
                                            {data.fullName}
                                            {data && data.Verify && (
                                                <span className='text-[#1d9bf0] mt-1'>
                                                    <VscVerifiedFilled />
                                                </span>
                                            )}
                                        </p>
                                        <p className={`-mt-[2px] font-semibold text-sm ${theme ? 'text-[#ffffffc3]' : 'text-[#0000009f]'}`}>
                                            @{data.username}
                                        </p>
                                    </section>
                                </div>
                                <p className='font-medium ml-[52px] text-sm -mt-1 mb-3'>{data.bio}</p>
                                <hr />
                            </Link>
                        ))
                    ) :
                        (
                            <div className=" min-h-screen  w-full">
                                <div className=" flex justify-center w-full">
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                    />
                                </div>
                            </div>
                        )}
                </article>
            </Popover.Panel>
        </main>
    )
}