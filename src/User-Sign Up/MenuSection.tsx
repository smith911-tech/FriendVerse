import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import {FaXmark} from "react-icons/fa6"
interface Props {
    section: number
}
export default function MenuSection({
    section
}: Props): JSX.Element {
    const navigate = useNavigate();
    const BackToSignup = () => {
        navigate("/");
    };

    return (
    <>
            <div className="absolute text-2xl top-3 cursor-pointer"
            onClick={BackToSignup}>
        <FaXmark />
        </div>
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
                <span
                    className={`py-[2.5px] w-[70px] md734:w-[90px] rounded-md ${section === 1 ? "bg-[#117DD5]" : "bg-[rgba(255,255,255,0.51)]"
                        } `}
                ></span>
                <span
                    className={`py-[2.5px] w-[70px] md734:w-[90px] rounded-md ${section === 2 ? "bg-[#117DD5]" : "bg-[rgba(255,255,255,0.51)]"
                        } `}
                ></span>
                <span
                    className={` py-[2.5px] w-[70px] md734:w-[90px] rounded-md ${section === 3 ? "bg-[#117DD5]" : "bg-[rgba(255,255,255,0.51)]"
                        }`}
                ></span>
            </div>
    </>
    )
}