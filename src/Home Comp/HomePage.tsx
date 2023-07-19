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


    return (
        <main className="relative">
        <Header />
            
            <article className="bg-[#f0f2f5] flex justify-between gap-[1%] sm650:px-3">
            <section
                    className="pt-2 w-[5%] h-screen sticky top-[40px] md970:w-[25%] sm650:hidden"
            >
                    <Leftsidebar userData={userData} SuggestData={SuggestData}/>
            </section>
            <section
                    className=" w-[95%] mt-10 rounded-2xl  md800:w-[60%] sm650:w-[100%] bg-white">
                <Content />
            </section>
            <section
                    className="pt-2 lg1150:w-[25%]  h-screen sticky top-[40px] w-[5%] sm650:hidden">
                <Rightsidebar />
            </section>
        </article>
        <ButtomNav />
        </main>
    )
}
