import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaXmark } from "react-icons/fa6"
export default function Forgetpasword() {
    //! back to signin page function
    const navigate = useNavigate();
    const BackToSignup = () => {
        navigate("/");
    };

    // ! change input between email and phone number
    const [changeInput, setChangeInput] = useState<boolean>(true);
    const HandleChangeInput = () => {
        setChangeInput(!changeInput);
    };

    // input states
    const [phoneNumber, setPhonenumber] = useState<string>("");
    return (
        <>
            <main className="bg-[#1B1D21] h-[100vh] px-[29px] py-[61px] text-white w-full">
                <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[600px] md734:pb-30  changePageanimation relative">
                    <div className="absolute text-2xl top-3 cursor-pointer"
                        onClick={BackToSignup}>
                        <FaXmark />
                    </div>
                    {/* Logo  */}
                    <div className="select-none">
                        <img
                            className="w-[100px] block mx-auto my-0 md734:w-[130px] "
                            src={Logo}
                            alt=""
                        />
                        <h2 className="text-center font-bold font-sans pb-9 mt-[-20px] md734:text-2xl">
                            Forgot Password
                        </h2>
                    </div>
                    <section>
                        {changeInput ? (
                            <input
                                type="email"
                                className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1"
                                placeholder="Email address"
                            />
                        ) : (
                            <div className="inputDrowndopDiv  w-full block mx-auto my-0 md734:w-[450px]   mb-1">
                                {/* phone number drop down input */}
                                <PhoneInput
                                    international
                                    className="lg1280:h-11"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(e: any) => {
                                        setPhonenumber(e.target.value);
                                    }}
                                />
                                {/*end of  phone number drop down input */}
                            </div>
                        )}
                        {changeInput ? (
                            <p
                                onClick={HandleChangeInput}
                                className="text-right mb-4 text-[#117DD5] cursor-pointer font-seri font-semibold  md734:text-center md734:ml-60    text-sm select-none my-2"
                            >
                                Use Phone Number instead
                            </p>
                        ) : (
                            <p
                                onClick={HandleChangeInput}
                                className="text-right mb-4 text-[#117DD5] cursor-pointer font-seri font-semibold  md734:text-center md734:ml-60    text-sm select-none my-2"
                            >
                                Use Email address instead
                            </p>
                        )}
                        <button className="block mx-auto my-0 mt-4 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none">
                            Submit
                        </button>
                    </section>
                    {/* End of logo */}
                </section>
            </main>
        </>
    );
}
