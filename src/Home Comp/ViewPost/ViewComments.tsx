import { FaRegCommentDots } from 'react-icons/fa';

export default function ViewComment() {
    return (
        <main>
            <div className='flex items-center justify-center gap-2 py-5'>
                <FaRegCommentDots className="text-5xl text-blue-500" />
                <p className='text-lg text-gray-600'>Be the first to comment</p>
            </div>
        </main>
    );
}
