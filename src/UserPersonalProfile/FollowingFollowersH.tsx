import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

export default function FollowersFollowingH(){
    const username = sessionStorage.getItem('username')
    const name = sessionStorage.getItem('name')
    return(
        <header className="py-3">
            <section className='flex px-2 gap-5'>
                <Link to='/Profile' className='text-2xl mt-2 p-2 rounded-full hover:bg-[#00000050] transition-all cursor-pointer'>
                    <AiOutlineArrowLeft/>
                </Link>
                <div>
                    <p className=' font-semibold text-lg'
                    >{name}</p>
                    <p className='font-semibold text-[#000000bf]'
                    >@{username}</p>
                </div>
            </section>
            <section className='flex gap-2 px-2 mb-1'>
                <Link to='/Followers' className='w-1/2 mt-2  py-3 hover:bg-[#0000004e] text-center font-semibold transition-all'>
                    <NavLink to='/Followers' className='ProfileActiveF pb-1'>
                        Followers
                    </NavLink>
                </Link>
                <Link to='/Following' className='w-1/2 mt-2  py-3 hover:bg-[#0000004e] text-center font-semibold transition-all'>
                    <NavLink to='/Following' className='ProfileActiveF pb-1'>
                        Following
                    </NavLink>
                </Link>
            </section>
            <hr />
        </header>
    )
}