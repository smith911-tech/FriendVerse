interface userdatas {
    data: any | null
    theme : any
    userData: any
    handleInputClick: () => void
    isInputClicked: boolean
    handleBodyClick: () => void
}
import { IoLocationOutline } from 'react-icons/io5'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import OtherUsersSlidesbtn from './ProfileSlides';
import { AiOutlineMail } from 'react-icons/ai'
import { db } from '../firebase-config';
import {useState} from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
export default function OthersProfileDetails({
    data,
    theme,
    userData,
    handleInputClick,
    isInputClicked,
    handleBodyClick
}: userdatas){


    //! Regular expression to find URLs in the bio text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    //! Function to replace URLs with anchor tags
    const replaceUrlsWithLinks = (text: string) => {
        return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${removeHttpFromUrl(url)}</a>`);
    };
    //! Function to remove "http://" or "https://" from the URL
    const removeHttpFromUrl = (url: string) => {
        return url.replace(/^(https?:\/\/)/, '');
    };

    const formattedBio = data.bio ? replaceUrlsWithLinks(data.bio) : null;


    // ! Data of birth convertion from timestamp
    const dataofbirth = data.dateOfBirth;
    const DODValue = new Date(dataofbirth.seconds * 1000);

    //! Define an array to get the month name
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    //! Formatting the date to show as "15 January 2004"
    const formattedDate = `${DODValue.getDate()} ${monthNames[DODValue.getMonth()]} ${DODValue.getFullYear()}`
    let userid = sessionStorage.getItem('UserId')



    const handleFollow = async () => {
        try{
            const DataDocRefFollwing = doc(db, "users", userid as string)
            await updateDoc(DataDocRefFollwing, {
                Following:  arrayUnion(data.id)
            })
            const DataDocRefFollowers = doc(db, "users", data.id)
            await updateDoc(DataDocRefFollowers, {
                Followers: arrayUnion(userid)
            })
            console.log("Follow successful!");
        }
        catch (error) {
            console.error("Error following user:", error);
        }
    }
    const handleUnfollow = async () => {
        try {
            const userDocRefFollowing = doc(db, "users", userid as string);
            await updateDoc(userDocRefFollowing, {
                Following: arrayRemove(data.id)
            });

            const userDocRefFollowers = doc(db, "users", data.id);
            await updateDoc(userDocRefFollowers, {
                Followers: arrayRemove(userid)
            });

            console.log("Unfollow successful!");
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    }

    // ! states 
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    let Followers;
    let Following;

    if (data) {
        const followersCount = data.Followers.length;


        if (followersCount > 9999) {
            Followers = (followersCount / 1000).toFixed(1) + 'k';
        } else {
            Followers = followersCount.toString();
        }

        const followingCount = data.Following.length;
        console.log(followingCount);

        if (followingCount > 9999) {
            Following = (followingCount / 1000).toFixed(1) + 'k';
        } else {
            Following = followingCount.toString();
        }
    }

    
    return (
        <main className='relative'>
            <section className={`w-full px-6 py-2 smm500:px-2 ${theme ? "text-white" : "text-black"} ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}>
                <div className='flex justify-end gap-2 select-none'>
                    <div onClick={handleBodyClick} className='text-3xl mt-1 text-[#b6a8a8ae]'>
                        <AiOutlineMail/>
                    </div>
                    {userData.Following.includes(data.id) ? (
                                <button
                                    className={`${isHovered ? 'bg-[red] px-[18.5px]' : 'bg-[#3b82f6]'} text-white font-semibold py-1 px-4 rounded-xl`}
                                    onClick={handleInputClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {isHovered ? 'Unfollow' : 'Following'}
                                </button>
                    ) : (
                            <button onClick={handleFollow} className=' bg-[#3b82f6] text-white font-semibold py-1 px-4 rounded-xl '>
                                Follow
                            </button>
                    )}
                </div>
                <section onClick={handleBodyClick} className=' mb-2 mt-2'>
                    <h2 className=' font-semibold text-xl mt-1 '>
                        {data.fullName}
                    </h2>
                    <p className={`${theme ? "text-[#ffffffbc]" : "text-[#000000a5] "}`}>
                        <span className='select-none'>@</span>
                        {data.username}</p>
                </section>
                <section onClick={handleBodyClick} className=' mb-2'>
                    <p
                        className={` font-medium ${theme ? "text-[#ffffffd2]" : "text-[#000000c1]"}`}
                        dangerouslySetInnerHTML={{ __html: formattedBio || '' }}
                    />
                </section>
                <section onClick={handleBodyClick} className={`flex flex-wrap ${data.showDOB || data.Location ? "mb-2" : "m-0"}` }>
                    <h2 className={`flex ${data.Location ? " mr-2" : "m-0"}`}>
                        <span className=' text-xl '>
                            {data.Location && <IoLocationOutline />}
                        </span>
                        {data.Location}
                    </h2>
                    {data.showDOB && (
                        <h2 className={`flex `}>
                            <span className=' text-xl'>
                                {data.dateOfBirth && < LiaBirthdayCakeSolid />}
                            </span>
                            {data.dateOfBirth && formattedDate as string}
                        </h2>
                    )}
                </section>
                <ul onClick={handleBodyClick} className={`flex gap-7 font-medium mb-2 ${theme ? "text-[#ffffffda]" : "text-[#000000a5]"}`}>
                    <li>
                        <span className={`select-none ${theme ? "text-[white]" : "text-[black] "}`}>{Followers}</span> Followers</li>
                    <li className=' list-disc'>
                        <span className={`select-none ${theme ? "text-[white]" : "text-[black] "}`}>{Following}</span> Following</li>
                </ul>
                <hr />
                <section onClick={handleBodyClick}>
                    <OtherUsersSlidesbtn />
                </section>
            </section>
            {isInputClicked && (
                <section className='absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-2xl smm500:-top-32'>
                    <main className={`py-4 px-3 w-96 smm500:w-64 ${theme ? "bg-black text-white" : "bg-white text-black"}  rounded-xl`}>
                        <h2 className='font-semibold text-lg mb-1'>Unfollow {data.username}</h2>
                        <p className={`font-medium mb-2 ${theme ? " text-[#ffffffb8]" : "text-[#00000098]"}`}>Are you sure you want to unfollow this user? <br />
                            <span className="text-red-700 font-bold">
                            Remember:
                            </span> You can always refollow this user in the future if you change your mind.</p>
                            <div className='px-2'>
                            <button onClick={() => {
                                handleBodyClick();
                                handleUnfollow();
                            }} className={`w-full text-center font-bold py-2 rounded-2xl mb-3
                        ${theme ? "bg-white text-black"
                                    : "bg-black text-white"}`}>
                                Unfollow
                            </button>
                            <button onClick={handleBodyClick} className={`w-full text-center font-bold py-2 rounded-2xl
                        ${theme ? "text-white border-2 border-white "
                                : "text-black border-2 border-black"}`}>
                                Cancel
                            </button>
                            </div>
                    </main>
                </section>
            )}
        </main>
    )
}