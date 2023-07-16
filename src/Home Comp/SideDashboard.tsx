import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function SideDashboard() {
    const [userData, setUserData] = useState<any>(null);

    const fetchData = async () => {
        try {
            let userid = sessionStorage.getItem("UserId");
            const docRef = doc(db, "users", userid as string);
            const snapshot = await getDoc(docRef);
            console.log(userData)
            if (snapshot.exists()) {
                setUserData(snapshot.data());
            } else {
                console.log("No matching document");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <main className="lg:w-1150px hidden"></main>;
}
