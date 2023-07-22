interface userdatas{
    userData : any,
    handleInputClick: () => void
}
import defaultcoverimg from '../../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "../../Home Comp/LoadingCard";
import { BsFillArrowLeftCircleFill, BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import UserProfileDetails from './UserProfileDetails';
export default function UserProfile({ userData, handleInputClick }: userdatas): JSX.Element{
    return(
        <main>
        <section>
                {userData ? (
                    <section className="w-full flex flex-col justify-center bg-white">
                        <div className="bg-white rounded-lg shadow p-1">
                            <section className='flex justify-between px-2 py-1'>
                            <Link to='/Home'>
                                <div className=' text-[#0000008e] text-3xl top-1 left-1 cursor-pointer'>
                                    <BsFillArrowLeftCircleFill />
                                </div>
                            </Link>
                            <div className=' text-[#0000008e] text-3xl top-1 right-1 cursor-pointer bg-white'>
                                <BsFillGearFill />
                            </div>
                            </section> 
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
                                    <img onClick={handleInputClick}
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border-4 border-white object-contain bg-white"
                                    />
                                )}

                            </div>
                        </div>
                        <UserProfileDetails userData={userData}/>
                    </section>
                ) : (
                    <SmallCard />
                )}
        </section>
        </main>
    )
}