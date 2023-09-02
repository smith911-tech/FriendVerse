import  { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineClose } from 'react-icons/ai';
import { TbCircleArrowRightFilled, TbCircleArrowLeftFilled } from 'react-icons/tb'

interface Props {
    post: any;
}

export default function PostedImages({ post }: Props) {
    const images = post.images || [];
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
    };

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeFullInterface = () => {
        setSelectedImageIndex(null);
    };

    return (
        <main>
            {selectedImageIndex !== null && (
                <div className="relative select-none bg-[#80808034] w-full ">
                    <Slider {...settings} initialSlide={selectedImageIndex}>
                        {images.map((image: any, index: number) => (
                            <div key={index} className="w-full">
                                <img
                                    loading="lazy"
                                    src={image}
                                    alt={`Full Image ${index + 1}`}
                                    className="w-[80%] object-contain h-72 my-1 mx-auto"
                                />
                            </div>
                        ))}
                    </Slider>
                    <button className="text-2xl absolute top-2 right-2" onClick={closeFullInterface}>
                        <AiOutlineClose />
                    </button>
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
                            <div key={index} className={`
                                ${images.length === 1 ? `col-span-5` : ''}
                                ${images.length === 2 ? `col-span-2 row-start-1` : ''}
                                ${images.length === 3 ? `col-span-2 row-start-1 ${index === 2 ? "col-span-4 row-start-2" : ""}` : ''}
                                ${images.length === 4 ? `col-span-2 row-start-1 ${index === 2 ? "col-span-2 row-start-2" : ""} 
                                    ${index === 3 ? "col-span-2 row-start-2" : ""}`
                                    : ''}
                            `}>
                                <img
                                    loading="lazy"
                                    src={image}
                                    className={`
                                        object-cover h-80 cursor-pointer
                                        ${images.length === 1 ? 'w-full h-64' : ''}
                                        ${images.length === 2 ? 'w-full h-64' : ''}
                                        ${images.length === 3 ? `w-full h-[150px]` : ''}
                                        ${images.length === 4 ? `w-full h-[150px]` : ''}
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
