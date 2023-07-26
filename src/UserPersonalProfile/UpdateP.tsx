interface userdatas {
    isInputClicked: boolean,
    userData: any,
    handleBodyClick: () => void
}
import { AiOutlineClose } from 'react-icons/ai'
import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineCloudUpload } from 'react-icons/ai'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { db } from '../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner'
export default function UpdateProfile({ isInputClicked, userData, handleBodyClick }: userdatas) {

    // ! dataofbirth formatter
    const dataofbirth = userData && userData.dateOfBirth;
    const DODValue = new Date(dataofbirth.seconds * 1000);
    

    // ! update user state
    const [profileImg, setProfileImg] = useState<any>(userData.profileImage  || "")
    const [coverImg, setCoverImg] = useState<any>(userData.coverImage || "")
    const [fullName, setFullName] = useState<string>(userData.fullName || "")
    const [userName, setUserName] = useState<string>(userData.username || "")
    const [bio, setBio] = useState<string>(userData.bio || "")
    const [location, setLocation] = useState<string>(userData.Location || "")
    const [dateOfBirth, setDateOfBirth] = useState<any>(DODValue || "")

    // ! update profile image
    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImg(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // ! update cover image
    const handleImageUCload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverImg(reader.result);

        };
        reader.readAsDataURL(file);
    };

    // ! On load 
    const [Loader, setLoader] = useState<boolean>(false)
    // ! getting the userid from the local storage 
    let userid = sessionStorage.getItem('UserId')
    // Todo: handleUpdate
    const handleUpdate = async (_e: any) => {
        setLoader(true)
        const DataDocRef = doc(db, "users", userid as string)
        try {
            await updateDoc(DataDocRef, {
                fullName: fullName,
                username: userName,
                dateOfBirth: dateOfBirth,
                profileImage: profileImg,
                bio: bio,
                coverImage: coverImg,
                Location: location
            })
            handleBodyClick()
            setLoader(false)
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    return (
        <>
            {isInputClicked && (
                <div className=" absolute top-0 left-0 right-0 mx-auto bg-white px-4 pb-4 z-[30]  shadow md970:w-[100%] sm650:-top-9 rounded-t-2xl h-[35rem]  overflow-y-auto ">
                    <section className='flex justify-between sticky z-20  bg-white h-22 top-0 py-3'>
                        <div className='flex gap-3'>
                            <span className=' text-2xl cursor-pointer' onClick={handleBodyClick}><AiOutlineClose /></span>
                            <h2 className=' font-medium'>Edit Profile</h2>
                        </div>
                        <button 
                        onClick={handleUpdate} 
                            className=' bg-[#3b82f6] text-white font-medium py-1 px-4 rounded-3xl'>
                                {Loader ? (
                                <span className=''>
                                    <ThreeDots
                                        height="25"
                                        width="25"
                                        radius="9"
                                        color="#fff"
                                        ariaLabel="three-dots-loading"
                                        visible={true}

                                    />
                                </span>
                                ) : (
                                    <h2>Save</h2>
                                )}
                        </button>
                    </section>
                    <div className="relative select-none">
                        {coverImg === "" ? (
                             // ! defuly cover image image update
                            <section className='relative'>
                                <img
                                    src={defaultcoverimg}
                                    alt="Cover"
                                    className="w-full rounded-t-lg h-44 smm500:h-32 object-cover brightness-[0.5]"
                                />
                                <label htmlFor="coverimg" className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-4xl left-[45%] bg-[#0000008b] px-2 py-2 rounded-2xl'>
                                    <abbr title='Upload Image' >
                                        <AiOutlineCloudUpload />
                                    </abbr>
                                    <input type="file" name="" id="coverimg" className='hidden' onChange={handleImageUCload}/>
                                </label>
                            </section>
                        ) : (
                            // ! user cover image update
                            <section className='relative'>
                                <img
                                    src={coverImg}
                                    alt="Cover"
                                    className="w-full rounded-t-lg h-44  object-cover smm500:h-32 brightness-[0.5]"
                                />
                                <label htmlFor="coverimg" className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-3xl left-1/3 bg-[#0000008b] px-2 py-2 rounded-2xl'>
                                    <abbr title='Upload Image' >
                                        <AiOutlineCloudUpload />
                                    </abbr>
                                        <input type="file" name="" id="coverimg" className='hidden' onChange={handleImageUCload}/>
                                </label>
                                <div className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-2xl right-1/3 bg-[#0000008b] px-2 py-2 rounded-2xl'>
                                    <abbr title='Remove Cover Image' >
                                        <AiOutlineClose />
                                    </abbr>
                                </div>
                            </section>
                        )}

                        {profileImg === "" ? (
                            //! default profile image update
                            <div className=' text-8xl absolute left-4 -translate-y-1/2  border-white rounded-full bg-[#ffffffe6] text-[#000000d7] smm500:text-[80px] smm500:left-1'>
                                <span className=' brightness-[0.5]'>
                                    <BiSolidUserCircle />
                                </span>
                                <label htmlFor="ProfileImg" className=' absolute top-1/4 cursor-pointer text-[#fff] text-3xl left-1/4 bg-[#0000008b] px-2 py-2 rounded-2xl brightness-200'>
                                    <abbr title='Upload Image' >
                                        <AiOutlineCloudUpload />
                                    </abbr>
                                    <input 
                                    type="file" 
                                    name="" 
                                    id="ProfileImg" 
                                    className='hidden' 
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    />
                                </label>
                            </div>
                        ) : (
                            <div className='w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-contain bg-white smm500:h-20 smm500:w-20 smm500:left-1 '>
                            <img
                                //! user profile image update
                                src={profileImg}
                                alt="Profile"
                                className="rounded-full brightness-[0.7] w-24 h-20 object-cover"
                            />
                            <label htmlFor="ProfileImg" className=' absolute top-1/4 cursor-pointer text-[#ffffff9c] text-3xl left-1/4 bg-[#0000008b] px-2 py-2 rounded-2xl brightness-200'>
                            <abbr title='Upload Image' >
                                <AiOutlineCloudUpload />
                            </abbr>
                            <input type="file" 
                            name="" 
                            id="ProfileImg" 
                            className='hidden' 
                            onChange={handleImageUpload}
                            accept="image/*"
                            />
                            </label>
                            </div>
                        )}

                    </div>
                    {/* Name, username, location, date of birth, bio  */}
                    <div className="flex justify-center update-user-Date">
                        <section className='mt-16 w-full flex flex-col gap-4 items-center'>
                            <input
                                type="text"
                                className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                                
                                placeholder='Fullname'
                                maxLength={35}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="text"
                                className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                                placeholder='Username'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <textarea
                                className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                                placeholder='Bio'
                                name=""
                                cols={30}
                                rows={2}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={170}
                            >
                            </textarea>
                            <input
                                type="text"
                                className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                                placeholder='Location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                maxLength={50}
                            />
                            <DatePicker
                                showLeadingZeros
                                dayPlaceholder='dd'
                                monthPlaceholder='mm'
                                yearPlaceholder='yyyy'
                                minDate={new Date("01-01-1800")}
                                maxDate={new Date("01-01-2010")}
                                onChange={setDateOfBirth}
                                value={dateOfBirth}
                            />
                        </section>
                    </div>
                </div>
            )}
        </>
    )
}