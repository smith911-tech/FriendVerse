import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import "react-phone-number-input/style.css";
import { FaXmark } from "react-icons/fa6"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FilldetailsError, SuccessLoginM } from "../Error-SuccessM";
export default function Forgetpasword() {
    //! back to signin page function
    const navigate = useNavigate();
    const BackToSignup = () => {
        navigate("/");
    };
    // ! error message
    const [error, setError] = useState<string | boolean>(false)

    // ! Sucess message 
    const [successFul, setSuccessful] = useState<string | boolean>(false)

    //! input state
    const [email, setEmail] = useState<string>("")
    const handleReset = async (e: any) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessful('Please check your email.');

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                setError('User not found');
            }
            if (error.code === 'auth/too-many-requests') {
                setError('To many resquest');
            }
            if (error.code === 'auth/network-request-failed') {
                setError('Network error');
            }
            setTimeout(() => {
                setError(false);
            }, 2000);
            
        }
    }

    return (
            <main className="bg-[#1B1D21] h-[100vh] px-[29px] py-[61px] text-white w-full relative" >
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
                    <form onSubmit={handleReset}>
                            <input
                                type="email"
                                className="bg-transparent border border-solid border-[#ffffffd5] h-10 px-4 w-full block mx-auto my-0 md734:w-[450px]  lg1280:h-11 mb-1 "
                                placeholder="Email address"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                            />
                        <button className="block mx-auto my-0 mt-6 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none">
                            Submit
                        </button>
                    </form>
                    {/* End of logo */}
                {error && <FilldetailsError
                    error={error}
                />}
                {successFul && <SuccessLoginM
                    successFul={successFul}
                />}
                </section>
            </main>
    );
}
