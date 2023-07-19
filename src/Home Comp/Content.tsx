interface userdatas{
    userData : any
}
import { BiSolidUserCircle } from 'react-icons/bi'
export default function Content({userData}: userdatas): JSX.Element{

    const firstName = userData?.fullName?.split(" ")[0] ?? 'Loading....';
    return (
        <main>
            <header className='bg-white mb-2 py-2 px-5 rounded-2xl shadow md970:w-[90%] block mt-0 mx-auto'>
                <nav className='flex justify-between'>
                    <div>
                        {userData && userData?.profileImage === "" ? (
                            <div className='text-[48px]   rounded-full text-[#000000d7]'>
                                <BiSolidUserCircle />
                            </div>
                        ) : (
                            <img
                                src={userData?.profileImage}
                                alt="Profile"
                                className="w-12 h-12 rounded-full   object-contain "
                            />
                        )}
                    </div>
                    <input type="text" className='w-[90%] h-10 bg-[#f0f2f5] rounded-2xl mt-1 px-4 outline-none'
                        placeholder={`What's on your mind, ${firstName}? `}/>
                </nav>
            </header>
        </main>
    )
}   