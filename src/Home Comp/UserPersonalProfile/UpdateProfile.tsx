interface userdatas{
    isInputClicked: boolean,
    userData : any
}
import { AiOutlineClose } from 'react-icons/ai'
import defaultcoverimg from '../../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineCloudUpload } from 'react-icons/ai'
export default function UpdateProfile({ isInputClicked, userData }: userdatas): JSX.Element{
    return(
        <>
            {isInputClicked && (
                <div className=" absolute top-0 left-0 right-0 mx-auto bg-white p-4 z-[30]  shadow md970:w-[100%] sm650:-top-9 rounded-t-2xl">
                    <section className='flex justify-between mb-4'>
                        <div className='flex gap-3'>
                            <span className=' text-2xl'><AiOutlineClose/></span>
                            <h2 className=' font-medium'>Edit Profile</h2>
                        </div>
                        <button className=' bg-[#3b82f6] text-white font-medium py-1 px-4 rounded-3xl'>Save</button>
                    </section>
                    <div className="relative select-none">
                        {userData.coverImage === "" ? (
                            <section className='relative'>
                            <img
                                src={defaultcoverimg}
                                alt="Cover"
                                className="w-full rounded-t-lg h-44 smm500:h-32 object-cover brightness-[0.5]"
                            />
                            <div className=' absolute'>
                                <label htmlFor="coverimg">
                                        <AiOutlineCloudUpload />
                                </label>
                                <input type="file" name="" id="coverimg" className='hidden'/>
                            </div>
                            </section>
                        ) : (
                            <section className='relative'>
                            <img
                                src={userData.coverImage}
                                alt="Cover"
                                    className="w-full rounded-t-lg h-44  object-cover smm500:h-32 brightness-[0.5]"
                            />
                            <label htmlFor="coverimg" className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-3xl left-1/3 bg-[#0000008b] px-2 py-2 rounded-2xl'>
                                <span >
                                        <AiOutlineCloudUpload />
                                </span>
                                <input type="file" name="" id="coverimg" className='hidden'/>
                            </label>
                            </section>
                        )}

                        {userData.profileImage === "" ? (
                            <div className=' text-8xl absolute left-4 -translate-y-1/2  border-white rounded-full bg-white text-[#000000d7] smm500:text-[80px] smm500:left-1 brightness-[0.5]'>
                                <BiSolidUserCircle />
                            </div>
                        ) : (
                            <img
                                src={userData.profileImage}
                                alt="Profile"
                                    className="w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-contain bg-white smm500:h-20 smm500:w-20 smm500:left-1 brightness-[0.5]"
                            />
                        )}

                    </div>
                </div>
            )}
        </>
    )
}