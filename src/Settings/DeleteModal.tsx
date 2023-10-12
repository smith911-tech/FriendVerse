interface Props {
  setShowDeleteModal: any;
}
import { auth } from "../firebase-config";
import { db } from "../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FilldetailsError } from "../Error-SuccessM";
import { useState } from "react";
import { useThemeStore } from "../Zustand";
export default function DeleteModal({ setShowDeleteModal }: Props) {
  // ! error message
  const [error, setError] = useState<string | boolean>(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("Try again later");
        setTimeout(() => {
          setError(false);
        }, 2000);
        return;
      }
      // Retrieve the userid from sessionStorage
      let userid = sessionStorage.getItem("UserId");
      if (!userid) {
        console.log("UserId is not set in sessionStorage.");
        return;
      }

      // Delete the user document from Firestore using userid
      const userDocRef = doc(db, "users", userid);
      await deleteDoc(userDocRef);

      // Delete the user from Firebase Authentication
      await deleteUser(user);

      // Remove the userid from sessionStorage
      auth.signOut();
      sessionStorage.removeItem("UserId");

      // Navigate to the desired location (e.g., "/")
      navigate("/");

      console.log("Deletion process completed successfully.");
    } catch (error) {
      setError("Error deleting the user");
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  const theme = useThemeStore((state: any) => state.theme);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          theme ? "bg-black bg-opacity-50" : "bg-white bg-opacity-50"
        } z-50`}
      >
        <div
          className={`${
            theme ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg w-[400px] select-none`}
        >
          <h2
            className={`${
              theme ? "text-white" : "text-black"
            } text-xl font-bold mb-4`}
          >
            Confirm Account Deletion
          </h2>
          <p className={`${theme ? "text-white" : "text-black"} mb-4`}>
            Are you sure you want to delete your account?
          </p>
          <div className="flex justify-between">
            <button
              className={`${
                theme ? "bg-red-500" : "bg-red-500"
              } text-white px-4 py-2 rounded-lg`}
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
            <button
              className={`${theme ? "bg-gray-700" : "bg-gray-300"} ${
                theme ? "text-white" : "text-gray-700"
              } px-4 py-2 rounded-lg`}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
        {error && <FilldetailsError error={error} />}
      </div>
    </>
  );
}
