interface userdatas{
    userData : any,
    SuggestData : any
}

import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "./LoadingCard";
import { GoTelescopeFill } from "react-icons/go";
import { Link } from 'react-router-dom';

export default function Dashboard({ userData, SuggestData }: userdatas): JSX.Element {
    let userid = sessionStorage.getItem('UserId')

    return (
        <main className="md970:block hidden font-Inter pt-2 px-2">
            {userData ? (
                <section className="w-full flex flex-col justify-center">
                    <div className="bg-white rounded-lg shadow p-1">
                        <div className="relative select-none">
                            {userData.coverImage === "" ? (
                                <img
                                    src={defaultcoverimg}
                                    alt="Cover"
                                    className="w-full rounded-t-lg h-32 object-cover"
                                />
                            ) : (
                                <img
                                    src={userData.coverImage}
                                    alt="Cover"
                                    className="w-full rounded-t-lg h-32 object-cover"
                                />
                            )}
                            {userData.profileImage === "" ? (
                                <Link to='/Profile'>
                                <div className='text-[48px] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-full bg-white text-[#000000d7]'>
                                    <BiSolidUserCircle />
                                </div>
                                </Link>
                            ) : (
                                <Link to='/Profile'>
                                <img
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white object-fill bg-white"
                                />
                                    </Link>
                            )}
                        </div>
                        <div className="mt-8 text-center font-medium mb-2">
                            <h2 className="pb-1 capitalize">{userData.fullName}</h2>

                                <h2 className="text-xs text-[#000000a5] px-2 text-center">{userData.bio}</h2>
                        </div>
                        <div className="mb-2 select-none">
                            <h2 className="text-center font-medium text-[#000000a5]">Following</h2>
                            <p className="text-center font-medium">10</p>
                        </div>
                        <div className="mb-2 select-none">
                            <h2 className="text-center font-medium text-[#000000a5]">Followers</h2>
                            <p className="text-center font-medium">33</p>
                        </div>
                        <Link to='/Profile'>
                        <h2 className="text-[#117DD5] text-center font-bold mb-2 select-none">View profile</h2>
                        </Link>
                    </div>
                </section>
            ) : (
                <SmallCard />
            )}
            <section className="mt-6">
                {SuggestData.length === 0 ? (
                    <SmallCard />
                ) : (
                        <section className="bg-white rounded-lg shadow py-2">
                            <div className="flex text-lg justify-between mx-2">
                                <h2 className=" font-extrabold">Suggestions</h2>
                                <span className=" text-[#117dd5]"><GoTelescopeFill /></span>
                        </div>
                        {SuggestData.filter((data: any) => data.id !== userid).slice(0, 3).map((data: any) =>(
                            <div
                                className="cursor-pointer w-full select-none flex  my-4 ml-1 rounded-2xl gap-2"
                                key={data.id}>
                                <div>
                                    {data.profileImage === "" ? (
                                        <div className='text-[48px]   rounded-full text-[#000000d7]'>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <img
                                            src={data.profileImage}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full   object-contain "
                                        />
                                    )}
                                </div>
                                <div>
                                    <p
                                        className="text-left font-semibold">{data.fullName}</p>
                                    <p
                                        className="text-sm text-left text-[#000000a9]">{data.username}</p>
                                </div>
                            </div>

                        ))}
                    </section>
                )}

            </section>
        </main>
    )
}