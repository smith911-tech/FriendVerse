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
import { BsCodeSquare } from 'react-icons/bs'
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function PostController({
    handleBodyClick, 
    isInputClicked, userData}: userdatas){
    const firstName = userData?.fullName?.split(' ')[0] ?? 'Loading....';
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState<string>('')
    const [UploadedVideo, setUploadedVideo] = useState<string>('')
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [selectedImgFiles, setSelectedImgFiles] = useState<File[]>([]);
    const [selectedVidFile, setSelectedVidFile] = useState<File | null>(null);
    const [showCodeBlock, setShowCodeBlock] = useState<boolean>(false);
    const [codeInput, setCodeInput] = useState<string>('')



    useEffect(() => {
        if (isInputClicked && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputClicked]);

    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (newValue.length <= 520) {
            setInputValue(newValue);
        }
    };

    const characterCount = 520 - inputValue.length;


    // ! for when you post a youtube url
    const [YoutubeData, setYoutubeData] = useState<any>(null);
    // Helper function to check if a string is a link
    useEffect(() => {
        if (inputValue) {
            if (isYouTubeLink(inputValue)) {
                fetchYoutubeData();
            }
            else {
                setYoutubeData(null); // Clear preview data when the input is not a link
            }
        } else {
            setYoutubeData(null); // Clear preview data when input is empty
        }
    }, [inputValue]);

        const fetchYoutubeData = async () => {
            try {
                if (isYouTubeLink(inputValue)) {
                    const response = await axios.get(
                        `https://noembed.com/embed?url=${inputValue}`
                    );
                    setYoutubeData(response.data);
                } else {
                    setYoutubeData(null); // Clear preview data for non-YouTube links
                }
            } catch (error) {
                setYoutubeData(null);
            }
        };

        const isYouTubeLink = (url: string) => {
            // Regular expression to match YouTube URLs
            const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
            return youtubePattern.test(url);
        };

    //! Function to handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newImages: string[] = [];
        const newFiles: File[] = [];

        for (let i = 0; i < files.length && uploadedImages.length + newImages.length < 4; i++) {
            const imageUrl = URL.createObjectURL(files[i]);
            newImages.push(imageUrl);
            newFiles.push(files[i]);
        }

        setUploadedImages([...uploadedImages, ...newImages]);
        setSelectedImgFiles([...selectedImgFiles, ...newFiles]);

        // Clear any selected video
        setUploadedVideo('');
        setSelectedVidFile(null);

        //  clear any code 
        setShowCodeBlock(false);
        setCodeInput('');
    };

    //! Function to handle image removal
    const handleImageRemove = (index: number) => {
        const updatedImages = [...uploadedImages];
        updatedImages.splice(index, 1);

        const updatedFiles = [...selectedImgFiles];
        updatedFiles.splice(index, 1);

        setUploadedImages(updatedImages);
        setSelectedImgFiles(updatedFiles);
    };

    // ! Video upload 
    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setUploadedVideo(videoUrl);
            setSelectedVidFile(file)
        }
        // Clear any selected images
        setUploadedImages([]);
        setSelectedImgFiles([]);

        //  clear any code 
        setShowCodeBlock(false);
        setCodeInput('');
    };

    // ! handle remove video
    const handleVideoRemoval = () => {
        // Clear the UploadedVideo state
        setUploadedVideo('');
        setSelectedVidFile(null);
    };

    console.log(selectedVidFile)
    console.log(selectedImgFiles)

    return(
        <>
            {isInputClicked && (
                <div className={`absolute top-0 left-0 right-0 mx-auto p-4 z-[30] rounded-2xl shadow md970:w-[90%] sm650:-top-9 ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
                    <section className="flex justify-between mb-1 select-none">
                        <h2 className='text-xl font-bold smm500:text-lg'>Create Post</h2>
                        <span className="text-xl bg-[#f0f2f5] mb-2 rounded-full text-[#0000009b] px-1 py-1 cursor-pointer smm500:text-lg" onClick={handleBodyClick}>
                            <FaXmark />
                        </span>
                    </section>
                    <hr />
                    <main className="overflow-y-auto h-[270px] ">
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
                    <section className=" pr-2">
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
                        <div className={`text-right select-none text-[#7e7e7e] smm500:text-sm mt-1 ${characterCount === 0  ? "text-[#ff0000a8]" : "text-[#7e7e7e]"}`}>
                            {characterCount}/{520}
                        </div>
                        {/* embed youtube details  */}
                        {!UploadedVideo && !showCodeBlock && !uploadedImages.length && YoutubeData && (
                            <div className="mt-8 border-t border-gray-200 pt-4 select-none">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={YoutubeData.thumbnail_url}
                                        alt="YouTube Thumbnail"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">{YoutubeData.title}</h2>
                                        <p className="text-gray-600">{YoutubeData.author_name}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-700">{YoutubeData.description}</p>
                            </div>
                        )}
                        {/* uploaded image */}
                        <section className="flex flex-col-reverse">
                            {uploadedImages.map((imageUrl, index) => (
                                <div key={index} className="relative">
                                <img className="w-full mb-2 object-cover h-full" key={index} src={imageUrl} alt={`Uploaded ${index}`} />
                                    <span className=" absolute text-xl p-1 rounded-full top-2 right-3 text-[#fff] bg-[#000000c1] cursor-pointer" onClick={() => handleImageRemove(index)}>
                                    <FaXmark />
                                </span>
                                </div>
                            ))}
                        </section>
                        {/* uploaded video*/}
                        {UploadedVideo && (
                            <div className="relative">
                                <video controls className="w-full h-96">
                                    <source src={UploadedVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                    <span className=" absolute text-xl p-1 rounded-full top-2 right-3 text-[#fff] bg-[#000000c1] cursor-pointer" onClick={handleVideoRemoval}>
                                        <FaXmark />
                                    </span>
                            </div>
                        )}
                            {showCodeBlock && (
                                <div className="mt-4">
                                    <textarea placeholder="Enter your code here..." 
                                    className={`w-full p-2 border-2 border-solid ${theme ? "border-[#ffffffa7] bg-black" : "border-black bg-white"}`} name="" id=""  rows={5} value={codeInput}
                                        onChange={(e) => setCodeInput(e.target.value)}></textarea>
                                </div>
                            )}
                            {showCodeBlock && (
                                <div className="mt-4">
                                    <SyntaxHighlighter showLineNumbers={true} language="javascript" style={vscDarkPlus}>
                                        {codeInput}
                                    </SyntaxHighlighter>
                                </div>
                            )}
                    </section>
                    </main>
                    <section className=" text-2xl flex justify-between border border-[#000000b6] border-solid gap-2 py-2 px-3 mb-3 smm500:border-[0.1px] smm500:py-1 smm500:px-2">
                        <h2 className={`font-medium text-xl smm500:text-base select-none 
                        ${theme ? "text-white" : " text-[#000000b8] "}`}>Add to your post</h2>
                        <div className="flex gap-3 ">
                            <label htmlFor="UploadImg" className=" cursor-pointer text-[#45bd62] mt-1 smm500:text-lg">
                                <abbr title="Photo">
                                    <TfiGallery />
                                </abbr>
                                <input type="file" name="" id="UploadImg" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
                            </label>
                            <label htmlFor="UploadVideo" className=" cursor-pointer text-[#f5533d] mt-1 smm500:text-lg">
                                <abbr title="Video">
                                    <ImFileVideo />
                                </abbr>
                                <input type="file" name="" id="UploadVideo" className="hidden" accept="video/*"
                                    onChange={handleVideoUpload} />
                            </label>
                            <label onClick={() => {
                                setShowCodeBlock(!showCodeBlock);
                                setCodeInput('');
                                // Clear any selected images
                                setUploadedImages([]);
                                setSelectedImgFiles([]);
                                // Clear any selected video
                                setUploadedVideo('');
                                setSelectedVidFile(null);
                            }}  className=" cursor-pointer text-[#653df5] mt-1 smm500:text-lg">
                                <abbr title="Code">
                                    <BsCodeSquare />
                                </abbr>
                            </label>
                        </div>
                    </section>
                    <button className=" my-3 text-center w-full py-3 bg-[#3b82f6] text-white text-xl font-medium rounded-xl sm650:py-2 smm500:py-1 smm500:text-lg select-none">Verb</button>
                </div>
            )}
        </>
    )
}