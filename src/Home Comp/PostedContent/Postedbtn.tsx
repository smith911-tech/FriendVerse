interface Props{
    post: any
}
import { AiTwotoneLike } from 'react-icons/ai'
import { useThemeStore } from '../../Zustand';
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import Likebutton from './Post Buttons/Likebutton';
import Sharebutton from './Post Buttons/Sharebutton';
import Commentbutton from './Post Buttons/Commentbutton';
import Repost from './Post Buttons/Repost';
export default function Postedbtn({post}: Props) {
    const theme = useThemeStore((state: any) => state.theme);
    let Likes = '0';
    const LikesCount = post &&  post?.Likes?.length || 0;

    if (LikesCount > 999) {
        Likes = (LikesCount / 1000).toFixed(1) + 'k';
    } else {
        Likes = LikesCount.toString();
    }
    return (
        <main className="mt-3 px-3">
            <section>
            <div  className='flex mb-1 justify-between'>
                    <span title='Likes' 
                    className={`flex hover:underline cursor-pointer 
                    ${LikesCount > 0 ? " visible" : " invisible"}`}>
                        <button className='text-white text-base bg-blue-600 rounded-2xl -rotate-12 p-[2px]'>
                            <AiTwotoneLike />
                        </button>
                        <span className={` text-xs ml-[1px] mt-1 
                        ${theme ? "text-[#ffffffa2]" : "text-[#000000a6]"}
                        `}>{Likes}
                        </span>
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
            <article className="flex gap-[1%] justify-center">
                <Likebutton post={post} Likes={Likes} LikesCount={LikesCount}/>
                <Repost />
                <Commentbutton post={post}/>
                <Sharebutton />
            </article>
        </main>
    )
}