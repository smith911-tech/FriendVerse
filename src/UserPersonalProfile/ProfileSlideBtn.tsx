import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useThemeStore from '../Zustand';
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

    return (
        <main className='block my-0 mx-auto  font-medium '>
            <Slider {...settings}>
                <div>
                    <div className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"}`}>
                        <h2 className='text-center'>Verb</h2>
                    </div>
                </div>
                <div>
                    <div className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"}`}>
                        <h2 className='text-center'>Reverb</h2>
                    </div>
                </div>
                <div>
                    <div className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"}`}>
                        <h2 className='text-center'>Liked</h2>
                    </div>
                </div>
                <div>
                    <div className={`  w-[80%] py-2 ease-in-out transition duration-200 ${theme ? "hover:bg-[#ffffff62]" : "hover:bg-[#00000052]"}`}>
                    <h2 className=' text-center'>Impression</h2>
                    </div>
                </div>
            </Slider>
        </main>
    )
}