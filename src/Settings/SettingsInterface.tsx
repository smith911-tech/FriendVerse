interface userdatas{
    userData: any
}
import { useState } from 'react'
import {  BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { BiSolidUserCircle } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { LongCard } from '../GeneralComponent/LoadingCard'
import DeleteModal from './DeleteModal'
import { SuccessLoginM } from '../Error-SuccessM'
import { ColorRing } from 'react-loader-spinner'


export default function SettingsInterface({userData}: userdatas){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
     // ! Sucess message 
    const [successFul, setSuccessful] = useState<string | boolean>(false) 

    const navigate = useNavigate()
    
    const handleLogout = () => {
        setSuccessful("Logging out...");
        setTimeout(() => {
        sessionStorage.removeItem('UserId');
        setSuccessful(false)
        navigate("/")
        window.scrollTo(0, 0)
        }, 1000)
    }
    return(
        <>
        {userData ? (
                <main className="bg-gray-100 px-4 py-4 pb-12">
                    <section className="py-3 sticky top-16 z-[50] bg-[#f3f4f6]">
                        <Link to="/Profile" className="text-blue-500 flex items-center gap-1">
                            <BsFillArrowLeftCircleFill className="text-xl" />
                            <span>Back to Profile</span>
                        </Link>
                    </section>
                    <section className="bg-white rounded-lg shadow-lg p-6 relative mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            {userData.profileImage === '' ? (
                                <Link to="/Profile">
                                    <div className="text-[2000px] rounded-full bg-gray-300  flex items-center justify-center">
                                        <BiSolidUserCircle className="text-[#000000d7] text-[60px]" />
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/Profile">
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                </Link>
                            )}
                            <div>
                                <p className="text-xl font-semibold">{userData.fullName}</p>
                                <p className="text-gray-600">@{userData.username}</p>
                            </div>
                        </div>
                        <hr className="mb-6" />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Privacy Settings</h2>
                                <select
                                    id="postsPrivacy"
                                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Theme Settings</h2>
                                <select
                                    id="theme"
                                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
                                >
                                    <option value="light">Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                </select>
                            </div>
                            <hr />
                            <div className="space-y-4">
                                <div className="bg-blue-50 rounded-lg p-4 space-y-2 select-none">
                                    <h2 className="text-lg font-semibold">Identity Verification</h2>
                                    <p className="text-gray-600 ">
                                        Ensure your account's security by verifying your identity with a valid identification document.
                                    </p>
                                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors">
                                        Get Verified
                                    </button>
                                </div>
                                <hr />
                                <div className="bg-red-50 rounded-lg p-4 space-y-2 select-none">
                                    <h2 className="text-lg font-semibold">Logout</h2>
                                    <p className="text-gray-600">Are you sure you want to logout?</p>
                                    <button className="border rounded-lg px-6 py-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full transition-colors flex justify-center" onClick={handleLogout}>
                                        {!successFul ? 
                                        (<h2>Logout</h2>
                                        ) : ( 
                                            <ColorRing
                                                visible={true}
                                                height="25"
                                                width="45"
                                                colors={['#ffff', '#ffff', '#ffff', '#fff', '#ffff']}
                                            />
                                            )}
                                    </button>
                                </div>
                                <hr />
                                <div className="flex justify-center select-none">
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className="bg-red-500 text-white px-6 py-2 rounded-lg w-full hover:bg-red-600 transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                        {successFul && <SuccessLoginM
                            successFul={successFul}
                        />}
                    </section>
                    {showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal} />}
                </main>
        )
        : 
        (
            <LongCard />
        )
        }
        </>
    )
}