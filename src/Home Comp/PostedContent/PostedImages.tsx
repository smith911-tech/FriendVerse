interface Props {
    post: any
}
export default function PostedImages({ post }: Props) {
    const images = post.images || [];

    return (
        <main>
            <article className="py-2 px-1">
                <div className={`flex w-full gap-2 
                ${images.length === 3 ? ` flex-wrap` : ''}
                `}>
                    {images.map((image: any, index: number) => (
                        <div key={index}>
                            <img
                                src={image} // Access the URL property of the image
                                className={`
                                object-cover h-80
                                ${images.length === 1 ? 'w-[100vw] h-80' : ''}
                                ${images.length === 2 ? 'w-[50vw] h-80' : ''}
                                ${images.length === 3 
                                ? `w-[100%] h-40 ` : ''}
                                `}
                            />
                        </div>
                    ))}
                </div>
            </article>
        </main>
    ) 
}