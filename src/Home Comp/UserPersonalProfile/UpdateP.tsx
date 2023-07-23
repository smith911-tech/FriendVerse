interface userdatas {
    isInputClicked: boolean,
    userData: any,
    handleBodyClick: () => void
}
import { AiOutlineClose } from 'react-icons/ai'
import defaultcoverimg from '../../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineCloudUpload } from 'react-icons/ai'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
export default function UpdateProfile({ isInputClicked, userData, handleBodyClick }: userdatas): JSX.Element {
    return (
        <>
            {isInputClicked && (
                <div className=" absolute top-0 left-0 right-0 mx-auto bg-white px-4 pb-4 z-[30]  shadow md970:w-[100%] sm650:-top-9 rounded-t-2xl h-[35rem]  overflow-y-auto">
                    <section className='flex justify-between sticky z-20  bg-white h-22 top-0 py-3'>
                        <div className='flex gap-3'>
                            <span className=' text-2xl cursor-pointer' onClick={handleBodyClick}><AiOutlineClose /></span>
                            <h2 className=' font-medium'>Edit Profile</h2>
                        </div>
                        <button className=' bg-[#3b82f6] text-white font-medium py-1 px-4 rounded-3xl'>Save</button>
                    </section>
                    <div className="relative select-none">
                        {userData.coverImage === "" ? (
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
                                    <input type="file" name="" id="coverimg" className='hidden' />
                                </label>
                            </section>
                        ) : (
                            // ! user cover image update
                            <section className='relative'>
                                <img
                                    src={userData.coverImage}
                                    alt="Cover"
                                    className="w-full rounded-t-lg h-44  object-cover smm500:h-32 brightness-[0.5]"
                                />
                                <label htmlFor="coverimg" className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-3xl left-1/3 bg-[#0000008b] px-2 py-2 rounded-2xl'>
                                    <abbr title='Upload Image' >
                                        <AiOutlineCloudUpload />
                                    </abbr>
                                    <input type="file" name="" id="coverimg" className='hidden' />
                                </label>
                                <div className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-2xl right-1/3 bg-[#0000008b] px-2 py-2 rounded-2xl'>
                                    <abbr title='Remove Cover Image' >
                                        <AiOutlineClose />
                                    </abbr>
                                </div>
                            </section>
                        )}

                        {userData.profileImage === "" ? (
                            //! default profile image update
                            <div className=' text-8xl absolute left-4 -translate-y-1/2  border-white rounded-full bg-[#ffffffe6] text-[#000000d7] smm500:text-[80px] smm500:left-1'>
                                <span className=' brightness-[0.5]'>
                                    <BiSolidUserCircle />
                                </span>
                                <label htmlFor="coverimg" className=' absolute top-1/4 cursor-pointer text-[#fff] text-3xl left-1/4 bg-[#0000008b] px-2 py-2 rounded-2xl brightness-200'>
                                    <abbr title='Upload Image' >
                                        <AiOutlineCloudUpload />
                                    </abbr>
                                    <input type="file" name="" id="coverimg" className='hidden' />
                                </label>
                            </div>
                        ) : (
                            <div className='w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-contain bg-white smm500:h-20 smm500:w-20 smm500:left-1 '>
                            <img
                                //! user profile image update
                                src={userData.profileImage}
                                alt="Profile"
                                className="rounded-full brightness-[0.7]"
                            />
                            <label htmlFor="coverimg" className=' absolute top-1/4 cursor-pointer text-[#ffffff9c] text-3xl left-1/4 bg-[#0000008b] px-2 py-2 rounded-2xl brightness-200'>
                            <abbr title='Upload Image' >
                                <AiOutlineCloudUpload />
                            </abbr>
                            <input type="file" name="" id="coverimg" className='hidden' />
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
                            />
                            <input
                                type="text"
                                className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                                placeholder='Username'
                            />
                            <textarea
                                className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                                placeholder='Bio'
                                name=""
                                cols={30}
                                rows={2}
                            >
                            </textarea>
                            <input
                                type="text"
                                className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                                placeholder='Location'
                            />
                            <DatePicker
                                disableCalendar
                                showLeadingZeros
                                dayPlaceholder='dd'
                                monthPlaceholder='mm'
                                yearPlaceholder='yyyy'
                                minDate={new Date("01-01-1800")}
                                maxDate={new Date("01-01-2010")}
                            />
                        </section>


                    </div>
                </div>
            )}
        </>
    )
}