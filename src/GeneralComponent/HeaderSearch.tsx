import { BiLeftArrowAlt } from 'react-icons/bi'

export default function HeaderSearch(){
    return(
        <header>
            <section className='flex gap-2'>
                <div  className=' text-4xl'>
                    <BiLeftArrowAlt />
                </div>
                <input type="text" className='w-full h-8'/>
            </section>
        </header>
    )
}