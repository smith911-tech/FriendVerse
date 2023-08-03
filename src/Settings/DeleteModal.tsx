interface userdats{
    setShowDeleteModal: any
}
import { auth } from "../firebase-config"
import { db, storage } from '../firebase-config';
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth"
import { useNavigate } from "react-router-dom";
export default function DeleteModal({ setShowDeleteModal }: userdats){
    const navigate = useNavigate()
    let userid = sessionStorage.getItem('UserId')
    const handleDelete = async () => {
        const user = auth.currentUser;
        try {
            if (user && userid) {
                await deleteDoc(doc(db, "users", userid));
                await deleteUser(user); 
                sessionStorage.removeItem("UserId")
                navigate("/")
            }
        } catch (error) {
            console.log('Error deleting the user:', error);
        }
    };
    return(
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-lg w-[400px] select-none">
                    <h2 className="text-xl font-bold mb-4">Confirm Account Deletion</h2>
                    <p className="mb-4">Are you sure you want to delete your account?</p>
                    <div className="flex justify-between">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        onClick={handleDelete}>
                            Yes, Delete
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}