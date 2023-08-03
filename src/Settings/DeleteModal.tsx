interface userdats{
    setShowDeleteModal: any
}
import { auth } from "../firebase-config"
import { deleteUser } from "firebase/auth"
export default function DeleteModal({ setShowDeleteModal }: userdats){

    const handleDelete = async () => {
        const user = auth.currentUser;

        try {
            if (user) {
                await deleteUser(user); 
                console.log("delected")
            } else {
                // Handle the case when the user is not authenticated or not found.
                console.error('User not found or not authenticated.');
            }
        } catch (error) {
            // An error occurred during user deletion.
            console.error('Error deleting the user:', error);
            // You can add additional error handling here if needed.
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