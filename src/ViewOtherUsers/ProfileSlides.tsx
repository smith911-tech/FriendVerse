interface Props{
    data: any
}
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Post from './OthersPosts';
import Repost from './OthersRepost';
import Liked from './Othersliked';
import Impressions from './Othersimpression';
import { useState } from 'react';
import {useThemeStore} from '../Zustand';
type ClickedState = {
    post: boolean;
    repost: boolean;
    liked: boolean;
    impression: boolean;
};
export default function OtherUsersSlidesbtn({data}: Props) {
    let settings = {
        speed: 700,
        slidesToShow: 4,
        infinite: false,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },  
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,

                },
            },
        ],
    };
    const [clicked, setClicked] = useState<ClickedState>({
        post: true,
        repost: false,
        liked: false,
        impression: false,
    });
    const theme = useThemeStore((state: any) => state.theme);
    const handleClick = (key: keyof ClickedState) => {
        const updatedClicked: ClickedState = {
            ...clicked,
            [key]: true,
            post: key === 'post',
            repost: key === 'repost',
            liked: key === 'liked',
            impression: key === 'impression',
        };

        setClicked(updatedClicked);
    };


    return (
        <section>
            <main className='block my-0 mx-auto  font-medium mb-3 px-6'>
                <Slider {...settings}>
                    <div>
                        <div onClick={(() => handleClick('post'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer 
                        ${clicked.post
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Post</h2>
                        </div>
                    </div>
                    <div>
                        <div onClick={(() => handleClick('repost'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer
                    ${clicked.repost
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Repost</h2>
                        </div>
                    </div>
                    <div>
                        <div onClick={(() => handleClick('liked'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer
                    ${clicked.liked
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Liked</h2>
                        </div>
                    </div>
                    <div>
                        <div onClick={(() => handleClick('impression'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer
                    ${clicked.impression
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className=' text-center'>Impression</h2>
                        </div>
                    </div>
                </Slider>
            </main>
            <section>
                {clicked.post && <Post data={data}/>}
                {clicked.repost && <Repost />}
                {clicked.liked && <Liked />}
                {clicked.impression && <Impressions />}
            </section>
        </section>
    )
}