interface userdatas{
    userData : any,
    SuggestData : any
}

import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "./LoadingCard";
import { GoTelescopeFill } from "react-icons/go";
import { Link } from 'react-router-dom';
import {useThemeStore} from '../Zustand';

export default function Dashboard({ userData, SuggestData }: userdatas): JSX.Element {
    let userid = sessionStorage.getItem('UserId')
    const theme = useThemeStore((state: any) => state.theme);

    return (
        <main className="md970:block hidden font-Inter pt-2 px-2">
            {userData ? (
                <section className="w-full flex flex-col justify-center">
                    <div className={` rounded-lg shadow p-1 ${theme ? "bg-[#000] text-[white]" : "bg-[#ffffffd3] text-[black]"}`}>
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
                                <Link to='/Profile' onClick={(() => {
                                    window.scrollTo(0, 0);
                                })}>
                                    <div className={`text-[48px] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4  rounded-full ${theme ? "bg-black text-[#fff] border-black" : "bg-white text-[#000000d7] border-white"}`}>
                                    <BiSolidUserCircle />
                                </div>
                                </Link>
                            ) : (
                                <Link to='/Profile' onClick={(() => {
                                    window.scrollTo(0, 0);
                                })}>
                                <img
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white object-cover bg-white"
                                />
                                    </Link>
                            )}
                        </div>
                        <div className="mt-8 text-center font-medium mb-2 w-full">
                            <h2 className="pb-1 capitalize whitespace-nowrap overflow-hidden w-[100%] text-ellipsis">{userData.fullName}</h2>

                            <h2 className={`text-xs px-2 text-center ${theme ? "text-[#ffffffd6]" : "text-[#000000a5]"}`}>{userData.bio}</h2>
                        </div>
                        <div className="mb-2 select-none">
                            <h2 className={`text-center font-medium  ${theme ? "text-[#ffffffd6]" : "text-[#000000a5]"}`}>Following</h2>
                            <p className="text-center font-medium">{userData.following}</p>
                        </div>
                        <div className="mb-2 select-none">
                            <h2 className={`text-center font-medium text-[#000000a5]  ${theme ? "text-[#ffffffd6]" : "text-[#000000a5]"}`}>Followers</h2>
                            <p className="text-center font-medium">{userData.followers}</p>
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
                        <section className={` rounded-lg shadow py-2 ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
                            <div className="flex text-lg justify-between mx-2">
                                <h2 className=" font-extrabold">Suggestions</h2>
                                <span className=" text-[#117dd5]"><GoTelescopeFill /></span>
                        </div>
                        {SuggestData.filter((data: any) => data.id !== userid).slice(0, 3).map((data: any) =>(
                            <Link to={`/${data.username}`}>
                            <div
                                className="cursor-pointer w-full select-none flex  my-4 ml-1 rounded-2xl gap-2"
                                onClick={(() => {
                                    window.scrollTo(0, 0);
                                })}
                                key={data.id}>
                                <div>
                                    {data.profileImage === "" ? (
                                            <div className={`text-[48px]   rounded-full ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <img
                                            src={data.profileImage}
                                            alt="Profile"
                                                className="w-12 h-12 rounded-full   object-cover "
                                        />
                                    )}
                                </div>
                                <div className='w-full'>
                                    <p
                                        className="text-left font-semibold whitespace-nowrap overflow-hidden w-[70%] text-ellipsis">{data.fullName}</p>
                                        <p className={` wor text-sm text-left ${theme ? "text-white" : "text-[#000000a9]"}`}><span className='select-none'>@</span>
                                        {data.username}</p>
                                </div>
                            </div>
                            </Link>

                        ))}
                    </section>
                )}

            </section>
        </main>
    )
}