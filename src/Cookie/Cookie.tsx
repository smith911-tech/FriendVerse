import Logo from "../assets/Logo2.png";
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { useState } from "react";
import BackGroundImg from '../assets/Cookies/backgroungImg.jpg'

export default function Cookie(){
    const [LightdarkM, setLightdarkM] = useState<boolean>(true)
    const handlemode = () => {
        setLightdarkM(!LightdarkM)
    }
    return (
        <main className={` ${LightdarkM ? "bg-white text-black color-Toggle" : "bg-black text-[#ffffffc4]  color-Toggle"} font-Inter `}>
            <nav className={` ${LightdarkM ? "bg-[white]  color-Toggle" : "bg-[black]  color-Toggle"} flex fixed w-full shadow-2xl md734:pt-6 py-4 px-3 md734:px-6 justify-between`}>
                <div className={`flex gap-1   ${LightdarkM ? "text-black color-Toggle" : "text-white color-Toggle"}`}>
                    <img src={Logo} alt="" className='w-[40px] md734:w-[50px]  select-none' />
                    <h2 className='font-bold  mt-2 md734:hidden'>T&C</h2>
                    <h2 className='font-bold mt-2 hidden md734:inline-block md734:text-2xl'>
                        Cookie
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
            <section className='px-2 md734:px-[10%]'>
                <h2 className="text-center font-bold text-3xl  border-b-2 pb-4">How cookies are used on Friend Verse
                </h2>
                <br />
                <p className="font-Inter font-medium">
                    At FriendVerse, we understand the importance of providing a seamless and personalized experience for our users. We prioritize your convenience and strive to create a safe and enjoyable environment for social networking. To achieve this, we utilize local storage to ensure that you stay logged in, save and honor your preferences, and personalize the content you see. Our commitment to privacy and data security remains paramount, and we adhere to strict guidelines to protect your information.
                </p>
                <br />
                <section className="mb-8">
                    <div className="flex bg-[#f3f7fa] w-full gap-3 mb-6">
                        <div className="bg-[#067acc] w-8"></div>
                        <div className="w-full p-3 select-none">
                            <h2 className="font-Inter font-bold text-2xl  text-black">
                                Stay Logged In:
                            </h2>
                        </div>
                    </div>
                    <p className="font-Belanosima">With the help of local storage, you can enjoy uninterrupted access to your FriendVerse account. Once you log in, your session information is securely stored in your browser's local storage, allowing you to stay logged in even if you close the tab or refresh the page. This way, you can easily pick up where you left off and engage with your friends and communities without any hassle.</p>
                </section>
                <section  className="mb-8">
                    <div className="flex bg-[#f3f7fa] w-full gap-3 mb-6">
                        <div className="bg-[#067acc] w-8"></div>
                        <div className="w-full p-3 select-none">
                            <h2 className="font-Inter font-bold text-2xl  text-black">
                                Save and Honor Your Preferences: 
                            </h2>
                        </div>
                    </div>
                    <p className="font-Belanosima">At FriendVerse, we value your preferences and want to make your experience as personalized as possible. By utilizing local storage, we can store your preferences locally on your device. Whether it's your notification settings, display preferences, or privacy settings, we make sure to save and honor your choices, providing you with a consistent and tailored experience every time you visit our platform.</p>
                </section>
                <section className="mb-8">
                    <div className="flex bg-[#f3f7fa] w-full gap-3 mb-6">
                        <div className="bg-[#067acc] w-8"></div>
                        <div className="w-full p-3 select-none">
                            <h2 className="font-Inter font-bold text-2xl  text-black">
                                Personalize the Content You See:
                            </h2>
                        </div>
                    </div>
                    <p className="font-Belanosima">We understand that each user has unique interests and preferences. By leveraging the capabilities of local storage, FriendVerse can personalize the content you see based on your interactions, friend connections, and activity history. This allows us to recommend relevant posts, events, groups, and suggestions tailored specifically to your interests, making your social media experience more engaging and enjoyable.</p>
                </section>
            </section>

            <footer className='py-9 bg-[#14171a] text-[#ffffffb0] text-center  font-bold'>
                Friend Verse
            </footer>
        </main>
    )
}