import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import defaultcoverimg from '../assets/DefalutCoverImg.jpg'
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "../LoadingCard";
export default function Dashboard() {
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

    return (
        <main className="md970:block hidden font-Inter pt-4 px-2">
            {userData  ? (
                <section className="w-full flex flex-col justify-center">
                    <div className="bg-white rounded-lg shadow-2xl p-1">
                        <div className="relative">
                            {userData.coverImage === "" ? (
                                <img
                                    src={defaultcoverimg}
                                    alt="Cover"
                                    className="w-full rounded-t-lg h-32 object-cover"
                                />
                            ) : (
                                <img
                                    src={userData.coverImage}
                                    alt="Cover"
                                    className="w-full rounded-t-lg h-32 object-cover"
                                />
                            )}
                            {userData.profileImage === "" ? (
                                <div className='text-[48px] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-full bg-white text-[#000000d7]'>
                                    <BiSolidUserCircle />
                                </div>
                            ) : (
                                <img
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white object-contain bg-white"
                                />
                            )}
                        </div>
                        <div className="mt-8 text-center font-medium mb-5">
                            <h2 className="pb-1">{userData.fullName}</h2>

                            {userData.bio === "" ? (
                                <h2 className="text-xs text-[#000000a5]">Hey, i'm new at Friend Verse</h2>
                            ) : (
                                <h2 className="text-xs text-[#000000a5]">{userData.bio}</h2>
                            )}
                        </div>
                        <div className="mb-5">
                            <h2 className="text-center font-medium text-[#000000a5]">Following</h2>
                            <p className="text-center font-medium">10</p>
                        </div>
                        <div className="mb-5">
                            <h2 className="text-center font-medium text-[#000000a5]">Followers</h2>
                            <p className="text-center font-medium">33</p>
                        </div>
                        <h2 className="text-[#117DD5] text-center font-bold mb-2">View profile</h2>
                    </div>
                </section>
            ) : (
                <SmallCard />
            )}
        </main>
    )
}