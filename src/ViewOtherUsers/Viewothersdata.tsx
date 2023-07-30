interface userDatas {
    data: any;
}
import { useState } from 'react'
import { LongCard } from '../GeneralComponent/LoadingCard'
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { OtherUserCover, OtherUsersProfile } from './OtheProfileModal';
export default function ViewUsersData({ data }: userDatas) {
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
    return (
        <main className="">
            {data ? (
                <section className='w-full flex flex-col justify-center bg-white p-1'>
                    <section className='flex justify-between px-2 py-1 smm500:px-1'>
                        <Link to='/Home'>
                            <div className=' text-[#0000008e] text-3xl top-1 left-1 cursor-pointer'>
                                <BsFillArrowLeftCircleFill />
                            </div>
                        </Link>
                    </section>
                    <div className="relative select-none">
                        {data.coverImage === "" ? (
                            <img
                                src={defaultcoverimg}
                                alt="Cover"
                                className="w-full rounded-t-lg h-44 smm500:h-32 object-cover"
                            />
                        ) : (
                            <img
                            onClick={handleShowCoverImg}
                                src={data.coverImage}
                                alt="Cover"
                                className="w-full rounded-t-lg h-44  object-cover smm500:h-32 cursor-pointer"
                            />
                        )}
                        {data.profileImage === "" ? (
                            <div className=' text-8xl absolute left-4 -translate-y-1/2  border-white rounded-full bg-white text-[#000000d7] smm500:text-[80px] smm500:left-1'>
                                <BiSolidUserCircle />
                            </div>
                        ) : (

                            <img
                            onClick={handleShowProfileImg}
                                src={data.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-cover bg-white smm500:h-23 smm500:w-23 smm500:left-1 cursor-pointer"
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
                </section>
            ) : (
                <LongCard />
            )}
        </main>
    )
}