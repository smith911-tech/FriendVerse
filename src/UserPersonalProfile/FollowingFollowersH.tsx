interface userDatas{
    userData: any | null
}
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
export default function FollowersFollowingH({userData}: userDatas){
    return(
        <header className="bg-white py-3">
            <section className='flex px-2 gap-5'>
                <Link to='/Profile' className='text-2xl mt-2 p-2 rounded-full hover:bg-[#00000050] transition-all cursor-pointer'>
                    <AiOutlineArrowLeft/>
                </Link>
                <div>
                    <p className=' font-semibold text-lg'
                    >{userData && userData.fullName}</p>
                    <p className='font-semibold text-[#000000bf]'
                    >@{userData && userData.username}</p>
                </div>
            </section>
            <section className='flex gap-2 px-2 mb-1'>
                <NavLink to='/Followers' className='w-1/2 mt-2  py-3 hover:bg-[#0000004e] text-center font-semibold'>
                    Followers
                </NavLink>
                <NavLink to='/Following' className='w-1/2 mt-2  py-3 hover:bg-[#0000004e] text-center font-semibold'>
                    Following
                </NavLink>
            </section>
            <hr />
        </header>
    )
}