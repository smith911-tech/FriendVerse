interface userdatas{
    isInputClicked: boolean
}
import { AiOutlineClose } from 'react-icons/ai'
export default function UpdateProfile({ isInputClicked }: userdatas): JSX.Element{
    return(
        <>
            {isInputClicked && (
                <div className=" absolute top-0 left-0 right-0 mx-auto bg-white p-4 z-[30]  shadow md970:w-[100%] sm650:-top-9 ">
                    <section className='flex justify-between'>
                        <div className='flex gap-3'>
                            <span className=' text-2xl'><AiOutlineClose/></span>
                            <h2 className=' font-medium'>Edit Profile</h2>
                        </div>
                        <button className=' bg-[#3b82f6] text-white font-medium py-1 px-4 rounded-3xl'>Save</button>
                    </section>
                </div>
            )}
        </>
    )
}