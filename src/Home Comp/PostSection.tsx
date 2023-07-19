interface userdatas{
    handleBodyClick : () => void,
    handleInputClick: () => void,
    isInputClicked: boolean,
    userData : any
}
import { BiSolidUserCircle } from 'react-icons/bi';
export default function PostSection({
    handleBodyClick,
    userData, 
    isInputClicked,
    handleInputClick}: userdatas): JSX.Element{
    const firstName = userData?.fullName?.split(' ')[0] ?? 'Loading....';
    return(
        <>
            <header className="bg-white mb-2 py-2 px-5 rounded-2xl shadow md970:w-[90%] block mt-0 mx-auto ">
                <nav className="flex justify-between">
                    <div>
                        {userData && userData?.profileImage === '' ? (
                            <div className="text-[48px] rounded-full text-[#000000d7]">
                                <BiSolidUserCircle />
                            </div>
                        ) : (
                            <img
                                src={userData?.profileImage}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-contain select-none"
                            />
                        )}
                    </div>
                    <input

                        type="text"
                        onClick={handleInputClick}
                        className="w-[90%] cursor-pointer h-10 bg-[#f0f2f5] rounded-2xl mt-1 px-4 outline-none"
                        placeholder={`What's on your mind, ${firstName}?`}
                    />
                </nav>
            </header>

            {isInputClicked && (
                <div className="absolute top-40 left-0 right-0 mx-auto bg-white p-4 z-50 rounded-2xl shadow md970:w-[90%] ">

                </div>
            )}
        </>
    )
} 