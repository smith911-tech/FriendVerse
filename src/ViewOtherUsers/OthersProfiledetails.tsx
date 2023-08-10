interface userdatas {
    data: any | null
    theme : any
}
import { IoLocationOutline } from 'react-icons/io5'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import OtherUsersSlidesbtn from './ProfileSlides';
import { AiOutlineMail } from 'react-icons/ai'
import { db } from '../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
export default function OthersProfileDetails({
    data,
    theme
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
            const DataDocRef = doc(db, "users", userid as string)
                
            await updateDoc(DataDocRef, {

            })
        }
        catch{
        }
    }
    handleFollow()
    // const handleUnfollow = () => {

    // }
    return (
        <>
            <section className={`w-full px-6 py-2 smm500:px-2 ${theme ? "text-white" : "text-black"}`}>
                <div className='flex justify-end gap-2'>
                    <div className='text-3xl mt-1 text-[#b6a8a8ae]'>
                        <AiOutlineMail/>
                    </div>
                <button className=' bg-[#3b82f6] text-white font-semibold py-1 px-4 rounded-xl '>
                Follow
                </button>
                </div>
                <section className=' mb-2 mt-2'>
                    <h2 className=' font-semibold text-xl mt-1 '>
                        {data.fullName}
                    </h2>
                    <p className={`${theme ? "text-[#ffffffbc]" : "text-[#000000a5] "}`}>
                        <span className='select-none'>@</span>
                        {data.username}</p>
                </section>
                <section className=' mb-2'>
                    <p
                        className={` font-medium ${theme ? "text-[#ffffffd2]" : "text-[#000000c1]"}`}
                        dangerouslySetInnerHTML={{ __html: formattedBio || '' }}
                    />
                </section>
                <section className={`flex flex-wrap ${data.showDOB || data.Location ? "mb-2" : "m-0"}` }>
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
                <ul className={`flex gap-7 font-medium mb-2 ${theme ? "text-[#ffffffda]" : "text-[#000000a5]"}`}>
                    <li>
                        <span className={`select-none ${theme ? "text-[white]" : "text-[black] "}`}>0</span> Followers</li>
                    <li className=' list-disc'>
                        <span className={`select-none ${theme ? "text-[white]" : "text-[black] "}`}>0</span> Following</li>
                </ul>
                <hr />
                <OtherUsersSlidesbtn />
            </section>
        </>
    )
}