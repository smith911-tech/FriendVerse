import { AiOutlineClose } from 'react-icons/ai'
interface Props {
    handleToggle: () => void;
}
import { FaCircleUser } from "react-icons/fa6"
import {FaHome} from 'react-icons/fa'
import { BiSolidMessageRoundedDots } from 'react-icons/bi'
import { IoNotificationsSharp } from 'react-icons/io5'
import { BsFillGearFill } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
export default function Dashboard({handleToggle}: Props): JSX.Element {
    return (   
        <main className=" ml-7 text-[#ffffffa1] relative sm520:mt-20">
            <div className="flex flex-col gap-[7vh] select-none sm520:gap-[20vw]">
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]"> 
                    <FaCircleUser />
                    </span>
                    <p className="text-[20px] md734:inline hidden sm520:inline">Profile</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <FaHome />
                    </span>
                    <p className="text-[20px] md734:inline hidden sm520:inline">Home</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <BiSolidMessageRoundedDots />
                    </span>
                    <p className="text-[20px] md734:inline hidden sm520:inline">Message</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <IoNotificationsSharp />
                    </span>
                    <p className="text-[20px] md734:inline hidden sm520:inline">Notifications</p>
                </section>
                <section className="flex gap-1 cursor-pointer lg1280:hidden sm520:hidden">
                    <span className="text-[30px]">
                        <BsSearch />
                    </span>
                    <p className="text-[20px] md734:inline hidden sm520:inline">Explore</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <BsFillGearFill />
                    </span>
                    <p className="text-[20px] md734:inline hidden sm520:inline">Settings</p>
                </section>
            </div>
            <button 
                className="text-center bg-[#067acc] mt-14 w-[70%] font-bold py-2 text-xl text-white rounded-2xl md734:block hidden">Vpost</button>
            <span onClick={handleToggle} className='text-[30px] absolute top-[-60px] right-5 hidden sm520:inline'>
                <AiOutlineClose />
                </span>
        </main>
    )
}