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
import { useState } from 'react';
import { UserCoverImg, UserProfileImg } from './UserModai/UserProfileModal';

export default function UserProfile({ 
    userData, 
    handleInputClick, 
    isInputClicked,
    handleBodyClick
}: userdatas): JSX.Element{
    const [showPmodal, setShowPmodal] = useState<boolean>(false)
    const [showCmodal, setShowCmodal] = useState<boolean>(false)

// ! user Profile image handle click
    const handleShowProfileImg = () => {
        setShowPmodal(!showPmodal)
        
    }
// ? end of user Profile image handle click

// ! user cover image handle click
    const handleShowCoverImg = () => {
        setShowCmodal(!showCmodal);
    };
// ? end of user cover image handle click

    const handleCloseModal = () => {
        setShowCmodal(false);
        setShowPmodal(false);
    };
    return(
        <main>
        <section className='relative'>
                {userData ? (
                    <section className="w-full flex flex-col justify-center bg-white">
                        <div className="bg-white rounded-lg shadow p-1">
                            <section className='flex justify-between px-2 py-1 smm500:px-1 sticky top-16 z-[50] bg-white'>
                            <Link to='/Home'>
                                <div className=' text-[#0000008e] text-3xl top-1 left-1 cursor-pointer'>
                                    <BsFillArrowLeftCircleFill />
                                </div>
                            </Link>
                            <Link to='/Profile/Settings'>
                            <div className=' text-[#0000008e] text-3xl top-1 right-1 cursor-pointer bg-white'>
                                <BsFillGearFill />
                            </div>
                            </Link>
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
                                            className="w-full rounded-t-lg h-44  object-cover smm500:h-32 cursor-pointer"
                                            onClick={handleShowCoverImg}
                                    />
                                )}
                                {userData.profileImage === "" ? (
                                    <div className=' text-8xl absolute left-4 -translate-y-1/2  border-white rounded-full bg-white text-[#000000d7] smm500:text-[80px] smm500:left-1'>
                                        <BiSolidUserCircle />
                                    </div>
                                ) : (
                                    
                                    <img 
                                        onClick={handleShowProfileImg}
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-cover bg-white smm500:h-23 smm500:w-23 smm500:left-1 cursor-pointer"
                                    />
                                )}

                            </div>
                            {/* cover image modal */}
                            <UserCoverImg 
                            userData={userData} 
                            handleCloseModal={handleCloseModal}
                            showCmodal={showCmodal}
                            />
                            {/* end of image modal */}

                            {/* Profile Imge Modal */}
                            <UserProfileImg 
                            userData={userData} 
                            showPmodal={showPmodal}
                            handleCloseModal={handleCloseModal}
                            />
                            {/* End Of prodile image modal  */}
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