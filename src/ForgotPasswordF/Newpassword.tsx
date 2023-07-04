import Logo from "../assets/Logo.png";
import { useState } from 'react'
export default function Newpassword() {
    // ! show password
    const [showPassword, setShowpassword] = useState(false)
    const HandleShowpassword = () => {
        setShowpassword(!showPassword)
    }
    return (
        <main className="bg-[#1B1D21] h-[100vh] px-[29px] py-[61px] relative  w-full text-white">
            <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[600px] md734:pb-30 ">
                {/* Logo  */}
                <div className='select-none'>
                    <img className='w-[100px] block mx-auto my-0 md734:w-[130px] lg1280:w-[150px]' src={Logo} alt="" />
                    <h2 className='text-center font-bold font-sans pb-9 mt-[-20px] md734:text-2xl text-white'>Create a new password</h2>
                </div>
                <div className='flex relative md734:w-[450px]  left-1/2 transform -translate-x-1/2'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name=""
                        placeholder='New Password'
                        className='w-full bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 '
                    />
                    {showPassword ?
                        (<i onClick={HandleShowpassword} className="fa-regular fa-eye-slash absolute right-3 mt-3 cursor-pointer"></i>) :
                        (<i onClick={HandleShowpassword} className="fa-regular fa-eye absolute right-3 mt-3 cursor-pointer"></i>)
                    }
                </div>
                <div className='flex relative md734:w-[450px]  left-1/2 transform -translate-x-1/2'>
                    <input
                        type={showPassword ? "text" : "password"}
                        name=""
                        placeholder='Confirm Password'
                        className='w-full bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 '
                    />
                    {showPassword ?
                        (<i onClick={HandleShowpassword} className="fa-regular fa-eye-slash absolute right-3 mt-3 cursor-pointer"></i>) :
                        (<i onClick={HandleShowpassword} className="fa-regular fa-eye absolute right-3 mt-3 cursor-pointer"></i>)
                    }
                </div>
                <button className="block mx-auto my-0 mt-1 py-2 px-10  text-black bg-[#D9D9D9] rounded-[10px] font-sans font-bold select-none hover:bg-[#117DD5]  hover:text-white hover:transition">Sumbit</button>
            </section>
        </main>
    )
}