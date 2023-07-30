interface userDatas{
    data: any; 
}
import { LongCard } from '../GeneralComponent/LoadingCard'
import { Link } from 'react-router-dom';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
export default function ViewUsersData({data}: userDatas){
    return(
        <main className="">
            {data ? (
                <section className='w-full flex flex-col justify-center bg-white p-1 '>
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
                                src={data.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-cover bg-white smm500:h-23 smm500:w-23 smm500:left-1 cursor-pointer"
                            />
                        )}

                    </div>
                </section>
            ): (
                <LongCard />
            )}
        </main>
    )
}