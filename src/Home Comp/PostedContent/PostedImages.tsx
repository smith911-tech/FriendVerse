interface Props {
    post: any
}
export default function PostedImages({ post }: Props) {
    const images = post.images || [];

    return (
        <main>
            <article className="py-2 px-1">
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
                            />
                        </div>
                    ))}
                </div>
            </article>
        </main>
    ) 
}