import { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai'
interface Props {
    post: any
}
export default function PostedImages({ post }: Props) {
    const images = post.images || [];
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const handleImageClick = (index: number) => {
        setSelectedImage(index);
    };

    const closeFullInterface = () => {
        setSelectedImage(null);
    };

    return (
        <main>
            {selectedImage !== null && (
                <div className=" relative select-none">
                    <img 
                    src={images[selectedImage]} 
                    alt="Full Image" 
                    className="w-full object-contain h-72 bg-[#80808034] my-1"/>
                    <button className=" text-2xl absolute top-2 right-2" onClick={closeFullInterface}>
                        <AiOutlineClose />
                    </button>
                </div>
            )}
            {selectedImage === null &&(
                <article className="py-2 px-1 select-none">
                    <div className={`
                ${images.length === 1 ? `grid grid-cols-5  gap-2` : ''}
                ${images.length === 2 ? `grid grid-cols-4  gap-2` : ''}
                ${images.length === 3 ? `grid grid-cols-4 grid-rows-2  gap-2` : ''}
                ${images.length === 4 ? `grid grid-cols-4 grid-rows-2  gap-2` : ''}
                `}>
                        {images.map((image: any, index: number) => (
                            <div key={index} className={`
                        ${images.length === 1 ? `col-span-5` : ''}
                        ${images.length === 2 ? `col-span-2 row-start-1` : ''}
                        ${images.length === 3 ? `col-span-2 row-start-1 ${index === 2 ? "col-span-4 row-start-2" : ""} 
                        ` : ''}
                        ${images.length === 4 ? `col-span-2 row-start-1 
                        ${index === 2 ? "col-span-2 row-start-2 " : ""} 
                        ${index === 3 ? "col-span-2 row-start-2 " : ""} 
                        ` : ''}
                        `}>
                                <img
                                    src={image} // Access the URL property of the image
                                    className={`
                                object-cover h-80
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
    ) 
}