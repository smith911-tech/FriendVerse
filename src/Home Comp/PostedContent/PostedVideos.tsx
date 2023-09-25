interface Props {
    post: any
}
import { useState } from "react"

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
    return (
        <main>
            <article className=" py-2">
                <div onClick={handleClick}>
                <video controls className="w-full h-80" id="videoPlayer" preload="none" poster="https://yt3.ggpht.com/a/AATXAJypFMgOMCnYeUOFbdJ5vS3aWAPCfOLml0j07w=s900-c-k-c0xffffffff-no-rj-mo">
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </div>
            </article>
        </main>
    )
}