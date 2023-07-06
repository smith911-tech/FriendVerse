import { useNavigate } from "react-router-dom";
import {  useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase-config'
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import MenuSection from "./MenuSection";

export default function Signup() {
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
        (section === 1 && fullName !== "" && password !== "" && (changeInput ? email !== "" : phoneNumber !== "") ) || 
        (section === 2 && dateOfBirth != "") || 
        (section === 3 &&  isChecked)
        ) 
        {
            setSection(section + 1);
        }
    };
    // ! previous section handle
    const handlePreviousSection = () => {
        setSection(section - 1);
    };

    // ! error
    // const [error, setError] = useState("");

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
                    navigate("/Homepage")
                })
                .catch((error) => {
                    console.log(error);
        });
        }
    }

    return (
        <main className="bg-[#1B1D21] h-[120vh] px-[29px] py-[61px] relative text-white w-full">
            <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[700px] md734:pb-36 relative changePageanimation">
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
                    handleNextSection={handleNextSection}
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
                    handleNextSection={handleNextSection} 
                    handlePreviousSection={handlePreviousSection}
                    />
                )}
                {section === 3 && (
                    <ThirdSection 
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    handlesubmit={handlesubmit} 
                    handlePreviousSection={handlePreviousSection}
                    />
                )}
            </section>
        </main>
    );
}
