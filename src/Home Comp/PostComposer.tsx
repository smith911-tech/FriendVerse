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
export default function PostSection({
    handleBodyClick,
    userData,
    isInputClicked,
    handleInputClick,
}: userdatas): JSX.Element {
    const firstName = userData?.fullName?.split(' ')[0] ?? 'Loading....';

    return (
        
        <>
            <header className="bg-white mb-2 py-2 px-5 rounded-2xl shadow md970:w-[90%] block mt-0 mx-auto select-none ">
                <nav className="flex justify-between gap-2">
                    <div>
                        {userData ? (
                            <section>
                                {userData.profileImage === "" ? (
                                    <div className='text-[48px] rounded-full text-[#000000d7]'>
                                        <BiSolidUserCircle />
                                    </div>
                                ) : (
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-contain"
                                    />
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
                <div className="absolute top-0 left-0 right-0 mx-auto bg-white p-4 z-[30] rounded-2xl shadow md970:w-[90%] ">
                    <section className="flex justify-between mb-1">
                        <h2 className='text-xl font-bold'>Create Post</h2>
                        <span className="text-xl bg-[#f0f2f5] mb-2 rounded-full text-[#0000009b] px-1 py-1 cursor-pointer" onClick={handleBodyClick}>
                            <FaXmark />
                        </span>
                    </section>
                    <hr />
                    <section className="flex gap-2 mt-2 select-none">
                        <div>
                            {userData ? (
                                <section>
                                    {userData.profileImage === "" ? (
                                        <div className='text-[48px] rounded-full text-[#000000d7]'>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <img
                                            src={userData.profileImage}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full object-contain"
                                        />
                                    )}
                                </section>
                            ) : (
                                <div className='text-[48px] rounded-full text-[#000000d7]'>
                                    <BiSolidUserCircle />
                                </div>
                            )}
                        </div>
                        <h2 className=" text-lg mt-3 font-semibold">
                            {userData && userData.fullName}
                        </h2>
                    </section>
                    <section>
                        <textarea className="w-full  text-xl pt-2 mt-2 outline-none" name="" id="" rows={5}  placeholder={`What's on your mind, ${firstName}?`} ></textarea>
                    </section>
                    <section className=" text-2xl flex justify-between border border-[#000000b6] border-solid gap-2 py-2 px-3 mb-3">
                        <h2 className=" font-medium text-[#000000b8] text-xl">Add to your post</h2>
                        <div className="flex gap-3">
                            <span className=" cursor-pointer text-[#45bd62] mt-1">
                                <abbr title="Photo">
                                    <TfiGallery />
                                </abbr>
                            </span>
                            <span className=" cursor-pointer text-[#f5533d] mt-1">
                                <abbr title="Video">
                                    <ImFileVideo />
                                </abbr>
                            </span>
                        </div>
                    </section>
                    <button className=" my-3 text-center w-full py-3 bg-[#3b82f6] text-white text-xl font-medium rounded-xl">Post</button>
                </div>
            )}
        </>
    )
} 