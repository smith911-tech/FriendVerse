interface Props{
    userData : any,
    handleInputClick: () => void,
    isInputClicked : boolean,
    handleBodyClick: () => void
}
import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { LongCard } from "../GeneralComponent/LoadingCard";
import { BsFillArrowLeftCircleFill, BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import { useState } from 'react';
import { UserCoverImg, UserProfileImg } from './UserModai/UserProfileModal';
import { useThemeStore} from '../Zustand';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function UserProfile({ 
    userData, 
    handleInputClick, 
    isInputClicked,
    handleBodyClick
}: Props): JSX.Element{
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
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);

    return(
        <main>
        <section className='relative'>
                {userData ? (
                    <section className={`w-full flex flex-col justify-center 
                    ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
                        <section className={`flex justify-between px-2 py-2 smm500:px-1 sticky top-14 z-[50] ${theme ? "bg-black" : "bg-white "}`}>
                            <Link to='/Home'>
                                <div className={`text-3xl top-1 left-1 cursor-pointer 
                                ${theme ? "text-[#ffffffe2]" : "text-[#0000008e]"}`}>
                                    <BsFillArrowLeftCircleFill />
                                </div>
                            </Link>
                            <Link to='/Profile/Settings'>
                                <div className={`text-3xl top-1 right-1 cursor-pointer 
                                    ${theme ? "text-[#ffffffe2]" : "text-[#0000008e]"}`}>
                                    <BsFillGearFill />
                                </div>
                            </Link>
                        </section> 
                        <div className={`rounded-lg shadow p-1 
                        ${theme ? "bg-black" : "bg-white "}`}>
                            <div className="relative select-none">
                                {userData.coverImage === "" ? (
                                    <LazyLoadImage
                                        effect="blur"
                                        src={defaultcoverimg}
                                        alt="Cover"
                                        className="w-screen rounded-t-lg h-44 smm500:h-32 object-cover"
                                    />
                                ) : (
                                    <LazyLoadImage
                                        effect='blur'
                                        src={userData.coverImage}
                                        alt="Cover"
                                            className="w-screen rounded-t-lg h-44  object-cover smm500:h-32 cursor-pointer"
                                            onClick={handleShowCoverImg}
                                    />
                                )}
                                {userData.profileImage === "" ? (
                                    <div className={`text-8xl absolute left-4 -translate-y-1/2   rounded-full  smm500:text-[80px] smm500:left-1 
                                    ${theme 
                                    ? "text-[#fff] bg-black border-black " 
                                    : "bg-white text-[#000000d7] border-white"}`}>
                                        <BiSolidUserCircle />
                                    </div>
                                ) : (
                                    
                                    <img 
                                        onClick={handleShowProfileImg}
                                        src={userData.profileImage}
                                        loading='lazy'
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
                        <div className='h-screen'><LongCard />
                    </div>
                )}
        </section>
        </main>
    )
}