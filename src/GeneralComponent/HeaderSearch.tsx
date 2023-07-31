interface userdatas {
    SuggestData : any
    Popover : any
}
import { BiLeftArrowAlt } from 'react-icons/bi'

export default function HeaderSearch({SuggestData, Popover}: userdatas){
    console.log(SuggestData)
    return(
        <header>
            <section className='flex gap-2 pb-4'>
                <Popover.Button  className=' text-4xl pb-2 rounded-full  hover:bg-[#f0f2f5] h-9'>
                    <BiLeftArrowAlt />
                </Popover.Button>
                <input type="text" className='w-full h-9 bg-[#f0f2f5] outline-none rounded-lg px-3' placeholder='Search FriendVerse'/>
            </section>
        </header>
    )
}