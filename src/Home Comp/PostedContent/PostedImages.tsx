import  { useState, useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineClose } from 'react-icons/ai';
import { TbCircleArrowRightFilled, TbCircleArrowLeftFilled } from 'react-icons/tb'
import { MdSaveAlt } from 'react-icons/md'
import { RotatingLines } from "react-loader-spinner";
import { useThemeStore } from '../../Zustand'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useInView } from "react-intersection-observer";

interface Props {
    post: any;
}

export default function PostedImages({ post }: Props) {
    const images = post.images || [];
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [downloading, setDownloading] = useState<boolean>(false);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeFullInterface = () => {
        setSelectedImageIndex(null);
    };
    const sliderRef = useRef(null);
    const goToNextSlide = () => {
        if (sliderRef.current) {
            (sliderRef.current as Slider).slickNext();
        }
    };

    const goToPrevSlide = () => {
        if (sliderRef.current) {
            (sliderRef.current as Slider).slickPrev();
        }
    };
    
    const downloadFile = async (url: string) => {
        try {
            setDownloading(true); // Start the download, show spinner

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Fetch failed with status: ${response.status}`);
            }

            const file = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);

            // Extract the filename from the URL (similar to your original code)
            const filename = Date.now() as unknown as string;

            link.download = filename; // Use the extracted file name
            link.click();
        } catch (error: any) {
            if (error.name === "NetworkError") {
                console.error("Network error:", error.message);
            } else {
                console.error("Other error:", error.stack);
            }
        } finally {
            setDownloading(false); // Download is complete, hide spinner
        }
    };

        //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);

    const [inView, setInView] = useState(false);

    // Use the useInView hook to determine when the image is in view
    const { ref, inView: isImageInView } = useInView({
        triggerOnce: true,
    });

    if (isImageInView && !inView) {
        setInView(true);
    }

    return (
        <main>
            {selectedImageIndex !== null && (
                <div className="relative select-none bg-[#80808034] w-full">
                    <Slider {...settings} initialSlide={selectedImageIndex} ref={sliderRef}>
                        {images.map((image: any, index: number) => (
                            <div key={index} className="w-full relative">
                                <div className="flex justify-center items-center">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={image}
                                        alt={`Full Image ${index + 1}`}
                                        className="w-[80vw] object-contain h-72 my-1"
                                    />
                                </div>
                                {downloading && 
                                <div className="absolute bottom-2 right-2">
                                <RotatingLines
                                strokeColor={`${theme ? "grey" : "black"}`}
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="25"
                                visible={true}
                            />
                                </div>}
                                <button
                                    onClick={() => downloadFile(image)}
                                    title="Download"
                                    className={`text-2xl absolute bottom-2 right-2
                                    ${downloading ? "hidden" : "block"}`}
                                    disabled={downloading}
                                >
                                    <MdSaveAlt />
                                </button>
                            </div>
                        ))}
                    </Slider>
                    <button className="text-2xl absolute top-2 right-2" onClick={closeFullInterface}>
                        <AiOutlineClose />
                    </button>
                    <div className={`absolute top-1/2 transform -translate-y-1/2 left-1 
                    ${images.length === 1 ? `hidden` : ''}`}
                    onClick={goToPrevSlide}>
                        <div className="bg-gray-800 p-1 rounded-full cursor-pointer">
                            <TbCircleArrowLeftFilled className="text-white w-6 h-6 smm500:w-4 smm500:h-4" />
                        </div>
                    </div>
                    <div className={`absolute top-1/2 transform -translate-y-1/2 right-1
                    ${images.length === 1 ? `hidden` : ''}`}
                    onClick={goToNextSlide}>
                        <div className="bg-gray-800 p-1 rounded-full cursor-pointer">
                            <TbCircleArrowRightFilled className="text-white w-6 h-6 smm500:w-4 smm500:h-4" />
                        </div>
                    </div>
                </div>
            )}
            {selectedImageIndex === null && (
                <article className="py-2 px-1 select-none">
                    <div className={`
                        ${images.length === 1 ? `grid grid-cols-5 gap-2` : ''}
                        ${images.length === 2 ? `grid grid-cols-4 gap-2` : ''}
                        ${images.length === 3 ? `grid grid-cols-4 grid-rows-2 gap-2` : ''}
                        ${images.length === 4 ? `grid grid-cols-4 grid-rows-2 gap-2` : ''}
                    `}>
                        {images.map((image: any, index: number) => (
                            <div key={index} ref={ref} className={`
                                ${images.length === 1 ? `col-span-5` : ''}
                                ${images.length === 2 ? `col-span-2 row-start-1` : ''}
                                ${images.length === 3 ? `col-span-2 row-start-1 ${index === 2 ? "col-span-4 row-start-2" : ""}` : ''}
                                ${images.length === 4 ? `col-span-2 row-start-1 ${index === 2 ? "col-span-2 row-start-2" : ""} 
                                    ${index === 3 ? "col-span-2 row-start-2" : ""}`
                                    : ''}
                            `}>
                                <LazyLoadImage
                                    src={image}
                                    effect="blur"
                                    className={`
                                        ${inView ? 'w-screen' : 'w-full'}
                                        object-cover h-80 cursor-pointer w-full
                                        ${images.length === 1 ? ' h-56' : ''}
                                        ${images.length === 2 ? ' h-56' : ''}
                                        ${images.length === 3 ? ` h-[150px]` : ''}
                                        ${images.length === 4 ? ` h-[150px]` : ''}
                                    `}
                                    onClick={() => handleImageClick(index)}
                                />
                            </div>
                        ))}
                    </div>
                </article>
            )}
        </main>
    );
}
