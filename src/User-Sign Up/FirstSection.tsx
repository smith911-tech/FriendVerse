import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ChangeEvent, useState } from "react";
interface Props {
    fullName: string;
    setFullName: any;
    email: string;
    setEmail: any;
    password: string;
    setPassword: any;
    handleNextSection: () => void;
    phoneNumber: string | undefined;
    setPhonenumber: any;
}
export default function FirstSection({
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    handleNextSection,
    setPhonenumber,
}: Props): JSX.Element {
    // ! change input between email and phone number
    const [changeInput, setChangeInput] = useState<boolean>(true);
    const HandleChangeInput = () => {
        setChangeInput(!changeInput);
    };

    // ! show password
    const [showPassword, setShowpassword] = useState<boolean>(false);
    const HandleShowpassword = () => {
        setShowpassword(!showPassword);
    };
    return (
        <section className="flex flex-col mt-8 ">
            <input
                type="text"
                className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1"
                value={fullName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFullName(e.target.value)
                }
                placeholder="Full name"
            />
            <br />
            {changeInput ? (
                <input
                    type="email"
                    className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1"
                    value={email}
                    placeholder="Email address"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                />
            ) : (
                <div className="inputDrowndopDiv  w-full block mx-auto my-0 md734:w-[450px]   mb-1">
                    {/* phone number drop down input */}
                    <PhoneInput
                        international
                        className="lg1280:h-11"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={setPhonenumber}
                        maxLength={16}
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
            <div className="flex relative md734:w-[450px]  left-1/2 transform -translate-x-1/2 ">
                <input
                    type={showPassword ? "text" : "password"}
                    name=""
                    placeholder="Create Password"
                    className="w-full bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 "
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
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
            <button
                onClick={handleNextSection}
                className="block mx-auto my-0 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none"
            >
                Next
            </button>
        </section>
    );
}
