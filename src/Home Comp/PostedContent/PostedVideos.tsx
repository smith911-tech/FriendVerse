interface Props {
    post: any
}
import { useState } from "react"
import { useThemeStore } from '../..//Zustand'

export default function PostedVideo({ post }: Props) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleClick = () => {
        const video = document.getElementById('videoPlayer') as HTMLMediaElement;
        if (video) {
            if (isPlaying) {
                if (video) {
                    video.pause();
                }
            } else {
                if (video) {
                    video.play();
                }
            }
            setIsPlaying(!isPlaying);
        }
    };
    const theme = useThemeStore((state: any) => state.theme);
    return (
        <main>
            <article className=" py-2">
                <div onClick={handleClick}>
                <video controls className="w-full h-80 cursor-pointer" id="videoPlayer" preload="none" 
                        poster={theme 
                        ? "https://yt3.ggpht.com/a/AATXAJypFMgOMCnYeUOFbdJ5vS3aWAPCfOLml0j07w=s900-c-k-c0xffffffff-no-rj-mo" 
                        : "https://cdn.pixabay.com/photo/2016/11/18/11/17/youtube-1834016_1280.png"}>
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </div>
            </article>
        </main>
    )
}