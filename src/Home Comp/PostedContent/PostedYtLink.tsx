import { useState, useEffect } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useThemeStore } from '../../Zustand'

interface Props {
    post: {
        article: string;
    };
}

export default function PostedYtLink({ post }: Props) {
    const theme = useThemeStore((state: any) => state.theme);
    const [youtubeData, setYoutubeData] = useState<any>(null);

    useEffect(() => {
        const fetchYoutubeData = async () => {
            try {
                // Find YouTube links in the post.article
                const youtubeLinks = findYouTubeLinks(post.article);

                // If there's more than one YouTube link, don't display any YouTube data
                if (youtubeLinks.length > 1) {
                    setYoutubeData(null);
                    return;
                }

                if (youtubeLinks.length === 1) {
                    const response = await axios.get(
                        `https://noembed.com/embed?url=${youtubeLinks[0]}`
                    );
                    setYoutubeData(response.data);
                } else {
                    setYoutubeData(null); // Clear preview data for non-YouTube links
                }
            } catch (error) {
                setYoutubeData(null);
            }
        };

        fetchYoutubeData();
    }, [post.article]);

    // Regular expression to find YouTube links in a string
    const findYouTubeLinks = (text: string) => {
        const youtubePattern = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/[^\s/$.?#].[^\s]*/g;
        return text.match(youtubePattern) || [];
    };

    return (
        <main className=" mt-2">
            {youtubeData && (
                <a href={youtubeData.url} target="blank" className=" select-none w-full">
                        <LazyLoadImage
                            effect="blur"
                            src={youtubeData.thumbnail_url}
                            alt="YouTube Thumbnail"
                        className=" w-[100vw] h-[360px] object-cover smm500:h-[240px]"
                        />
                    <div className={`px-2 mx-[1px] py-1 ${theme ? "bg-[#1b1d21] " : "bg-[#f0f2f5]"}`}>
                        <p className=" text-base smm500:text-sm">{youtubeData.provider_url}</p>
                        <p className="text-lg overflow-hidden whitespace-nowrap overflow-ellipsis w-full smm500:text-base">
                            {youtubeData.title} 
                        </p>

                    </div>
                </a>
            )}
        </main>
    );
}
