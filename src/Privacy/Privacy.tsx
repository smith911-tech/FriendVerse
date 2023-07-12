import Logo from "../assets/Logo2.png";
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useState } from "react";
import BackGroundImg from '../assets/privacy policy/privacypolicyBGimg.jpg'

export default function Privacy() {
    const [LightdarkM, setLightdarkM] = useState<boolean>(true)
    const handlemode = () => {
        setLightdarkM(!LightdarkM)
    }
    return (
        <main className={` ${LightdarkM ? "bg-white text-black color-Toggle" : "bg-black text-white  color-Toggle"} font-Inter`}>
            <nav className={` ${LightdarkM ? "bg-[white]  color-Toggle" : "bg-[black]  color-Toggle"} flex fixed w-full shadow-2xl md734:pt-6 py-4 px-3 md734:px-6 justify-between`}>
                <div className={`flex gap-1  font-serif ${LightdarkM ? "text-black color-Toggle" : "text-white color-Toggle"}`}>
                    <img src={Logo} alt="" className='w-[40px] md734:w-[50px]  select-none' />
                    <h2 className='font-semibold  md734:inline-block md734:text-2xl mt-2'>
                        Privacy Policy
                    </h2>
                </div>
                <div>
                    {LightdarkM ? (
                        <span className='text-3xl cursor-pointer color-Toggle' onClick={handlemode}>
                            <BsMoonStarsFill />
                        </span>
                    ) : (
                        <span className='text-3xl cursor-pointer color-Toggle' onClick={handlemode}>
                            <BsFillSunFill />
                        </span>
                    )}
                </div>
            </nav>
            <section className='pb-7'>
                <img src={BackGroundImg} alt="" className='pt-[70px] w-full select-none' />
            </section>
            <section className="px-2 md734:px-[10%]">
                <h2 className="font-bold text-xl md734:text-2xl text-[#067ad1] ">Before you scroll, read this</h2>
                <br />
                <p className="text-[#00000099]">
                    It’s really hard to make everyone happy with a Privacy Policy. Most people who use Friend Verse want something short and easy to understand. While we wish we could fit everything you need to know into a Tweet, our regulators ask us to meet our legal obligations by describing them all in a lot of detail.
<br /><br />
                    With that in mind, we’ve written our Privacy Policy as simply as possible to empower you to make informed decisions when you use Twitter by making sure you understand and have control over the information we collect, how it’s used, and when it’s shared.
<br /><br />
                    So if you skip reading every word of the Privacy Policy, at least know this:
                </p>
            </section>
            <footer className='py-9 bg-[#14171a] text-[#ffffffb0] text-center font-serif font-bold'>
                Friend Verse
            </footer>
        </main>
    )
}