interface userdatas{
    userData : any,
    handleInputClick: () => void,
    isInputClicked : boolean,
    handleBodyClick: () => void
}
import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "../GeneralComponent/LoadingCard";
import { BsFillArrowLeftCircleFill, BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
export default function UserProfile({ 
    userData, 
    handleInputClick, 
    isInputClicked,
    handleBodyClick
}: userdatas): JSX.Element{
    return(
        <main>
        <section className='relative'>
                {userData ? (
                    <section className="w-full flex flex-col justify-center bg-white">
                        <div className="bg-white rounded-lg shadow p-1">
                            <section className='flex justify-between px-2 py-1 smm500:px-1'>
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
                                        className="w-full rounded-t-lg h-44 smm500:h-32 object-cover"
                                    />
                                ) : (
                                    <img
                                        src={userData.coverImage}
                                        alt="Cover"
                                            className="w-full rounded-t-lg h-44  object-cover smm500:h-32 "
                                    />
                                )}
                                
                                {userData.profileImage === "" ? (
                                    <div className=' text-8xl absolute left-4 -translate-y-1/2  border-white rounded-full bg-white text-[#000000d7] smm500:text-[80px] smm500:left-1'>
                                        <BiSolidUserCircle />
                                    </div>
                                ) : (
                                    <img 
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-cover bg-white smm500:h-20 smm500:w-20 smm500:left-1"
                                    />
                                )}

                            </div>
                        </div>
                        <ProfileDetails
                        userData={userData} 
                        handleInputClick={handleInputClick} 
                        isInputClicked={isInputClicked}
                        handleBodyClick={handleBodyClick}
                        />
                    </section>
                ) : (
                    <SmallCard />
                )}
        </section>
        </main>
    )
}