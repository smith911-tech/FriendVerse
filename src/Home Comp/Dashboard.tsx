import { FaCircleUser } from "react-icons/fa6"
import {FaHome} from 'react-icons/fa'
import { BiSolidMessageRoundedDots } from 'react-icons/bi'
import { IoNotificationsSharp } from 'react-icons/io5'
import { BsFillGearFill } from 'react-icons/bs'
export default function Dashboard() {
    return (   
        <main className=" ml-7 text-[#ffffffa1]">
            <div className="flex flex-col gap-[7vh] select-none">
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]"> 
                    <FaCircleUser />
                    </span>
                    <p className="text-[20px]">Profile</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <FaHome />
                    </span>
                    <p className="text-[20px]">Home</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <BiSolidMessageRoundedDots />
                    </span>
                    <p className="text-[20px]">Message</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <IoNotificationsSharp />
                    </span>
                    <p className="text-[20px]">Notifications</p>
                </section>
                <section className="flex gap-1 cursor-pointer">
                    <span className="text-[30px]">
                        <BsFillGearFill />
                    </span>
                    <p className="text-[20px]">Settings</p>
                </section>
            </div>
            <button 
            className="text-center bg-[#067acc] mt-14 w-[70%] font-bold py-2 text-xl text-white rounded-xl">Post</button>
        </main>
    )
}