import { useEffect, useState } from "react";
import Leftsidebar from "./Leftsidebar";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import Rightsidebar from "./Rightsidebar";
import Header from "./Header";
import ButtomNav from "./ButtomNav";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase-config'
export default function HomePage() {
    // ! toggle profile on mobile screen
    const [Toggle, setToggle] = useState<boolean>(false)
    const handleToggle = () => {
        setToggle(!Toggle)
        handleToggle()
    }
    const navigate = useNavigate();
    useEffect(() => {
        let userid = sessionStorage.getItem('UserId')
        if (userid) {
            navigate("/Home")
        }
        else if (!userid) {
            navigate('/')
        }
    }, [])
    

    // ! fetching personal userdata 
    const [userData, setUserData] = useState<any>(null);

    // ! data fetched
    const fetchData = async () => {
        try {
            let userid = sessionStorage.getItem("UserId");
            const docRef = doc(db, "users", userid as string);
            const snapshot = await getDoc(docRef);
            console.log(userData)
            if (snapshot.exists()) {
                setUserData(snapshot.data());
                console.log(userData)
            } else {
                console.log("No matching document");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    //! states
    const [SuggestData, setSuggestData] = useState<any[]>([]);

    // !suggestions user data
    const fetchUsers = async () => {
        await getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setSuggestData(newData);
                console.log(SuggestData);
            });
    };
    useEffect(() => {
        fetchUsers();
        fetchData();
    }, []);

    // ! Opening the post div
    const [isInputClicked, setInputClicked] = useState(false);
    const handleInputClick = () => {
        setInputClicked(true);
    };

    const handleBodyClick = () => {
        setInputClicked(false);
    };
    

    return (
        <main className="relative">
            <header onClick={handleBodyClick} className={`${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}>
        <Header userData={userData} />
            </header>
            
            <article className={` flex justify-between gap-[1%] sm650:px-3 pt-[70px] ${isInputClicked ? " bg-[#000000ca]" : "bg-[#f0f2f5]"}`}>
            <section
                    onClick={handleBodyClick}
                    className={`pt-2 w-[5%] h-screen sticky top-[70px] md970:w-[25%] sm650:hidden ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}
            >
                    <Leftsidebar 
                    userData={userData} 
                    SuggestData={SuggestData} />
            </section>
            <section
                    className=" w-[95%] mt-4 rounded-2xl  md800:w-[60%] sm650:w-[100%] ">
                    <Content 
                    userData={userData}
                    handleBodyClick={handleBodyClick} 
                    handleInputClick={handleInputClick}
                    isInputClicked={isInputClicked}
                    />
            </section>
            <section 
                    onClick={handleBodyClick}
                    className={`pt-2 lg1150:w-[25%]  h-screen sticky top-[70px] w-[5%] sm650:hidden ${isInputClicked ? " brightness-[0.2]" : " brightness-100"}`}>
                    <Rightsidebar 
                    fetchUsers={fetchUsers} 
                    SuggestData={SuggestData}
                    userData={userData}
                    />
            </section>
        </article>
        <ButtomNav />
        </main>
    )
}
