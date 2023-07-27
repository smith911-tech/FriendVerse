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