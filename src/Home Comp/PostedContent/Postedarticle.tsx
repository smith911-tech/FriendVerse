import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../Zustand";
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

    const navigate = useNavigate()
    const handleViewPost = (id: string) => {
        if (window.location.pathname === '/Home') {
            navigate(`/Post/${id}`);
        } else {
            return null
        }
    }

    // this is to make follower btn and dot icon not clickable
    const handleINotNavigate = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <main>
            <article className={`pt-2  px-2 
            ${window.location.pathname === '/Home' 
                ? (theme ? "hover:bg-[#ffffff0f] cursor-pointer" : "hover:bg-[#00000017] cursor-pointer") 
            : ""}`} 
            onClick={() => handleViewPost(post.id)}>
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
                        <div onClick={handleINotNavigate}>
                            <button
                                onClick={toggleReadMore}
                                className="text-blue-500 hover:underline cursor-pointer select-none"
                            >
                                {showFullArticle ? 'Read Less' : 'Read More'}
                            </button>
                        </div>
                    )}
                </div>
            </article>
        </main>
    )
}