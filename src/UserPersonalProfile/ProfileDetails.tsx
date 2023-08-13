interface userdatas {
    userData: any | null,
    handleInputClick : () => void,
    isInputClicked : boolean,
    handleBodyClick: () => void
}
import { BsFillPencilFill } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import ProfileSLideBtn from './ProfileSlideBtn';
import UpdateP from './UpdateP';
import {useState} from 'react'
import {useThemeStore} from '../Zustand';
import { Link } from 'react-router-dom';
export default function UserProfileDetails({ 
    userData, 
    handleInputClick, 
    isInputClicked,
    handleBodyClick
}: userdatas): JSX.Element{


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

    const formattedBio = userData && userData.bio ? replaceUrlsWithLinks(userData.bio) : null;


    // ! Data of birth convertion from timestamp
    const dataofbirth = userData && userData.dateOfBirth;
    const DODValue = new Date(dataofbirth.seconds * 1000);
    
    //! Define an array to get the month name
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    //! Formatting the date to show as "15 January 2004"
    const formattedDate = `${DODValue.getDate()} ${monthNames[DODValue.getMonth()]} ${DODValue.getFullYear()}`;

    // ! date of birth hidden or not state
    const [showDOB, setShowDOB] = useState<boolean>(true)

    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);

    let Followers;
    let Following;

    if (userData) {
        const followersCount = userData.Followers.length;


        if (followersCount > 9999) {
            Followers = (followersCount / 1000).toFixed(1) + 'k';
        } else {
            Followers = followersCount.toString();
        }

        const followingCount = userData.Following.length;
        console.log(followingCount);

        if (followingCount > 9999) {
            Following = (followingCount / 1000).toFixed(1) + 'k';
        } else {
            Following = followingCount.toString();
        }
    }

    return(
        <>
            <section className={`w-full px-6 py-2 smm500:px-2  
            ${theme
                ? isInputClicked ? " bg-[#000000] opacity-30 cursor-default" : "bg-[#000] cursor-auto"
                : isInputClicked ? "bg-[#000000ca] cursor-default" : "bg-[#fff] cursor-auto"
                }`}>
            <button onClick={handleInputClick} className='block my-0 ml-auto bg-[#3b82f6] text-white font-semibold py-1 px-2 rounded-lg'>
                <div className='flex gap-[2px] select-none'>
                    <p className='mt-1'><BsFillPencilFill /></p>
                    <h2>Edit Profile</h2>
                </div>
            </button>
            <section className=' mb-2'>
            <h2 className=' font-semibold text-xl mt-1 '>
                {userData && userData.fullName}
            </h2>
            <p className={`${theme ? "text-[#ffffffbc]" : "text-[#000000a5] "}`}>
            <span className='select-none'>@</span>
            {userData && userData.username}</p>
            </section>
            <section className=' mb-2'>
            <p
                className={` font-medium ${theme ? "text-[#ffffffd2]" : "text-[#000000c1]"}`}
                dangerouslySetInnerHTML={{ __html: formattedBio || '' }}
            />
            </section>
                <section className={`flex flex-wrap ${userData && userData.showDOB || userData.Location ? "mb-2" : "m-0"}`}>
                    <h2 className={`flex  ${userData.Location ? " mr-2" : "m-0"}`}>
                    <span className=' text-xl '>
                        {userData && userData.Location && <IoLocationOutline />} 
                    </span>
                    {userData && userData.Location}
                </h2>
                {userData.showDOB && (
                        <h2 className='flex '>
                                <span className=' text-xl'>
                                {userData && userData.dateOfBirth && < LiaBirthdayCakeSolid />}
                                </span>
                                {userData && userData.dateOfBirth && formattedDate as string}
                            </h2>
                )}
            </section>
                <ul className={`flex  font-medium mb-2 ${theme ? "text-[#ffffffda]" : "text-[#000000a5]"}`}>
                    <li className='flex gap-1'>
                        <span 
                        className={`select-none ${theme ? "text-[white]" : "text-[black] "}`}>{Followers}</span>    
                        <Link to='/FollowersCount' className=' hover:underline'
                        >Followers</Link>
                    </li>
                    <li className='list-disc ml-7'></li>
                    <li className=' gap-1 flex'>
                        <span className={`select-none ${theme ? "text-[white]" : "text-[black] "}`}>{Following}</span> 
                        <Link to='/FollowersCount' className=' cursor-pointer hover:underline'
                        >Following</Link>
                    </li>
                </ul>
            <hr />
                <ProfileSLideBtn 
                handleBodyClick={handleBodyClick} />
        </section>
            <UpdateP
            isInputClicked={isInputClicked} 
            userData={userData}
            handleBodyClick={handleBodyClick}
            showDOB={showDOB}
            setShowDOB={setShowDOB}
            />
        </>
    )
}