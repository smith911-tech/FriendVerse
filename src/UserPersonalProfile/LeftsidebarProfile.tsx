interface Props {
    SuggestData: any
}
import { useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { LongCard } from "../GeneralComponent/LoadingCard";
import { GoTelescopeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import {useThemeStore} from '../Zustand';
import { VscVerifiedFilled } from 'react-icons/vsc'

export default function ProfileLeftbar({ SuggestData }: Props): JSX.Element {
    let userid = sessionStorage.getItem('UserId')
    const theme = useThemeStore((state: any) => state.theme);


    const [shuffledData, setShuffledData] = useState(SuggestData.slice());

    useEffect(() => {
        const shuffled = [...SuggestData].sort(() => Math.random() - 0.5);
        setShuffledData(shuffled);
    }, [SuggestData]);

    return (

        <main className="md970:block hidden font-Inter pt-2 px-2">
            <section >
                {SuggestData.length === 0 ? (
                    <LongCard />
                ) : (
                        <section className={` rounded-lg shadow py-2 ${theme ? "bg-black text-[#ffffffca]" : "bg-white text-[#000000d4]"}`}>
                        <div className="flex text-lg justify-between mx-2">
                            <h2 className="font-extrabold">Suggestions</h2>
                            <span className="text-[#117dd5]"><GoTelescopeFill /></span>
                        </div>
                        {shuffledData.filter((data: any) => data.id !== userid).slice(0, 8).map((data: any) => (
                            <Link to={`/User/${data.username}`}>
                            <div
                                className="cursor-pointer w-full select-none flex my-4 ml-1 rounded-2xl gap-2"
                                key={data.id}
                                onClick={(() => {
                                    window.scrollTo(0, 0);
                                })}
                            >
                                <div>
                                    {data.profileImage === "" ? (
                                        <div className={`text-[48px] rounded-full ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <img
                                            src={data.profileImage}
                                            alt="Profile"
                                            loading='lazy'
                                            className="w-12 h-12 rounded-full object-cover "
                                        />
                                    )}
                                </div>
                                    <div className={`w-full ${theme ? "text-[#ffffffca]" : "text-[#000000d4]"}`}>
                                        <p className="text-left font-semibold whitespace-nowrap overflow-hidden w-[70%] text-ellipsis flex">{data.fullName}
                                            {data && data.Verify && (
                                                <span className='text-[#1d9bf0] mt-1 '>
                                                    <VscVerifiedFilled />
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-sm text-left"><span className='select-none'>@</span>{data.username}</p>
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