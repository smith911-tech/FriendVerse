import { AiOutlineClose } from 'react-icons/ai'
import {useEffect} from 'react'


interface Props{
    userData : any
    handleCloseModal: () => void
    showCmodal: boolean

}
export function UserCoverImg({ userData, handleCloseModal, showCmodal }: Props) {
    useEffect(() => {
        if (showCmodal) {
            // Add the 'overflow-hidden' class to the body when the modal is shown
            document.body.classList.add('overflow-hidden');
        } else {
            // Remove the 'overflow-hidden' class from the body when the modal is hidden
            document.body.classList.remove('overflow-hidden');
        }
    }, [showCmodal]);
    return(
    <>
            {showCmodal && (
                <div
                    onClick={handleCloseModal}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                >
                    <div className="fixed w-full top-20 z-[40] left-0 select-none" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={userData.coverImage}
                                alt="Cover"
                                className="object-contain top-0 h-[60vh] w-screen"
                            />
                        
                        <span className="absolute -top-10 right-[10%] text-white text-[40px] cursor-pointer smm500:top-0">
                            <AiOutlineClose onClick={handleCloseModal} />
                        </span>
                    </div>
                </div>
            )}
    </>
    )
}


interface Props2 {
    userData: any
    handleCloseModal: () => void
    showPmodal: boolean

}
export function UserProfileImg({showPmodal, handleCloseModal, userData}: Props2){
    useEffect(() => {
        if (showPmodal) {
            // Add the 'overflow-hidden' class to the body when the modal is shown
            document.body.classList.add('overflow-hidden');
        } else {
            // Remove the 'overflow-hidden' class from the body when the modal is hidden
            document.body.classList.remove('overflow-hidden');
        }
    }, [showPmodal]);
    return(
        <>
            {showPmodal && (
                <div
                    onClick={handleCloseModal}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                >
                    <div className="flex items-center select-none">
                        <img
                            src={userData.profileImage}
                            alt="Profile"
                            className="w-60 h-60 rounded-full object-cover bg-white sm:h-20 sm:w-20"
                        />
                        <span className="absolute top-10 right-[10%] text-white text-[40px] cursor-pointer smm500:top-0">
                            <AiOutlineClose onClick={handleCloseModal} />
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}