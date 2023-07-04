import Logo from "../assets/Logo.png";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Signup() {
    const navigate = useNavigate();
    const BackToSignup = () => {
        navigate("/");
    };

    // ! change input between email and phone number
    const [changeInput, setChangeInput] = useState<boolean>(true)
    const HandleChangeInput = () => {
        setChangeInput(!changeInput)
    }

    // ! show password
    const [showPassword, setShowpassword] = useState<boolean>(false)
    const HandleShowpassword = () => {
        setShowpassword(!showPassword)
    }
    // ! Input value
    // const [fullName, setFullName] = useState<string>('');
    // const [email, setEmail] = useState<string>('');
    // const [createpassword, setCreatePassword] = useState<string>('');
    const [phoneNumber, setPhonenumber] = useState<string>('');

    // ! error
    // const [error, setError] = useState('');

    //! Section change state && function 
    const [section, setSection] = useState(1);

    // ! next section handle
    const handleNextSection = () => {
    setSection(section + 1);
    };
    // ! previous section handle
    const handlePreviousSection = () => {
    setSection(section - 1);
    };
    return (
        <main className="bg-[#1B1D21] h-[120vh] px-[29px] py-[61px] relative text-white w-full">
            <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[700px] md734:pb-36 relative changePageanimation">
                <i
                    onClick={BackToSignup}
                    className="fa-solid fa-xmark absolute text-2xl top-3 cursor-pointer"
                ></i>
                <div className="select-none">
                    <img
                        className="w-[100px] block mx-auto my-0 md734:w-[130px] lg1280:w-[150px]"
                        src={Logo}
                        alt=""
                    />
                    <h2 className="text-center font-bold font-sans pb-6 mt-[-20px] md734:text-2xl">
                        Create Your Account
                    </h2>
                </div>
                <div className="flex justify-center gap-2">
                    <span className={`${section === 1 ? "bg-[#117DD5]" : "bg-[rgba(255,255,255,0.51)]"} py-[2.5px] w-[70px] md734:w-[90px] rounded-md`}></span>
                    <span className={`${section === 2 ? "bg-[#117DD5]" : "bg-[rgba(255,255,255,0.51)]"} py-[2.5px] w-[70px] md734:w-[90px] rounded-md`}></span>
                    <span className={`${section === 3 ? "bg-[#117DD5]" : "bg-[rgba(255,255,255,0.51)]"} py-[2.5px] w-[70px] md734:w-[90px] rounded-md`}></span>
                </div>
                    {/* first section */}
                    {section === 1 && (
                    <section className="flex flex-col mt-8 ">
                    <input type="text" className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1" placeholder="Full name" />
                    <br />
                    {changeInput ? (
                    <input type="email" className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1" placeholder="Email address"/>
                    ) : (
                    <div className='inputDrowndopDiv  w-full block mx-auto my-0 md734:w-[450px]   mb-1'>
                    {/* phone number drop down input */}
                    <PhoneInput
                    international
                    className="lg1280:h-11"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e : any) => {
                        setPhonenumber(e.target.value)
                    }}/>
                    {/*end of  phone number drop down input */}
                    </div>
                    )}
                    {changeInput  ? (
                    <p onClick={HandleChangeInput} className='text-right mb-4 text-[#117DD5] cursor-pointer font-seri font-semibold  md734:text-center md734:ml-60    text-sm select-none my-2'>Use Phone Number instead</p>
                    ) :  (
                    <p onClick={HandleChangeInput} className='text-right mb-4 text-[#117DD5] cursor-pointer font-seri font-semibold  md734:text-center md734:ml-60    text-sm select-none my-2'>Use Email address instead</p>
                    )}
                    <div className='flex relative md734:w-[450px]  left-1/2 transform -translate-x-1/2 '>
                    <input 
                    type={showPassword ? "text" : "password"} 
                    name="" 
                    placeholder='Create Password' 
                    className='w-full bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 '
                    />
                    {showPassword ? 
                    ( <i onClick={HandleShowpassword} className="fa-regular fa-eye-slash absolute right-3 mt-3 cursor-pointer"></i>) : 
                    (<i onClick={HandleShowpassword} className="fa-regular fa-eye absolute right-3 mt-3 cursor-pointer"></i>)
                    }
                    </div>
                    <button onClick={handleNextSection} className="block mx-auto my-0 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none">Next</button>
                    </section>
                    )}
                    {/*end of first section */}
                    {section === 2 && (
                    <section className="flex flex-col mt-8 md734:px-24">
                        <h2 className="text-xl font-bold font-serif">Date of birth</h2>
                        <p className="text- text-sm font-semibold font-sans text-[#ffffffb9] mb-3">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                        
                        <input type="date" name="" id="" className="w-full bg-[#ffffff62] border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 mt-5 outline-none"/>                        
                        <div className="flex justify-between">
                        <button onClick={handlePreviousSection} className="block mx-auto my-0 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none">Prev</button>
                        <button onClick={handleNextSection} className="block mx-auto my-0 py-2 px-10  text-white bg-[#117DD5] rounded-[30px] font-sans font-bold select-none">Next</button>
                        </div>
                    </section>
                    )}
                    {section === 3 && (
                        <section className="flex flex-col mt-8  md734:px-24 font-sans"> 
                        <h2 className="text-lg font-bold ">Personalize your experience</h2>
                        <h3 className="mt-4 font-bold text-base mb-1">Keep track of where you see Friend verse content on the web.</h3>
                        <p className="text-[#ffffff9b] text-sm font-normal">Friend Verse utilizes this information to tailor your experience. Your web browsing history will never be saved alongside your name, email, or phone number.</p>
                        <br /> 
                        <p className="text-[#ffffff9b] text-sm font-normal">By signing up, you agree to our
                        <span className="text-[#117DD5] cursor-pointer">Terms</span>, 
                        <span className="text-[#117DD5] cursor-pointer">Privacy Policy</span>, and 
                        <span className="text-[#117DD5] cursor-pointer">Cookie Use</span>. Friend Verse may use your contact information, including your email address and phone number for purposes outlined in our  
                        <span className="text-[#117DD5] cursor-pointer"> Privacy Policy</span>.</p>
                        <br />
                        <div className="text- text-xs font-bold select-none">
                            <label htmlFor="acknowledge">I acknowledge</label> {" "}
                            <input type="checkbox" name="" id="acknowledge" /> 
                        </div>
                        <br />
                        <button className="block mx-auto my-0 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none">Submit</button>
                        </section>
                    )}
            </section>
        </main>
    );
}
