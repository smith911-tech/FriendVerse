import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rightsidebar from "../Rightsidebar";
import Header from "../Header";
import ButtomNav from "../ButtomNav";
import { collection, doc,  onSnapshot } from "firebase/firestore"
import { db } from "../../firebase-config"
import ProfileLeftbar from "./LeftsidebarProfile";
import ProfileInterface from "./ProfileInterface";
export default function userPersonalProfile() {
    // ! toggle profile on mobile screen
    const [Toggle, setToggle] = useState<boolean>(false)
    const handleToggle = () => {
        setToggle(!Toggle)
        handleToggle()
    }
    const navigate = useNavigate();
    let userid = sessionStorage.getItem('UserId')
    useEffect(() => {
        if (userid) {
            navigate("/Profile")
        }
        else if (!userid) {
            navigate('/')
        }
    }, [])


    // ! fetching personal userdata 
    const [userData, setUserData] = useState<any>(null);

    // ! data fetched

    useEffect(() => {
        if (userid) {
            const userRef = doc(collection(db, "users"), userid as string);
            const handleSnapshot = (snapshot: { exists: () => any; data: () => any; }) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setUserData(data); 
                } else {
                    setUserData(null); 
                }
            };
            const unsubscribe = onSnapshot(userRef, handleSnapshot);
            return () => {
                unsubscribe();
            };
        }
    }, []);


    //! states
    const [SuggestData, setSuggestData] = useState<any[]>([]);

    // !suggestions user data
    useEffect(() => {
        const handleSnapshot = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setSuggestData(data);
        };
        const unsubscribe = onSnapshot(collection(db, "users"), handleSnapshot);
        return () => {
            unsubscribe();
        };
    }, []);


    // ! Opening the post div
    const [isInputClicked, setInputClicked] = useState(false);

    const handleBodyClick = () => {
        setInputClicked(false);
    };
    const handleInputClick = () => {
        setInputClicked(true);
    };



    return (
        <main className="relative">
            <header onClick={handleBodyClick} className={`fixed  top-0 w-full z-10  ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}>
                <Header userData={userData} />
            </header>

            <article className={` flex justify-between gap-[1%] sm650:px-3 pt-[70px] ${isInputClicked ? " bg-[#000000ca]" : "bg-[#f0f2f5]"}`}>
                <section
                    onClick={handleBodyClick}
                    className={`pt-2 w-[5%] h-screen sticky top-[70px] md970:w-[25%] sm650:hidden ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}
                >
                    <ProfileLeftbar
                        SuggestData={SuggestData} />
                </section>
                <section
                    className=" w-[95%] mt-4 rounded-2xl  md800:w-[60%] sm650:w-[100%] smm500:mt-0">
                    <ProfileInterface 
                    userData={userData} 
                    handleInputClick={handleInputClick}
                    isInputClicked={isInputClicked}
                    handleBodyClick={handleBodyClick}
                    />
                </section>
                <section
                    onClick={handleBodyClick}
                    className={`pt-2 lg1150:w-[25%]  h-screen sticky top-[70px] w-[5%] sm650:hidden ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}>
                    <Rightsidebar
                        SuggestData={SuggestData}
                        userData={userData}
                    />
                </section>
            </article>
            <ButtomNav />
        </main>
    )
}
