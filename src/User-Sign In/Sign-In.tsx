import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function SignIn() {
    // ! show password
    const [showPassword, setShowpassword] = useState<boolean>(false);
    const HandleShowpassword = () => {
        setShowpassword(!showPassword);
    };
    // ! change input between email and phone number
    const [changeInput, setChangeInput] = useState<boolean>(true);
    const HandleChangeInput = () => {
        setChangeInput(!changeInput);
    };
    // ! phone number dropdown state
    const [phoneNumber, setPhonenumber] = useState<string | undefined>();
    return (
        <main className="bg-[#1B1D21] h-[120vh] px-[29px] py-[61px] text-white w-full">
            <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[80%] md734:pb-36 lg1440:w-[1000px] changePageanimation">
                {/* Logo  */}
                <div className="select-none">
                    <img
                        className="w-[100px] block mx-auto my-0 md734:w-[130px] lg1280:w-[150px]"
                        src={Logo}
                        alt=""
                    />
                    <h2 className="text-center font-bold font-sans pb-9 mt-[-20px] md734:text-3xl">
                        Sign In with Friend Verse
                    </h2>
                </div>
                {/* End of logo */}
                <form action="">
                    <section className="flex flex-col justify-center lg1280:flex-row ">
                        {/* email, phone number and password input */}
                        <div className="flex flex-col lg1280:w-[49%]">
                            {changeInput ? (
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1"
                                />
                            ) : (
                                <div className="inputDrowndopDiv  w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1">
                                    {/* phone number drop down input */}
                                    <PhoneInput
                                        international
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        onChange={setPhonenumber}
                                    />
                                    {/*end of  phone number drop down input */}
                                </div>
                            )}
                            {/* change of input text (email || phone number) */}
                            {changeInput ? (
                                <p
                                    onClick={HandleChangeInput}
                                    className="text-right mb-4 text-[#117DD5] cursor-pointer font-seri font-semibold  md734:text-center md734:ml-60  lg1280:text-right lg1280:mr-3 text-sm select-none"
                                >
                                    Use phone number instead
                                </p>
                            ) : (
                                <p
                                    onClick={HandleChangeInput}
                                    className="text-right mb-4 text-[#117DD5] cursor-pointer font-seri font-semibold  md734:text-center md734:ml-60  lg1280:text-right lg1280:mr-3 text-sm select-none "
                                >
                                    Use email address instead
                                </p>
                            )}
                            {/*end of  change of input text (email || phone number) */}
                        </div>
                        <div className="flex relative md734:w-[450px]  left-1/2 transform -translate-x-1/2 lg1280:left-0 lg1280:translate-x-0 lg1280:w-[49%]">
                            <input
                                type={showPassword ? "text" : "password"}
                                name=""
                                placeholder="Password"
                                className="w-full bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 "
                            />
                            {showPassword ? (
                                <i
                                    onClick={HandleShowpassword}
                                    className="fa-regular fa-eye-slash absolute right-3 mt-3 cursor-pointer"
                                ></i>
                            ) : (
                                <i
                                    onClick={HandleShowpassword}
                                    className="fa-regular fa-eye absolute right-3 mt-3 cursor-pointer"
                                ></i>
                            )}
                        </div>
                    </section>
                    <button className="block mx-auto my-0 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none">
                        Sign In
                    </button>
                </form>
                {/* end of email, phone number and password input */}
                <section className="select-none">
                    <Link to="/Forgotpassword">
                        <button className="block mx-auto my-7 border border-white border-solid py-1 rounded-[40px] px-6 font-bold lg1280:border-none lg1280:text-[#117DD5]">
                            Forget password?
                        </button>
                    </Link>
                    <p className="text-center font-bold ">
                        Don't have an Account?
                        <span className="text-[#117DD5] cursor-pointer">
                            <Link to="/Siginup"> Sign up</Link>
                        </span>
                    </p>
                </section>
            </section>
        </main>
    );
}
