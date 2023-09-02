import { AiTwotoneLike } from 'react-icons/ai'
import { useThemeStore } from '../../Zustand';
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { BiLike, BiRepost } from 'react-icons/bi'
import { GoComment } from 'react-icons/go'
export default function Postedbtn() {
    const theme = useThemeStore((state: any) => state.theme);
    return (
        <main className="mt-3 px-3">
            <section>
            <div  className='flex mb-1 justify-between'>
                <span title='Likes' className='flex hover:underline cursor-pointer '>
                        <button className='text-white text-base bg-blue-600 rounded-2xl -rotate-12 p-[2px]'>
                            <AiTwotoneLike />
                        </button>
                        <span className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}>3</span>
                </span>
                    <span title='Impression' className='flex hover:underline cursor-pointer'>
                        <button className=' rounded-2xl  p-[2px]'>
                            <TbBrandGoogleAnalytics />
                        </button>
                        <span className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}>10.5k</span>
                    </span>
            </div>
            <hr />
            </section>
            <article className="flex gap-[1%]">
                <button className='flex mt-1 w-[33%] justify-center py-[3px] rounded gap-1 hover:bg-[#0000004f]'>
                    <span className=' text-2xl text-[#00000087]'>
                        <BiLike />
                    </span>
                    <span className='text-[15px] text-[#000000b7]'>
                        Like
                    </span>
                </button>
                <button className='flex mt-1 w-[33%] justify-center py-[3px] rounded gap-1 hover:bg-[#0000004f]'>
                    <span className=' text-2xl text-[#00000087]'>
                        <GoComment />
                    </span>
                    <span className=' text-[15px] text-[#000000b7]'>
                        Comment
                    </span>
                </button>
                <button className='flex mt-1 w-[33%] justify-center py-[3px] rounded gap-1 hover:bg-[#0000004f]'>
                    <span className=' text-2xl text-[#00000087]'>
                        <BiRepost />
                    </span>
                    <span className=' text-[15px] text-[#000000b7]'>
                        Repost
                    </span>
                </button>
            </article>
        </main>
    )
}