import Logo from "../assets/Logo2.png";
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useState } from "react";

export default function Privacy() {
    const [LightdarkM, setLightdarkM] = useState<boolean>(true)
    const handlemode = () => {
        setLightdarkM(!LightdarkM)
    } 
    return(
        <main className={` ${LightdarkM ? "bg-white text-black color-Toggle" : "bg-black text-white  color-Toggle"} `}>
            <nav className={` ${LightdarkM ? "bg-[white]  color-Toggle" : "bg-[black]  color-Toggle"} flex fixed w-full shadow-2xl md734:pt-6 py-4 px-3 md734:px-6 justify-between`}>
                <div className={`flex gap-1  font-serif ${LightdarkM ? "text-black color-Toggle" : "text-white color-Toggle"}`}>
                    <img src={Logo} alt="" className='w-[40px] md734:w-[50px]  select-none' />
                    <h2 className='font-semibold md734:inline-block md734:text-2xl mt-2'>
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

            <footer className='py-9 bg-[#14171a] text-[#ffffffb0] text-center font-serif font-bold'>
                Friend Verse
            </footer>
        </main>
    )
}