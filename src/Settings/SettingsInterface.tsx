interface userdatas{
    userData: any
}
import {  BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { LongCard } from '../GeneralComponent/LoadingCard'

export default function SettingsInterface({userData}: userdatas){
    return(
        <>
        {userData ? (
                <main className="bg-white">
                    <section className='flex px-2 py-1 smm500:px-1 gap-5'>
                        <Link to='/Profile'>
                            <div className='text-[#0000008e] text-3xl top-1 left-1 cursor-pointer mt-1'>
                                <BsFillArrowLeftCircleFill />
                            </div>
                        </Link>
                        <div>
                            <p className=' text-xl font-bold  mt-1'>Your Account</p>
                        </div>
                    </section>
                    <section className='px-4 smm500:px-2 w-full block my-0 mx-au'>
                        {/* Profile Picture */}
                        <div className='flex items-center'>
                            <img
                                src={userData.profilePicture}
                                alt='Profile Picture'
                                className='w-16 h-16 rounded-full object-cover mr-4'
                            />
                            <div>
                                <p className='text-lg font-bold'>{userData.fullName}</p>
                                <p className='text-sm text-gray-500'>@{userData.username}</p>
                            </div>
                        </div>
                        <hr className='my-4' />
                        {/* Privacy Settings */}
                        <div className='mb-4'>
                            <p className='text-base font-bold'>Privacy Settings</p>
                            {/* Add your privacy settings options here */}
                            {/* For example: */}
                            <div>
                                <label htmlFor='postsPrivacy' className='block font-medium'>
                                    Who can see your posts?
                                </label>
                                <select
                                    id='postsPrivacy'
                                    className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    <option value='public'>Public</option>
                                    <option value='friends'>Friends</option>
                                    <option value='private'>Private</option>
                                </select>
                            </div>
                        </div>
                        {/* Notifications */}
                        <div className='mb-4'>
                            <p className='text-base font-bold'>Notifications</p>
                            {/* Add your notification settings options here */}
                            {/* For example: */}
                            <div>
                                <label htmlFor='emailNotifications' className='block font-medium'>
                                    Email Notifications
                                </label>
                                <input
                                    type='checkbox'
                                    id='emailNotifications'
                                    className='form-checkbox h-5 w-5 text-blue-500'
                                />
                            </div>
                        </div>
                        {/* Account Deletion */}
                        <div className='mb-4'>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-lg'>
                                Delete Account
                            </button>
                        </div>
                        {/* Theme Settings */}
                        <div className='mb-4'>
                            <p className='text-base font-bold'>Theme Settings</p>
                            {/* Add your theme settings options here */}
                            {/* For example: */}
                            <div>
                                <label htmlFor='theme' className='block font-medium'>
                                    Select Theme
                                </label>
                                <select
                                    id='theme'
                                    className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    <option value='light'>Light Mode</option>
                                    <option value='dark'>Dark Mode</option>
                                </select>
                            </div>
                        </div>
                        {/* Language Settings */}
                        <div className='mb-4'>
                            <p className='text-base font-bold'>Language Settings</p>
                            {/* Add your language settings options here */}
                            {/* For example: */}
                            <div>
                                <label htmlFor='language' className='block font-medium'>
                                    Select Language
                                </label>
                                <select
                                    id='language'
                                    className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                                >
                                    <option value='en'>English</option>
                                    <option value='es'>Español</option>
                                </select>
                            </div>
                        </div>
                        {/* Connected Accounts */}
                        <div className='mb-4'>
                            <p className='text-base font-bold'>Connected Accounts</p>
                            {/* Add your connected accounts management options here */}
                            {/* For example: */}
                            <div>
                                <p>Connected Accounts:</p>
                                <ul className='list-disc list-inside'>
                                    <li>Linked with Facebook</li>
                                    <li>Linked with Twitter</li>
                                </ul>
                            </div>
                        </div>
                    </section>
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