import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtomNav from "../GeneralComponent/ButtomNav";
import { collection,  onSnapshot } from "firebase/firestore"
import { db } from '../firebase-config'
import UserSearchData from "./UserSearchData";
import {useThemeStore} from '../Zustand';
export default function UserSearch() {
    const navigate = useNavigate();
    let userid = sessionStorage.getItem('UserId')
    useEffect(() => {
        if (userid) {
            navigate("/UserSearch")
        }
        else if (!userid) {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth > 650) {
                navigate("/Home")
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
        setInputClicked(!isInputClicked);
    };

    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);


    return (
        <main className={`relative h-screen ${theme ? "bg-[#1b1d21]" : "bg-[#f0f2f5]"}`}>
            <UserSearchData SuggestData={SuggestData} />
            <footer onClick={handleBodyClick} >
                <ButtomNav />
            </footer>
        </main>
    )
}
