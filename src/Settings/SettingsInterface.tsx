interface userdatas{
    userData: any
}
import { useState } from 'react'
import {  BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { BiSolidUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { LongCard } from '../GeneralComponent/LoadingCard'
import DeleteModal from './DeleteModal'

export default function SettingsInterface({userData}: userdatas){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    return(
        <>
        {userData ? (
                <main className="bg-white p-4">
                    <section className="flex items-center gap-2 mb-4">
                        <Link to="/Profile">
                            <BsFillArrowLeftCircleFill className="text-[#0000008e] text-3xl cursor-pointer" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Your Account</h1>
                        </div>
                    </section>
                    <section className="space-y-4">
                        {/* Profile Picture */}
                        <div className="flex items-center justify-center gap-4">
                            {userData.profileImage === '' ? (
                                <Link to="/Profile">
                                    <div className="text-[48px] rounded-full text-[#000000d7] select-none">
                                        <BiSolidUserCircle />
                                    </div>
                                </Link>
                            ) : (
                                <Link to="/Profile">
                                    <img
                                        src={userData.profileImage}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover select-none"
                                    />
                                </Link>
                            )}
                            <div>
                                <p className="text-lg font-bold">{userData.fullName}</p>
                                <p className="text-sm text-gray-500">@{userData.username}</p>
                            </div>
                        </div>
                        <hr />
                        {/* Privacy Settings */}
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold">Privacy Settings</h2>
                            <div>
                                <label htmlFor="postsPrivacy" className="block font-medium">
                                    Who can see your posts?
                                </label>
                                <select
                                    id="postsPrivacy"
                                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        {/* Theme Settings */}
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold">Theme Settings</h2>
                            <div>
                                <label htmlFor="theme" className="block font-medium">
                                    Select Theme
                                </label>
                                <select
                                    id="theme"
                                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="light">Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                </select>
                            </div>
                        </div>
                        <hr />
                        {/* Language Settings */}
                        <div className="space-y-2 ">
                            <h2 className="text-lg font-bold">Verify Identity?</h2>
                        </div>
                        <hr />
                        {/* Account Deletion */}
                        <div className="flex justify-center select-none">
                            <button 
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg w-[80%] ">
                                Delete Account
                            </button>
                        </div>
                    </section>
                    {showDeleteModal && (
                        <DeleteModal setShowDeleteModal={setShowDeleteModal}/>
                    )}
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