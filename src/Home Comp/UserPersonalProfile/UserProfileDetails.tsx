interface userdatas {
    userData: any | null,
    handleInputClick : () => void,
    isInputClicked : boolean
}
import { BsFillPencilFill } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import ProfileSides from './ProfileSlider';
import UpdateProfile from './UpdateProfile';
export default function UserProfileDetails({ userData, handleInputClick, isInputClicked }: userdatas): JSX.Element{


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

    return(
        <>
            <section className='w-full px-6 py-2 smm500:px-2 '>
            <button onClick={handleInputClick} className='block my-0 ml-auto bg-[#3b82f6] text-white font-semibold py-1 px-2 rounded-lg'>
                <div className='flex gap-[2px]'>
                    <p className='mt-1'><BsFillPencilFill /></p>
                    <h2>Edit Profile</h2>
                </div>
            </button>
            <section className=' mb-2'>
            <h2 className=' font-semibold text-xl mt-1 '>
                {userData && userData.fullName}
            </h2>
            <p className='text-[#000000a5] '>{userData && userData.username}</p>
            </section>
            <section className=' mb-2'>
            <p
                className=" font-medium text-[#000000c1]"
                dangerouslySetInnerHTML={{ __html: formattedBio || '' }}
            />
            </section>
            <section className=' mb-2 flex gap-2'>
                <h2 className='flex text-[#000000b9]'>
                    <span className=' text-xl'>
                        {userData && userData.Location && <IoLocationOutline />} 
                    </span>
                    {userData && userData.Location}
                </h2>
                <h2 className='flex text-[#000000b9]'>
                    <span className=' text-xl'>
                        {userData && userData.Location && < LiaBirthdayCakeSolid />}
                    </span>
                    {userData && userData.dateOfBirth && formattedDate}
                </h2>
            </section>
            <ul className='flex gap-7 font-medium text-[#000000a5] mb-2'>
                <li>
                <span className=' text-[black] select-none'>33</span> Followers</li>
                <li className=' list-disc'>
                    <span className=' text-[black] select-none'>10</span> Following</li>
            </ul>
            <hr />
            <ProfileSides />
        </section>
            <UpdateProfile isInputClicked={isInputClicked} userData={userData}/>
        </>
    )
}