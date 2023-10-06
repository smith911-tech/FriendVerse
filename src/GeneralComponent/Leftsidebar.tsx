interface Props{
    userData : any,
    SuggestData : any
}

import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "./LoadingCard";
import { GoTelescopeFill } from "react-icons/go";
import { Link } from 'react-router-dom';
import {useThemeStore} from '../Zustand';
import {useState, useEffect} from 'react'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Dashboard({ userData, SuggestData }: Props): JSX.Element {
    let userid = sessionStorage.getItem('UserId')
    const theme = useThemeStore((state: any) => state.theme);


    let Followers = '0';
    let Following = '0';

    if (userData) {
        const followersCount = userData.Followers?.length || 0;

        if (followersCount >= 1000000) {
            Followers = (followersCount / 1000000).toFixed(1) + 'm';
        } else if (followersCount >= 1000) {
            Followers = (followersCount / 1000).toFixed(1) + 'k';
        } else {
            Followers = followersCount.toString();
        }

        const followingCount = userData.Following?.length || 0;

        if (followingCount >= 1000000) {
            Following = (followingCount / 1000000).toFixed(1) + 'm';
        } else if (followingCount >= 1000) {
            Following = (followingCount / 1000).toFixed(1) + 'k';
        } else {
            Following = followingCount.toString();
        }
    }



    const [shuffledData, setShuffledData] = useState(SuggestData.slice());

    useEffect(() => {
        const shuffled = [...SuggestData].sort(() => Math.random() - 0.5);
        setShuffledData(shuffled);
    }, [SuggestData]);

    // ! this will convert any link in my bio and make it clickable when its updated
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|(?!www\.)[^\s]+\.[^\s]+)/g;

    const replaceUrlsWithLinks = (text: string) => {
        return text.replace(urlRegex, (url) => {
            if (url.startsWith('http') || url.startsWith('www.')) {
                const actualUrl = url.startsWith('www.') ? 'http://' + url : url;
                return `<a href="${actualUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${removeHttpFromUrl(
                    url
                )}</a>`;
            } else {
                return `<a href="http://${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500">${url}</a>`;
            }
        });
    };

    const removeHttpFromUrl = (url: string) => {
        return url.replace(/^(https?:\/\/|www\.)/, '');
    };

    const formattedBio = userData && userData.bio ? replaceUrlsWithLinks(userData.bio) : null;

    const [sliceStart, setSliceStart] = useState(0);
    const [sliceEnd, setSliceEnd] = useState(2); 
    useEffect(() => {
        const updateSliceRange = () => {
            const windowHeight = window.innerHeight;

            if (windowHeight <= 700) {
                setSliceStart(0);
                setSliceEnd(2);
            } else if (windowHeight <= 800) {
                setSliceStart(0);
                setSliceEnd(3);
            } else if (windowHeight <= 850) {
                setSliceStart(0);
                setSliceEnd(4);
            } else if (windowHeight <= 900) {
                setSliceStart(0);
                setSliceEnd(5);
            } else if (windowHeight <= 1100) {
                setSliceStart(0);
                setSliceEnd(7);
            } else {
                // Handle the case when windowHeight is greater than 1100
                setSliceStart(0);
                setSliceEnd(9); 
            }
        };

        // Initial update
        updateSliceRange();

        // Listen for window resize events and update the slice range
        window.addEventListener('resize', updateSliceRange);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateSliceRange);
        };
        }, []);

    return (
        <main className="md970:block hidden font-Inter pt-2 px-2">
            {userData ? (
                <section className="w-full flex flex-col justify-center">
                    <div className={` rounded-lg shadow p-1 ${theme ? "bg-[#000] text-[white]" : "bg-[#ffffffd3] text-[black]"}`}>
                        <div className="relative select-none">
                            {userData.coverImage === "" ? (
                                <LazyLoadImage
                                    effect="blur"
                                    src={defaultcoverimg}
                                    alt="Cover"
                                    className="w-screen rounded-t-lg h-32 object-cover"
                                />
                            ) : (
                                <LazyLoadImage
                                    effect="blur"
                                    src={userData.coverImage}
                                    alt="Cover"
                                    className="w-screen rounded-t-lg h-32 object-cover"
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
                                    loading='lazy'
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white object-cover bg-white"
                                />
                                    </Link>
                            )}
                        </div>
                        <div className="mt-8 text-center font-medium mb-2 w-full">
                            <h2 className="pb-1 capitalize whitespace-nowrap overflow-hidden w-[100%] text-ellipsis flex justify-center">{userData.fullName}
                                {userData && userData.Verify && (
                                    <span className='text-[#1d9bf0] mt-1'>
                                        <VscVerifiedFilled />
                                    </span>
                                )}
                            </h2>

                            <p
                                className={`text-xs px-2 text-center ${theme ? "text-[#ffffffd6]" : "text-[#000000a5]"}`}
                                dangerouslySetInnerHTML={{ __html: formattedBio || '' }}
                            />
                        </div>
                        <div className="mb-2 select-none">
                            <h2 className={`text-center font-medium  ${theme ? "text-[#ffffffd6]" : "text-[#000000a5]"}`}>Following</h2>
                            <p className="text-center font-medium">{Following}</p>
                        </div>
                        <div className="mb-2 select-none">
                            <h2 className={`text-center font-medium text-[#000000a5]  ${theme ? "text-[#ffffffd6]" : "text-[#000000a5]"}`}>Followers</h2>
                            <p className="text-center font-medium">{Followers}</p>
                        </div>
                        <Link to='/Profile'>
                        <h2 className="text-[#117DD5] text-center font-bold mb-2 select-none">View profile</h2>
                        </Link>
                    </div>
                </section>
            ) : (
                <SmallCard />
            )}
            <section className="mt-2">
                {SuggestData.length === 0 ? (
                    <SmallCard />
                ) : (
                        <section className={` rounded-lg shadow py-2 ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
                            <div className="flex text-lg justify-between mx-2">
                                <h2 className=" font-extrabold">Suggestions</h2>
                                <span className=" text-[#117dd5]"><GoTelescopeFill /></span>
                        </div>
                        {shuffledData.filter((data: any) => data.id !== userid).slice(sliceStart, sliceEnd).map((data: any) =>(
                            <Link to={`/User/${data.username}`}>
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
                                        <LazyLoadImage
                                    effect="blur"
                                            src={data.profileImage}
                                            alt="Profile"
    
                                            className="w-12 h-12 rounded-full   object-cover "
                                        />
                                    )}
                                </div>
                                <div className='w-full'>
                                    <p
                                        className="text-left font-semibold whitespace-nowrap overflow-hidden w-[75%] text-ellipsis flex">{data.fullName}
                                        {data && data.Verify && (
                                    <span className='text-[#1d9bf0] mt-1 '>
                                        <VscVerifiedFilled />
                                    </span>
                                )}
                                    </p>
                                        <p className={` text-sm text-left ${theme ? "text-white" : "text-[#000000a9]"}`}><span className='select-none'>@</span>
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