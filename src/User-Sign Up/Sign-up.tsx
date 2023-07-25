import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import MenuSection from "./MenuSection";
import { FilldetailsError, SuccessLoginM } from "../Error-SuccessM";
import { ColorRing } from "react-loader-spinner";
import { doc,  setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Signup() {
    // ! error message
    const [error, setError] = useState<string | boolean>(false);

    // ! Sucess message
    const [successFul, setSuccessful] = useState<string | boolean>(false);

    // ! Input value
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [userName, setUsername] = useState<string>("");

    // ! email validation 
    const isValidEmail = (email: string): boolean => {
        const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // ! Submit preloader state      
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();

    //! Section change state && function
    const [section, setSection] = useState(1);
    

    // ! next section handle
    const handleNextSection = () => {
        switch (section) {
            case 1:
                if (fullName !== "" && password.length > 7 && (isValidEmail(email))) {
                    setSection(section + 1);
                } else if (fullName === "" || email === "" || (!isValidEmail(email))) {
                    setError("Please fill in all input");
                } else if (password.length < 7) {
                    setError("Password must be at least 7 characters long");
                }
                break;
            case 2:
                if (dateOfBirth !== "") {
                    setSection(section + 1);
                    generateUsername();
                } else {
                    setError("Please fill in all input");
                }
                break;
            default:
                break;
        }
        setTimeout(() => {
            setError(false);
        }, 3500);
    };

    // ! previous section handle
    const handlePreviousSection = () => {
        setSection(section - 1);
    };

    // ! Generating a userName
    const generateUsername = () => {
        const firstName = fullName.split(" ")[0];
        const generatedUsername = `@${firstName.toLowerCase()}`;
        const randomNumber = Math.floor(Math.random() * 100);
        const finalUsername = `${generatedUsername}${randomNumber}`;
        setUsername(finalUsername);
        console.log(userName);
    };

    const handlesubmit = () => {
        setLoader(true);
        const authentication = auth;
        createUserWithEmailAndPassword(authentication, email, password)
            .then(async (response) => {
                console.log(response);
                setSuccessful("Login successful");
                const userid = response.user.uid;
                sessionStorage.setItem("UserId", userid);
                setTimeout(() => {
                    navigate("/Home");
                }, 1000);
                try {
                    await setDoc(doc(db, "users", userid), {
                        fullName: fullName,
                        username: userName,
                        email: email,
                        dateOfBirth: dateOfBirth,
                        profileImage : "",
                        bio: "Hey, i'm new at Friend Verse",
                        coverImage: "",
                        Location : ""
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setError("Email already exist");
                }
                setLoader(false);
                setTimeout(() => {
                    setError(false);
                }, 3500);
            });
    };

    return (
        <main className="bg-[#1B1D21] h-[120vh] px-[29px] py-[61px] relative text-white w-full">
            <section className="bg-[black]  px-4 pb-28 sm500:w-[450px] block mx-auto my-0 md734:w-[680px] md734:pb-36 relative changePageanimation">
                <MenuSection section={section} />
                {/* first section */}
                {section === 1 && (
                    <FirstSection
                        fullName={fullName}
                        setFullName={setFullName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
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
                    <ThirdSection isChecked={isChecked} setIsChecked={setIsChecked} />
                )}
                {/* Buttons */}
                <div
                    className={`flex justify-between ${section === 2 ? "pb-24" : "pb-0"}`}
                >
                    <button
                        disabled={section === 1}
                        onClick={handlePreviousSection}
                        className={`block mx-auto my-0 py-2  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none ${section === 1 ? "bg-[#d9d9d952]" : "bg-[#D9D9D9]"
                            } ${section === 3 ? "px-12" : "px-10"}`}
                    >
                        Prev
                    </button>
                    {section !== 3 ? (
                        <button
                            onClick={handleNextSection}
                            className="block mx-auto my-0 py-2 px-10  text-white bg-[#117DD5] rounded-[30px] font-sans font-bold select-none"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            disabled={!isChecked}
                            onClick={handlesubmit}
                            className={`block mx-auto my-0 py-2 px-10  text-white  rounded-[30px] font-sans font-bold select-none ${isChecked ? "bg-[#117DD5]" : "bg-[#117dd554]"
                                }`}
                        >
                            {loader ? (
                                <ColorRing
                                    visible={true}
                                    height="25"
                                    width="45"
                                    colors={[
                                        "#FFFFFF",
                                        "#F0F0F0",
                                        "#FFD700",
                                        "#E84118",
                                        "#00FF00",
                                    ]}
                                />
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    )}
                </div>
                {error && <FilldetailsError error={error} />}
                {successFul && <SuccessLoginM successFul={successFul} />}
            </section>
        </main>
    );
}
