import { AiTwotoneLike } from 'react-icons/ai'
export default function Postedbtn() {
    return (
        <main className="mt-3 px-3">
            <section>
            <div  className='flex'>
                <span>
                        <button className='text-white text-base bg-blue-600 rounded-2xl -rotate-12 p-[2px]'>
                            <AiTwotoneLike />
                        </button>
                        <span className=' text-xs ml-1 '>300</span>
                </span>
            </div>
            <hr />
            </section>
            <article className="flex">
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </article>
        </main>
    )
}