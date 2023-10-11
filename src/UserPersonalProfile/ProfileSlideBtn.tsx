import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useThemeStore} from '../Zustand';
import { useState } from 'react';
import Posts from './Post';
import RePost from './Repost';
import Liked from './Liked';
import Impressions from './Impression';
interface Props{
    handleBodyClick : () => void
    SuggestData: any
}
type ClickedState = {
    Post: boolean;
    rePost: boolean;
    liked: boolean;
    impression: boolean;
};

export default function ProfileSides({ handleBodyClick, SuggestData }: Props) {
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
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    const [clicked, setClicked] = useState<ClickedState>({
        Post: true,
        rePost: false,
        liked: false,
        impression: false,
    });

    const handleClick = (key: keyof ClickedState) => {
        const updatedClicked: ClickedState = {
            ...clicked,
            [key]: true,
            Post: key === 'Post',
            rePost: key === 'rePost',
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
                        <div onClick={(() => handleClick('Post'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 outline-none ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer 
                        ${clicked.Post
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Post</h2>
                        </div>
                    </div>
                    <div>
                        <div onClick={(() => handleClick('rePost'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 outline-none ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer
                    ${clicked.rePost
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Repost</h2>
                        </div>
                    </div>
                    <div>
                        <div onClick={(() => handleClick('liked'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 outline-none ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer
                    ${clicked.liked
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Liked</h2>
                        </div>
                    </div>
                    <div>
                        <div onClick={(() => handleClick('impression'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 outline-none ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer
                    ${clicked.impression
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className=' text-center'>Impression</h2>
                        </div>
                    </div>
                </Slider>
            </main>
            <section onClick={handleBodyClick}>
                {clicked.Post && <Posts SuggestData={SuggestData}/>}
                {clicked.rePost && <RePost SuggestData={SuggestData} />}
                {clicked.liked && <Liked />}
                {clicked.impression && <Impressions />}
            </section>
        </section>
    )
}