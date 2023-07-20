interface userdatas{
    userData : any
}
import defaultcoverimg from '../../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "../../Home Comp/LoadingCard";
import { BsFillArrowLeftCircleFill, BsFillPencilFill, BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
export default function UserProfile({userData}: userdatas): JSX.Element{
    return(
        <main>
        <section>
                {userData ? (
                    <section className="w-full flex flex-col justify-center bg-white">
                        <div className="bg-white rounded-lg shadow p-1">
                            <div className="relative select-none">
                                {userData.coverImage === "" ? (
                                    <img
                                        src={defaultcoverimg}
                                        alt="Cover"
                                        className="w-full rounded-t-lg h-44 object-cover"
                                    />
                                ) : (
                                    <img
                                        src={userData.coverImage}
                                        alt="Cover"
                                                className="w-full rounded-t-lg h-44  object-cover"
                                    />
                                )}
                                
                                {userData.profileImage === "" ? (
                                    <div className=' text-8xl absolute left-4 -translate-y-1/2 border-2 border-white rounded-full bg-white text-[#000000d7]'>
                                        <BiSolidUserCircle />
                                    </div>
                                ) : (
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border-4 border-white object-contain bg-white"
                                    />
                                )}
                                <Link to='/Home'>
                                    <div className=' absolute text-[#0000008e] text-3xl top-1 left-1 cursor-pointer'>
                                        <BsFillArrowLeftCircleFill />
                                    </div>
                                </Link>
                                <div className=' absolute text-[#0000008e] text-3xl top-1 right-1 cursor-pointer'>
                                    <BsFillGearFill />
                                </div>
                            </div>
                        </div>
                        <section className='w-full px-6 py-2'>
                            <button className='block my-0 ml-auto bg-[#3b82f6] text-white font-semibold py-1 px-2 rounded-lg'>
                            <div className='flex gap-[2px]'>
                                <p className='mt-1'><BsFillPencilFill /></p>
                                <h2>Edit Profile</h2>
                            </div>
                            </button>
                            <h2 className=' font-semibold text-xl mt-1'>
                                {userData && userData.fullName}
                            </h2>
                            <ul className='flex gap-7 font-medium text-[#000000a5]'>
                                <li>33 Followers</li>
                                <li className=' list-disc'>10 Following</li>
                            </ul>
                        </section>
                    </section>
                ) : (
                    <SmallCard />
                )}
        </section>
        </main>
    )
}