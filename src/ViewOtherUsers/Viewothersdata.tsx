interface Props {
    data: any;
    userData: any
    isInputClicked : boolean
    handleInputClick:  () => void
    handleBodyClick: () => void
}
import { useState} from 'react'
import { LongCard } from '../GeneralComponent/LoadingCard'
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { OtherUserCover, OtherUsersProfile } from './OtheProfileModal';
import OthersProfileDetails from './OthersProfiledetails';
import { BsThreeDots } from 'react-icons/bs'
import {useThemeStore} from '../Zustand';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function ViewUsersData({ 
    data, 
    userData, 
    isInputClicked,
    handleInputClick,
    handleBodyClick
}: Props) {
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

    return (
        <main className='relative'>
            {data ? (
                <section className={`w-full flex flex-col justify-center p-1
                ${theme ? isInputClicked ? " bg-black text-white" : " bg-black text-white"
                    : isInputClicked ? " text-black" : "bg-white text-black"}
                `}>
                    <section onClick={handleBodyClick} className={`flex justify-between px-2 py-2 smm500:px-1 sticky top-14 z-[50] 
                    ${theme ? "bg-black" : "bg-white"}
                    ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}>
                        <Link to='/Home'>
                            <div className={`  text-3xl top-1 left-1 cursor-pointer
                            ${theme ? "text-white" : "text-[#0000008e]"}
                            `}>
                                <BsFillArrowLeftCircleFill />
                            </div>
                        </Link>
                        <div className='text-3xl '>
                    <BsThreeDots />
                        </div>
                    </section>
                    <div className="relative select-none" onClick={handleBodyClick}>
                        {data.coverImage === "" ? (
                            <LazyLoadImage
                                    effect="blur"
                                src={defaultcoverimg}
                                alt="Cover"
                                className={`w-screen rounded-t-lg h-44 smm500:h-32 object-cover ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}` }
                            />
                        ) : (
                            <LazyLoadImage
                                    effect="blur"
                            onClick={handleShowCoverImg}
                            src={data.coverImage}
                            alt="CoverImg"
                            className="w-screen rounded-t-lg h-44  object-cover smm500:h-32 cursor-pointer"
                            />
                        )}
                        {data.profileImage === "" ? (
                            <div className={` ${isInputClicked ? " brightness-[0.2]" : " brightness-100"} text-8xl absolute left-4 -translate-y-1/2 rounded-full  smm500:text-[80px] smm500:left-1 first-letter:
                            ${theme ? "bg-[black] text-[white] border-black" : "bg-white text-[#000000d7] border-white "}
                            `}>
                                <BiSolidUserCircle />
                            </div>
                        ) : (

                            <img
                            onClick={handleShowProfileImg}
                                src={data.profileImage}
                                loading='lazy'
                                alt="Profile"
                                    className={`w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-cover bg-white smm500:h-23 smm500:w-23 smm500:left-1 cursor-pointer ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}
                            />
                        )}
                        {/* cover image modal */}
                        <OtherUserCover
                            data={data}
                            handleCloseModal={handleCloseModal}
                            showCmodal={showCmodal}
                        />
                        {/* end of image modal */}

                        {/* Profile Imge Modal */}
                        <OtherUsersProfile
                            data={data}
                            showPmodal={showPmodal}
                            handleCloseModal={handleCloseModal}
                        />
                        {/* End Of prodile image modal  */}
                    </div>
                    <OthersProfileDetails 
                    data={data} 
                    theme={theme} 
                    userData={userData} 
                    isInputClicked={isInputClicked}
                    handleInputClick={handleInputClick}
                    handleBodyClick={handleBodyClick}
                    />
                </section>
            ) : (
                <LongCard />
            )}
        </main>
    )
}