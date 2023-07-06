import { useNavigate } from "react-router-dom";
import {  useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase-config'
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import MenuSection from "./MenuSection";
import {FilldetailsError, SuccessLoginM}  from "../Error-SuccessM";

export default function Signup() {
    // ! error message
    const [error, setError] = useState<string | boolean>(false)

    // ! Sucess message 
    const [successFul, setSucessfull] = useState<string | boolean>(false)


    // ! Input value 
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phoneNumber, setPhonenumber] = useState<string | undefined>()
    const [dateOfBirth, setDateOfBirth] = useState<string>("")
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const navigate = useNavigate();

    //! Section change state && function
    const [section, setSection] = useState(1);

    // ! next section handle
    const handleNextSection = () => {
        if (
        (section === 1 && fullName !== "" && password.length > 7 && 
        (changeInput ? email !== "" : phoneNumber !== "") ) || 
        (section === 2 && dateOfBirth !== "") || 
        (section === 3 &&  isChecked)
        ){
            setSection(section + 1);
        }
        else if ((section === 1 || fullName === "" || password === "" || 
            (changeInput ? email === "" : phoneNumber === ""))){
            setError("Please fill in all input ")
            setTimeout(() => {
                setError(false);
            }, 3500);
        }
        else if((section === 2 && dateOfBirth === "")){
            setError("Please fill in all input ")
            setTimeout(() => {
                setError(false);
            }, 3500);
        }
    };
    // ! previous section handle
    const handlePreviousSection = () => {
        setSection(section - 1);
    };

    // ! change input between email and phone number
    const [changeInput, setChangeInput] = useState<boolean>(() => {
        const storedValue = localStorage.getItem('EmailPasswordstate');
        return storedValue ? JSON.parse(storedValue) : true;
    });

    //! Update local storage whenever the state changes
    useEffect(() => {
        localStorage.setItem('EmailPasswordstate', JSON.stringify(changeInput));
    }, [changeInput]);

    //! Function to toggle the boolean state
    const HandleChangeInput = () => {
        setChangeInput(prevState => !prevState);
    };

    const handlesubmit = (id: string) => {
        console.log(id)
        const authentication = auth;
        if (id) {
            createUserWithEmailAndPassword(authentication, email, password)
                .then((response) => {
                    sessionStorage.setItem('AuthToken', response.user.refreshToken);
                    sessionStorage.setItem("fullName", fullName)
                    console.log(response)
                    setSucessfull("Login sucessfull")
                    setTimeout(() => {
                        navigate("/Homepage")
                        setSucessfull(false)
                    }, 3000)
                })
                .catch((error) => {
                    const errormessga = error.message
                    setError(errormessga)
                    setTimeout(() => {
                        setError(false);
                    }, 3500);
        });
        }
    }

    return (
        <main className="bg-[#1B1D21] h-[120vh] px-[29px] py-[61px] relative text-white w-full">
            <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[680px] md734:pb-36 relative changePageanimation">
                <MenuSection section={section}/>
                {/* first section */}
                {section === 1 && (
                    <FirstSection 
                    fullName={fullName}
                    setFullName={setFullName}
                    email= {email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    phoneNumber={phoneNumber}
                    setPhonenumber={setPhonenumber}
                    changeInput ={changeInput}
                    HandleChangeInput={HandleChangeInput}
                    />
                )}
                {/*end of first section */}
                {section === 2 && (
                <SecondSection 
                    dataOfBirth={dateOfBirth}
                    setDateOfBirth={setDateOfBirth} 
                    />
                )}
                {section === 3 && (
                    <ThirdSection 
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    />
                )}
                {/* Buttons */}
                <div className={`flex justify-between ${section === 2 ? "pb-24" : "pb-0"}`}>
                    <button
                    disabled={section === 1}
                        onClick={handlePreviousSection}
                        className={`block mx-auto my-0 py-2  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none ${section === 1 ? "bg-[#d9d9d952]" : "bg-[#D9D9D9]"} ${section === 3 ? "px-12" : "px-10"}`}
                    >
                        Prev
                    </button>
                    {section !== 3 ?(
                        <button
                            onClick={handleNextSection}
                            className="block mx-auto my-0 py-2 px-10  text-white bg-[#117DD5] rounded-[30px] font-sans font-bold select-none"
                        >
                            Next
                        </button>
                    ) : (
                            <button
                            disabled={!isChecked}
                           onClick = {() => handlesubmit("successFul")}
                                className={`block mx-auto my-0 py-2 px-10  text-white  rounded-[30px] font-sans font-bold select-none ${isChecked ? "bg-[#117DD5]" : "bg-[#117dd554]"}`}
                            >
                                Submit
                            </button>
                    )}
                </div>
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
