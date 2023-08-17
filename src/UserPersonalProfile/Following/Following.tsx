import { BiSolidUserCircle, BiDotsHorizontalRounded } from 'react-icons/bi';
import FollowersFollowingH from '../FollowingFollowersH';
import { useThemeStore } from '../../Zustand';
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config';
import { useState, useEffect } from 'react'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { Oval } from 'react-loader-spinner'
import { Popover } from '@headlessui/react'
import { RiShareForwardBoxLine } from 'react-icons/ri'
import { MdOutlineGroupRemove } from 'react-icons/md'
interface UserDatas {
    userData: any;
    SuggestData: any;
}

export default function Following({ userData, SuggestData }: UserDatas) {
    let userid = sessionStorage.getItem('UserId')
    const theme = useThemeStore((state: any) => state.theme);
    const followingIds = new Set(userData && userData.Following);
    const suggestedUsers = SuggestData && SuggestData.filter((user: any) => followingIds.has(user.id));

    // this is to make follower btn and dot icon not clickable
    const handleIconClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };


    // ! states
    const [hoverStates, setHoverStates] = useState(Array(suggestedUsers.length).fill(false));

    const handleMouseEnter = (index: number) => {
        setHoverStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
        });
    };

    const handleMouseLeave = (index: number) => {
        setHoverStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = false;
            return newStates;
        });
    };

    const handleUnfollow = async (dataid: string) => {
        try {
            const userDocRefFollowing = doc(db, 'users', userid as string);
            await updateDoc(userDocRefFollowing, {
                Following: arrayRemove(dataid), // Remove the user ID from Following array
            });

            const userDocRefFollowers = doc(db, 'users', dataid);
            await updateDoc(userDocRefFollowers, {
                Followers: arrayRemove(userid), // Remove the current user ID from the target user's Followers array
            });

            console.log('Unfollow successful!');
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData && SuggestData) {
            setIsLoading(false);
        }
    }, [userData, SuggestData]);;

        const handleShare = async (Username: string, name: string) => {
            try {
                await navigator.share({
                    title: `${name}(@${Username})`,
                    text: 'Check out this awesome content!',
                    url: `/User/${Username}`,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        };


    return (
        <main className={`min-h-[85vh] ${theme ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <FollowersFollowingH />
            <section className='px-2 flex flex-col gap-4 w-full'>
                {isLoading ? (
                    <div className='flex justify-center mt-4'><Oval
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

                    /></div>
                ) : (
                    suggestedUsers.map((user: any) => (
                        <Link to={`/User/${user.username}`} key={user.id}
                            className={`select-none py-1 transition-all ${theme
                                ? "hover:bg-[#ffffff16]"
                                : "hover:bg-[#00000010]"}`}>
                            <section className='flex w-full'>
                                <section>
                                    {user.profileImage === '' ? (
                                        <div className={`text-[52px] rounded-full ${theme ? 'text-white' : 'text-[#000000d7]'}`}>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <img src={user.profileImage} alt='Profile' className='w-12 h-12 rounded-full object-cover' />
                                    )}
                                </section>
                                <section className='flex flex-col ml-1'>
                                    <p className='font-bold text-base'>{user.fullName}</p>
                                    <p className={`-mt-[2px] font-semibold text-sm ${theme ? 'text-[#ffffffc3]' : 'text-[#0000009f]'}`}>
                                        @{user.username}
                                    </p>
                                </section>
                                <div className='ml-auto' onClick={handleIconClick}>
                                    <aside className='flex gap-2'>
                                        <button
                                            onMouseEnter={() => handleMouseEnter(user.id)}
                                            onMouseLeave={() => handleMouseLeave(user.id)}
                                            onClick={() => handleUnfollow(user.id)}
                                            className={`font-medium py-[6px] px-3 rounded-full ${hoverStates[user.id] ? "bg-red-500 text-white" : theme ? "bg-[#ffffff] text-black" : "bg-[#000000a5] text-white"}`}
                                        >
                                            {hoverStates[user.id] ? "Unfollow" : "Following"}
                                        </button>
                                        <Popover className='relative'>
                                        <Popover.Button  className='text-2xl transition-all cursor-pointer hover:bg-[#1d9cf068] pt-1 rounded-full px-1 mt-1 outline-none'>
                                            <BiDotsHorizontalRounded />
                                        </Popover.Button>
                                        <Popover.Panel   className={`absolute  right-7 w-52 top-0 pt-2 pb-4  rounded-2xl ${theme 
                                        ? "shadow-white shadow-ShareProfilePopupW bg-black"
                                        : "shadow-black shadow-2xl bg-white"}`}>

                                        <Popover.Button  onClick = {(() => handleShare(user.username, user.fullName))}                                         
                                        className={`flex gap-2 py-1 mt-2 w-full px-3 ${theme 
                                        ? "hover:bg-[#ffffff16]" : "hover:bg-[#00000010]" }`}>
                                            <span className=' text-xl mt-[3px]'><RiShareForwardBoxLine /></span>
                                            <p className=' font-semibold'>Share profile via...</p>
                                        </Popover.Button>

                                        <Popover.Button onClick={() => handleUnfollow(user.id)} 
                                        className={`flex gap-2 py-1 mt-2 w-full  px-3 ${theme 
                                        ? "hover:bg-[#ffffff16]" : "hover:bg-[#00000010]" }`}>
                                            <span className=' text-xl mt-[3px]'><MdOutlineGroupRemove /></span>
                                            <p className=' font-semibold  text-left whitespace-nowrap text-ellipsis overflow-hidden w-full '>Remove @{user.username}</p>
                                        </Popover.Button>

                                        </Popover.Panel>    
                                        </Popover>
                                    </aside>
                                </div>
                            </section>
                            <p className='font-medium ml-[52px] text-sm'>{user.bio}</p>
                        </Link>
                    ))
                )}
            </section>
        </main>
    );
}
