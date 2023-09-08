interface Props{
    userData : any
}
export default function PostComment({userData}: Props) {
    return(
        <article>
            <section>
                <div className=' bg-[#f0f2f5] mx-2'>
                    <input
                        type="text"
                        className='w-full bg-[#f0f2f5]'
                        placeholder='Write a comment' />
                </div>
            </section>
        </article>
    )
}