import {  BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function SettingsInterface(){
    return(
        <main className="bg-white">
            <section className='px-2 py-1 smm500:px-1'>
                <Link to='/Profile'>
                    <div className=' text-[#0000008e] text-3xl top-1 left-1 cursor-pointer'>
                        <BsFillArrowLeftCircleFill />
                    </div>
                </Link>
            </section> 
        </main>
    )
}