import { useState } from "react";
interface Props {
    post: any
}

export default function Postedarticle({post}:Props) {
    const [showFullArticle, setShowFullArticle] = useState<boolean>(false);
    const paragraphs = post.article.split('\n');
    const fullArticle = paragraphs.join(' ');

    const toggleReadMore = () => {
        setShowFullArticle(!showFullArticle);
    };
    return(
        <main>
            <article className=" pt-2  px-2">
                <div>
                    {showFullArticle ? (
                        <div >
                            {paragraphs.map((paragraph: string, index: number) => (
                                <p
                                    key={index}
                                    className={`text-[15px] font-normal font-sans ${index < paragraphs.length - 1 ? 'mb-2' : ''
                                        }`}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ) : (
                        paragraphs.slice(0, 2).map((paragraph: string, index: number) => (
                            <p
                                key={index}
                                className={`text-[15px] font-normal font-sans ${index < paragraphs.length - 1 ? 'mb-2' : ''
                                    }`}
                            >
                                {paragraph}
                            </p>
                        ))
                    )}
                    {fullArticle.length > 320 && (
                        <button
                            onClick={toggleReadMore}
                            className="text-blue-500 hover:underline cursor-pointer select-none"
                        >
                            {showFullArticle ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>
            </article>
        </main>
    )
}