interface userData {
    userData: any
    SuggestData: any
}
import { Link } from "react-router-dom";
import { LongCard } from "../GeneralComponent/LoadingCard";
import { useThemeStore } from '../Zustand';
import { useState} from "react";
import { BiSolidUserCircle } from 'react-icons/bi'
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase-config';
import { VscVerifiedFilled } from 'react-icons/vsc'
export default function RequestContent({ userData, SuggestData }: userData) {
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    let userid = sessionStorage.getItem('UserId')
    const followerid = new Set(userData && userData.Following);
    const suggestedUsers = SuggestData && SuggestData.filter((user: any) => followerid.has(user.id));

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

    const handleFollow = async (dataid: string) => {
        try {
            const DataDocRefFollwing = doc(db, "users", userid as string)
            await updateDoc(DataDocRefFollwing, {
                Following: arrayUnion(dataid)
            })
            const DataDocRefFollowers = doc(db, "users", dataid)
            await updateDoc(DataDocRefFollowers, {
                Followers: arrayUnion(userid)
            })
            console.log("Follow successful!");
        }
        catch (error) {
            console.error("Error following user:", error);
        }
    }

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

    // ! making the follow and followig not clcik as link
    const handleIconClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <main className={`${theme ? "bg-black text-[#ffffffe0]" : "bg-[#ffff] text-black"} mb-10`}>
            <article className=" py-2 px-1">
            {SuggestData.length > 0 ? (
                SuggestData.filter((data: any) => data.id !== userid).map((data: any)  => (
                    <Link to={`/User/${data.username}`} key={data.id}>
                        <div className="flex w-full">
                            {data.profileImage === '' ? (
                                <div className={`text-[52px] rounded-full ${theme ? 'text-white' : 'text-[#000000d7]'}`}>
                                    <BiSolidUserCircle />
                                </div>
                            ) : (
                                <img src={data.profileImage} alt='Profile' className='w-12 h-12 rounded-full object-cover' />
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
                        <div className=" float-right -mt-12 mr-2" onClick={handleIconClick}>
                            {userData.Following?.includes(data.id) ? (
                                <button
                                    onMouseEnter={() => handleMouseEnter(data.id)}
                                    onMouseLeave={() => handleMouseLeave(data.id)}
                                    onClick={() => handleUnfollow(data.id)}
                                    className={`font-medium py-[6px] px-3 rounded-full ${hoverStates[data.id] ? "bg-red-500 text-white" : theme ? "bg-[#ffffff] text-black" : "bg-[#000000a5] text-white"}`}
                                >
                                    {hoverStates[data.id] ? "Unfollow" : "Following"}
                                </button>
                            ) : (
                                <button onClick={() => handleFollow(data.id)}
                                    className={`font-medium py-[6px] px-4 rounded-full ${theme ? "bg-[#ffffff] text-black" : "bg-[#000000a5] text-white"}`}>
                                    Follow
                                </button>
                            )}
                        </div>
                        <p className='font-medium ml-[52px] text-sm -mt-1 mb-6'>{data.bio}</p>
                    </Link>
                ))
            ):
            (
                <LongCard />
            )}
            </article>
        </main>
    )
}