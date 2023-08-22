interface userdatas {
    handleBodyClick: () => void,
    isInputClicked: boolean,
    userData: any,
}
import { FaXmark } from "react-icons/fa6";
import { TfiGallery } from 'react-icons/tfi'
import { ImFileVideo } from 'react-icons/im'
import { BiSolidUserCircle } from 'react-icons/bi';
import { useEffect, useRef, useState } from "react";
import { useThemeStore } from '../Zustand'
import axios from 'axios';

export default function PostController({
    handleBodyClick, 
    isInputClicked, userData}: userdatas){
    const firstName = userData?.fullName?.split(' ')[0] ?? 'Loading....';
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState<string>('');


    useEffect(() => {
        if (isInputClicked && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputClicked]);

    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (newValue.length <= 328) {
            setInputValue(newValue);
        }
    };

    const characterCount = 328 - inputValue.length;


    // ! for when you post a youtube url
    const [previewData, setPreviewData] = useState<any>(null);
    // Helper function to check if a string is a link
    useEffect(() => {
        if (inputValue) {
            if (isYouTubeLink(inputValue)) {
                fetchPreviewData();
            } else {
                setPreviewData(null); // Clear preview data when the input is not a link
            }
        } else {
            setPreviewData(null); // Clear preview data when input is empty
        }
    }, [inputValue]);

        const fetchPreviewData = async () => {
            try {
                if (isYouTubeLink(inputValue)) {
                    const response = await axios.get(
                        `https://noembed.com/embed?url=${inputValue}`
                    );
                    setPreviewData(response.data);
                    console.log(response.data);
                } else {
                    setPreviewData(null); // Clear preview data for non-YouTube links
                }
            } catch (error) {
                console.error(error);
                setPreviewData(null);
            }
        };

        const isYouTubeLink = (url: string) => {
            // Regular expression to match YouTube URLs
            const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
            return youtubePattern.test(url);
        };

    return(
        <>
            {isInputClicked && (
                <div className={`absolute top-0 left-0 right-0 mx-auto p-4 z-[30] rounded-2xl shadow md970:w-[90%] sm650:-top-9 ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
                    <section className="flex justify-between mb-1">
                        <h2 className='text-xl font-bold smm500:text-lg'>Create Post</h2>
                        <span className="text-xl bg-[#f0f2f5] mb-2 rounded-full text-[#0000009b] px-1 py-1 cursor-pointer smm500:text-lg" onClick={handleBodyClick}>
                            <FaXmark />
                        </span>
                    </section>
                    <hr />
                    <section className="flex gap-2 mt-2 select-none pb-1">
                        <div>
                            {userData ? (
                                <section>
                                    {userData.profileImage === "" ? (
                                        <div className={`text-[48px] rounded-full  smm500:text-[40px] 
                                        ${theme ? "text-white" : "text-[#000000d7]"}`}>
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
                                <div className={`text-[48px] rounded-full  smm500:text-[40px] 
                                        ${theme ? "text-white" : "text-[#000000d7]"}`}>
                                    <BiSolidUserCircle />
                                </div>
                            )}
                        </div>
                        <h2 className=" text-lg mt-3 font-semibold smm500:text-base">
                            {userData && userData.fullName}
                        </h2>
                    </section>
                    <section className=" overflow-y-auto h-52 pr-2">
                        <textarea
                            ref={inputRef}
                            className={`w-full text-xl pt-2 mt-2 outline-none smm500:text-lg ${theme ? "bg-black text-white" : "bg-white text-black"}`}
                            name=""
                            id=""
                            rows={3}
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder={`What's on your mind, ${firstName}?`}
                        />
                        <div className="text-right text-[#7e7e7e] smm500:text-sm mt-1">
                            {characterCount}/{328}
                        </div>
                        {previewData && (
                            <div className="mt-8 border-t border-gray-200 pt-4">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={previewData.thumbnail_url}
                                        alt="YouTube Thumbnail"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">{previewData.title}</h2>
                                        <p className="text-gray-600">{previewData.author_name}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-700">{previewData.description}</p>
                            </div>
                        )}
                    </section>
                    <section className=" text-2xl flex justify-between border border-[#000000b6] border-solid gap-2 py-2 px-3 mb-3 smm500:border-[0.1px] smm500:py-1 smm500:px-2">
                        <h2 className={`font-medium text-xl smm500:text-base 
                        ${theme ? "text-white" : " text-[#000000b8] "}`}>Add to your post</h2>
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