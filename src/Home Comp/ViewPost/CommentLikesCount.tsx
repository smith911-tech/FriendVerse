interface Props{
    comment: any
}
import { useThemeStore } from '../../Zustand';
import { FcLike } from 'react-icons/fc'

export default function CommentLikesCount ({comment}: Props) {
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    let Likes
    const LikesCount =  comment?.Likes?.length || 0;

    if (LikesCount > 999) {
        Likes = (LikesCount / 1000).toFixed(1) + 'k';
    } else {
        Likes = LikesCount.toString();
    }

    return(
        <main>
            {comment?.Likes?.length > 0 && (
                <aside className={`absolute -bottom-2 right-4  px-1 flex gap-2 rounded-t-lg rounded-r-lg rounded-b-lg rounded-bl-lg   
                ${theme ? "bg-[black] text-[#ffffffc5] shadow-[rgb(0,_0,_0)_0px_0px_15px_3px]" : "bg-[white] text-[#000000b1] shadow-[rgb(255,_255,_255)_0px_0px_15px_3px]"}`}>
                    <div><FcLike  /> </div>
                    <p className=' text-sm'>{Likes}</p>
                </aside>
            )}
        </main>
    )
}