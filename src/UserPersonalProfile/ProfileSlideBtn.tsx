import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useThemeStore from '../Zustand';
import { useState } from 'react';
import Verbs from './Verbs';
import Reverb from './Reverbs';
import Liked from './Liked';
import Impressions from './Impression';

type ClickedState = {
    verb: boolean;
    reverb: boolean;
    liked: boolean;
    impression: boolean;
};

export default function ProfileSides() {
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
        verb: true,
        reverb: false,
        liked: false,
        impression: false,
    });

    const handleClick = (key: keyof ClickedState) => {
        const updatedClicked: ClickedState = {
            ...clicked,
            [key]: true,
            verb: key === 'verb',
            reverb: key === 'reverb',
            liked: key === 'liked',
            impression: key === 'impression',
        };

        setClicked(updatedClicked);
    };


    return (
        <section>
            <main className='block my-0 mx-auto  font-medium mb-3'>
                <Slider {...settings}>
                    <div>
                        <div onClick={(() => handleClick('verb'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer 
                        ${clicked.verb
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Verb</h2>
                        </div>
                    </div>
                    <div>
                        <div onClick={(() => handleClick('reverb'))} className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"} cursor-pointer
                    ${clicked.reverb
                                ? " border-b-4 border-blue-600"
                                : "border-b-4 border-b-transparent"}`}>
                            <h2 className='text-center'>Reverb</h2>
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
                {clicked.verb && <Verbs />}
                {clicked.reverb && <Reverb />}
                {clicked.liked && <Liked />}
                {clicked.impression && <Impressions />}
            </section>
        </section>
    )
}