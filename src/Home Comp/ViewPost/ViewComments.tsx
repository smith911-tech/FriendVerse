import { FaRegCommentDots } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, updateDoc, arrayRemove, arrayUnion, doc } from "firebase/firestore"
import { db } from '../../firebase-config'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiSolidUserCircle } from 'react-icons/bi'
import { useThemeStore } from '../../Zustand';
import { VscVerifiedFilled } from 'react-icons/vsc'

import { IoHeartDislikeOutline } from 'react-icons/io5'
import { FcLike } from 'react-icons/fc'
import DeleteCommentPop from './DeleteCommentPop';
import CommentLikesCount from './CommentLikesCount';


interface Props {
    post: any
    SuggestData: any
}

export default function ViewComment({ post, SuggestData }: Props) {
    let userid = sessionStorage.getItem('UserId')
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    const [comments, setComments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const q = query(collection(db, "Comment"), where("PostId", "==", post.id));

        const handleSnapshot = async (snapshot: any) => {
            const data = await Promise.all(snapshot.docs.map(async (doc: any) => {
                const commentData = doc.data();
                const authorId = commentData.author;

                // Find the author's information from SuggestData
                const author = SuggestData.find((user: any) => user.id === authorId);

                return {
                    ...commentData,
                    id: doc.id,
                    author: author, 
                };
            }));
            setIsLoading(false);
            setComments(data);
        };

        const unsubscribe = onSnapshot(q, handleSnapshot);

        return () => {
            unsubscribe();
        };
    }, [post.id, SuggestData]);

    const formatPostDate = (timestamp: any): string => {
        const currentDate: any = new Date();
        const postDate = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
        const timeDiffInSeconds = Math.floor((currentDate - postDate) / 1000);

        if (timeDiffInSeconds < 60) {
            return `${timeDiffInSeconds}s`;
        } else if (timeDiffInSeconds < 3600) {
            const minutes = Math.floor(timeDiffInSeconds / 60);
            return `${minutes}m`;
        } else if (timeDiffInSeconds < 86400) { // 24 hours in seconds
            const hours = Math.floor(timeDiffInSeconds / 3600);
            return `${hours}h`;
        } else if (timeDiffInSeconds < 604800) {
            const days = Math.floor(timeDiffInSeconds / 86400);
            return `${days}d`;
        } else if (timeDiffInSeconds < 2419200) { // 28 days, approximately 4 weeks
            const weeks = Math.floor(timeDiffInSeconds / 604800);
            return `${weeks}w`;
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
    

    const handleLike = async (Commentid: string) => {
        try {
            const DataDocRefLike = doc(db, "Comment", Commentid)
            await updateDoc(DataDocRefLike, {
                Likes: arrayUnion(userid)
            })
        }
        catch (error) {
            console.error("Error following user:", error);
        }
    }
    const handleUnLike = async (Commentid: string) => {
        try {
            const DataDocRefLike = doc(db, "Comment", Commentid)
            await updateDoc(DataDocRefLike, {
                Likes: arrayRemove(userid)
            })
        }
        catch (error) {
            console.error("Error following user:", error);
        }
    }
    const CommetByTime = comments.sort((a, b) => b.time - a.time);

    return (
        <main>
            {isLoading ? (
                <div className='flex items-center justify-center gap-2 py-5'>
                    <FaRegCommentDots className="text-5xl text-blue-500" />
                    <p className='text-lg text-gray-600'>Loading comments...</p>
                </div>
            ) : (
                <div>
                    {comments.length === 0 ? (
                        <div className='flex items-center justify-center gap-2 py-5'>
                            <FaRegCommentDots className="text-5xl text-blue-500" />
                            <p className='text-lg text-gray-600'>Be the first to comment</p>
                        </div>
                    ) : (
                        <div>
                            {CommetByTime.map((comment) => (
                                <div key={comment.id}>
                                    {comment.author && (
                                        <article className='py-4 px-2 flex gap-2 w-full'>
                                        <main>
                                                {comment.author.profileImage === "" ? (
                                                    <Link to={`${userid !== comment.author.id ? `/User/${comment.author.username}` : '/Profile'}`}>
                                                        <div className={`text-[40px] rounded-full select-none 
                                        ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                                            <BiSolidUserCircle />
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <Link to={`${userid !== comment.author.id ? `/User/${comment.author.username}` : '/Profile'}`}>
                                                        <LazyLoadImage
                                                            effect="blur"
                                                            src={comment.author.profileImage}
                                                            alt="Profile"
                                                            className="w-10 h-10 rounded-full object-cover select-none "
                                                        />
                                                    </Link>
                                                )}
                                        </main>
                                            <aside className='w-[84%] md734:w-[90%]'>
                                                <main className={` pt-1 px-2 rounded-r-xl rounded-b-xl relative
                                                ${theme ? "bg-[#1b1d21]" : "bg-[#f0f2f5]"}`}>
                                                    <div className='flex justify-between'>
                                                        <section className='flex gap-1'>
                                                            <Link to={`${userid !== comment.author.id ? `/User/${comment.author.username}` : '/Profile'}`} className='ml-2 text-sm font-medium flex hover:underline select-none '>
                                                                {comment.author.fullName}
                                                                {comment.author.Verify && (
                                                                    <span className='text-[#1d9bf0] mt-[2px]'>
                                                                        <VscVerifiedFilled />
                                                                    </span>
                                                                )}
                                                            </Link>
                                                            <p className=' text-xs'>{formatPostDate(comment.time)}</p>
                                                        </section>
                                                        <DeleteCommentPop comment={comment} post={post}/>
                                                    </div>
                                                    <p className={` text-xs ml-2 text-[#0000009c] -mt-1 pb-4 select-none ${theme ? "text-[#ffffff91]" : "text-[#0000009c] "}`}>{comment.author.bio}</p>
                                                    <p className='text-sm ml-2 pb-2 break-words'>{comment.Comment}</p>
                                                    <CommentLikesCount comment={comment}/>
                                                </main>
                                                <button onClick={() => (comment.Likes?.includes(userid) ? handleUnLike(comment.id) : handleLike(comment.id))} className={`flex gap-1 mt-1 outline-none text-sm font-medium text-[#0000007f] ml-4
                                                ${theme ? "text-[#ffffff91]" : "text-[#0000007f] "}
                                                ${comment.Likes?.includes(userid) ? "text-red-500" : ""}`}>
                                                    {comment.Likes?.includes(userid) ? 'Unlike' : 'Like'}
                                                    {comment.Likes?.includes(userid) 
                                                    ? <FcLike className='mt-[2px]'/> 
                                                    : < IoHeartDislikeOutline className='mt-1'/>}
                                                </button>
                                        </aside>
                                        </article>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
