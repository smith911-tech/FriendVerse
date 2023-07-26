interface userdatas {
    handleBodyClick: () => void,
    handleInputClick: () => void,
    isInputClicked: boolean,
    userData: any,
}
import { FaXmark } from "react-icons/fa6";
import { BiSolidUserCircle } from 'react-icons/bi';
import { TfiGallery } from 'react-icons/tfi'
import { ImFileVideo } from 'react-icons/im'
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
export default function PostSection({
    handleBodyClick,
    userData,
    isInputClicked,
    handleInputClick,
}: userdatas): JSX.Element {
    const firstName = userData?.fullName?.split(' ')[0] ?? 'Loading....';
    const inputRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        if (isInputClicked && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputClicked]);


    return (
    
        <>
            <header className="bg-white mb-2 py-2 px-5 rounded-2xl shadow md970:w-[90%] block mt-0 mx-auto select-none  smm500:py-[1px] smm500:px-2">
                <nav className="flex justify-between gap-2">
                    <div>
                        {userData ? (
                            <section>
                                {userData.profileImage === "" ? (
                                    <Link to='/Profile'>
                                    <div className='text-[48px] rounded-full text-[#000000d7]'>
                                        <BiSolidUserCircle />
                                    </div>
                                    </Link>
                                ) : (
                                    <Link to='/Profile'>
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                        </Link>
                                )}
                            </section>
                        ) : (
                            <div className='text-[48px] rounded-full text-[#000000d7]'>
                                <BiSolidUserCircle />
                            </div>
                        )}

                    </div>
                    <input

                        type="text"
                        onClick={handleInputClick}
                        className="w-[90%] cursor-pointer h-10 bg-[#f0f2f5] rounded-2xl mt-1 px-4 outline-none"
                        placeholder={`What's on your mind, ${firstName}?`}
                    />
                </nav>
            </header>

            {isInputClicked && (
                <div className="absolute top-0 left-0 right-0 mx-auto bg-white p-4 z-[30] rounded-2xl shadow md970:w-[90%] sm650:-top-9 ">
                    <section className="flex justify-between mb-1">
                        <h2 className='text-xl font-bold smm500:text-lg'>Create Post</h2>
                        <span className="text-xl bg-[#f0f2f5] mb-2 rounded-full text-[#0000009b] px-1 py-1 cursor-pointer smm500:text-lg" onClick={handleBodyClick}>
                            <FaXmark />
                        </span>
                    </section>
                    <hr />
                    <section className="flex gap-2 mt-2 select-none">
                        <div>
                            {userData ? (
                                <section>
                                    {userData.profileImage === "" ? (
                                        <div className='text-[48px] rounded-full text-[#000000d7] smm500:text-[40px]'>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <img
                                            src={userData.profileImage}
                                            alt="Profile"
                                                className="w-12 h-12 rounded-full object-cover smm500:h-10 smm500:w-10"
                                        />
                                    )}
                                </section>
                            ) : (
                                    <div className='text-[48px] rounded-full text-[#000000d7] smm500:text-[40px]'>
                                    <BiSolidUserCircle />
                                </div>
                            )}
                        </div>
                        <h2 className=" text-lg mt-3 font-semibold smm500:text-base">
                            {userData && userData.fullName}
                        </h2>
                    </section>
                    <section>
                        <textarea ref={inputRef} className="w-full  text-xl pt-2 mt-2 outline-none smm500:text-lg" name="" id="" rows={5} placeholder={`What's on your mind, ${firstName}?`} ></textarea>
                    </section>
                    <section className=" text-2xl flex justify-between border border-[#000000b6] border-solid gap-2 py-2 px-3 mb-3 smm500:border-[0.1px] smm500:py-1 smm500:px-2">
                        <h2 className=" font-medium text-[#000000b8] text-xl smm500:text-base">Add to your post</h2>
                        <div className="flex gap-3 ">
                            <span className=" cursor-pointer text-[#45bd62] mt-1 smm500:text-lg">
                                <abbr title="Photo">
                                    <TfiGallery />
                                </abbr>
                            </span>
                            <span className=" cursor-pointer text-[#f5533d] mt-1 smm500:text-lg">
                                <abbr title="Video">
                                    <ImFileVideo />
                                </abbr>
                            </span>
                        </div>
                    </section>
                    <button className=" my-3 text-center w-full py-3 bg-[#3b82f6] text-white text-xl font-medium rounded-xl sm650:py-2 smm500:py-1 smm500:text-lg">Verb</button>
                </div>
            )}
        </>
    )
} 