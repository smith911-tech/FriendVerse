interface userDats{
    SuggestData : any
}
import { collection, onSnapshot } from "firebase/firestore"
import { db } from '../firebase-config'
import {useState, useEffect} from 'react'
import { useThemeStore } from '../Zustand'

export default function Poststion({SuggestData}: userDats) {
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    //! states
    const [Posts, setPosts] = useState<any[]>([]);

    // !suggestions user data
    useEffect(() => {
        const handleSnapshot = (snapshot: any) => {
            const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setPosts(data);
        };
        const unsubscribe = onSnapshot(collection(db, "posts"), handleSnapshot);
        return () => {
            unsubscribe();
        };
    }, []);
    return(
        <main>
            <section className={`
            ${theme ? "" : "" }`}>
            </section>
        </main>
    )
}