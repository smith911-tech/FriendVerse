import { AiOutlineClose } from 'react-icons/ai'
import defaultcoverimg from '../../assets/DefalutCoverImg.jpg'


interface userdatas{
    userData : any
    handleCloseModal: () => void
    showCmodal: boolean

}
export function UserCoverImg({ userData, handleCloseModal, showCmodal }: userdatas) {
    return(
    <>
            {showCmodal && (
                <div
                    onClick={handleCloseModal}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                >
                    <div className="fixed w-full top-20 z-[40] left-0" onClick={(e) => e.stopPropagation()}>
                        {userData.coverImage === "" ? (
                            <img
                                src={defaultcoverimg}
                                alt="Cover"
                                className="w-full h-52 sm:h-32 object-cover"
                            />
                        ) : (
                            <img
                                src={userData.coverImage}
                                alt="Cover"
                                className="object-contain top-0 h-[60vh] w-screen"
                            />
                        )}
                        <span className="absolute -top-10 right-[10%] text-white text-[40px] cursor-pointer ">
                            <AiOutlineClose onClick={handleCloseModal} />
                        </span>
                    </div>
                </div>
            )}
    </>
    )
}


interface userdatas2 {
    userData: any
    handleCloseModal: () => void
    showPmodal: boolean

}
export function UserProfileImg({showPmodal, handleCloseModal, userData}: userdatas2){
    return(
        <>
            {showPmodal && (
                <div
                    onClick={handleCloseModal}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                >
                    <div className="flex items-center">
                        <img
                            src={userData.profileImage}
                            alt="Profile"
                            className="w-44 h-44 rounded-full object-cover bg-white sm:h-20 sm:w-20"
                        />
                        <span className="absolute -top-10 right-[10%] text-white text-[40px] cursor-pointer">
                            <AiOutlineClose onClick={handleCloseModal} />
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}