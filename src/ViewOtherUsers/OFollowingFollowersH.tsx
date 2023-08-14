import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
import { useThemeStore } from '../Zustand';

export default function OFollowingFollowersH() {
    const theme = useThemeStore((state: any) => state.theme);
    const username = sessionStorage.getItem('Ousername')
    const name = sessionStorage.getItem('Oname')
    return (
        <header className="py-3 select-none">
            <section className='flex px-2 gap-5'>
                <span className={`text-2xl m-2 p-2 rounded-full transition-all cursor-pointer 
                ${theme ? "hover:bg-[#ffffff7d] " : "hover:bg-[#00000050] "}`}>
                    <AiOutlineArrowLeft />
                </span>
                <div>
                    <p className=' font-semibold text-lg'
                    >{name}</p>
                    <p
                        className={`font-semibold 
                    ${theme ? "text-[#ffffffa0]" : "text-[#000000bf]"}`}
                    >@{username}</p>
                </div>
            </section>
            <section className='flex gap-2 px-2 mb-1'>
                <Link to={`/User/${username}/Followers`} className={`w-1/2 mt-2  py-3 text-center font-semibold transition-all 
                ${theme ? "hover:bg-[#ffffff5b]" : " hover:bg-[#0000004e]"}`}>
                    <NavLink to={`/User/${username}/Followers`} className='ProfileActiveF pb-1'>
                        Followers
                    </NavLink>
                </Link>
                <Link to={`/User/${username}/Following`} className={`w-1/2 mt-2  py-3 text-center font-semibold transition-all 
                ${theme ? "hover:bg-[#ffffff5b]" : " hover:bg-[#0000004e]"}`}>
                    <NavLink to={`/User/${username}/Following`} className='ProfileActiveF pb-1'>
                        Following
                    </NavLink>
                </Link>
            </section>
            <hr />
        </header>
    )
}