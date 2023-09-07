interface Props{
    userData: any
    setSuccessful: any
    setError: any
}
import {useThemeStore} from '../Zustand';
import { db } from '../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
export default function VerfiyId({ userData, setSuccessful, setError }:Props) {
    // ! Theme 
    const theme = useThemeStore((state: any) => state.theme);
    let userid = sessionStorage.getItem('UserId')

    const handleVerify = async (_e: any) => {
        const DataDocRef = doc(db, "users", userid as string);
        if (userData && userData.Verify){
            setSuccessful("Verified Already");
        }
        else if (userData && userData.bio && userData.Location && userData.coverImage && userData.profileImage !== "") {
            try {
                await updateDoc(DataDocRef, {
                    Verify: true
                });
                setSuccessful("Verified Successfully");
            } catch (error) {
                console.log(error);
            }
        } else if (userData && userData.bio || userData.Location || userData.coverImage || userData.profileImage === "") {
            try {
                await updateDoc(DataDocRef, {
                    Verify: false
                });
                setError("Complete Profile");
            } catch (error) {
                console.log(error);
            }
        }
        setTimeout(() => {
            setSuccessful(false);
            setError(false)
        }, 2000);
    };



    return(
        <div className={`rounded-lg shadow p-4 select-none mb-8 ${theme ? "bg-black text-[#ffffffe0]" : "bg-blue-200 text-black"}`}>
            <h2 className="text-2xl font-bold mb-2">Get Verified</h2>
            <p className={`text-base ${theme ? "text-[#ffffffc4]" : "text-gray-800"}`}>Verify Identity to get a blue tick</p>
            <button onClick={handleVerify} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4">
                {userData && userData.Verify ? "Verified" : "Get Verified"}
            </button>
        </div>
    )
}
