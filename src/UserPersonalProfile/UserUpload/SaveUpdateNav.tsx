interface userDatas{
    handleBodyClick: () => void,
    handleUpdate: (_e: any) => void,
    Loader: any
}
import { AiOutlineClose } from 'react-icons/ai'
import { ThreeDots } from 'react-loader-spinner'
import useThemeStore from '../../Zustand';
export default function SaveUpdateNav({ handleBodyClick, handleUpdate, Loader }: userDatas) {
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <>
            <section className={`flex justify-between sticky z-20  h-22 -top-2 py-3 ${theme ? "bg-black" : "bg-white"}`}>
                <div className='flex gap-3'>
                    <span className=' text-2xl cursor-pointer' onClick={handleBodyClick}><AiOutlineClose /></span>
                    <h2 className=' font-medium'>Edit Profile</h2>
                </div>
                <button
                    onClick={handleUpdate}
                    className=' bg-[#3b82f6] text-white font-medium py-1 px-4 rounded-3xl'>
                    {Loader ? (
                        <span className=''>
                            <ThreeDots
                                height="25"
                                width="25"
                                radius="9"
                                color="#fff"
                                ariaLabel="three-dots-loading"
                                visible={true}

                            />
                        </span>
                    ) : (
                        <h2>Save</h2>
                    )}
                </button>
            </section>
        </>
    )
}