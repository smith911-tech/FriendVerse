// @ts-ignore
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {useState, useEffect} from 'react'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import {db } from '../firebase-config'
export default function ProfileProgress() {
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

    useEffect(() => {
        fetchData();
    }, []);

    let percentage = 0;
    if (userData) {
        if (userData.profileImage) {
            percentage += 25;
        }

        if (userData.coverImage) {
            percentage += 25;
        }

        if (userData.Location) {
            percentage += 25;
        }

        if (userData.bio) {
            percentage += 25;
        }
    }



    return (
        <div className=' rounded-lg shadow-lg p-4 select-none mb-8 bg-white progress'>
            <h2 className=' text-lg font-semibold mb-2'>Complete your Profile</h2>
            <Progress
                type="circle"
                percent={percentage}
                theme={{
                    success: {
                        symbol: '🏄‍',
                        color: '#328fdb'
                    }
                }}
            />
            <section className='flex flex-col gap-2 font-bold text-[#000000b6]'>

                <div className='flex justify-between'>
                    <section className='flex gap-1'>
                        <span className={`font-bold text-xl ${userData && userData.profileImage ? 'text-[#117dd5]'
                            : 'text-[#000000b6]'}`}>
                        <MdOutlineVerifiedUser />
                    </span>
                        <p>Profile Photo</p>
                    </section>
                    <p className={`${userData && userData.profileImage ? 'text-[#117dd5]'
                        : 'text-[#000000b6]'}`}>{userData && userData.profileImage ? '1/1' : '0/1'}</p>
                </div>

                <div className='flex  justify-between'>
                    <section className='flex gap-1'>
                        <span className={`font-bold text-xl ${userData && userData.coverImage ? 'text-[#117dd5]'
                            : 'text-[#000000b6]'}`}>
                            <MdOutlineVerifiedUser />
                        </span>
                        <p>Cover Photo</p>
                    </section>
                    <p className={`${userData && userData.coverImage ? 'text-[#117dd5]'
                        : 'text-[#000000b6]'}`}>
                            {userData && userData.coverImage ? '1/1' : '0/1'}</p>
                </div>

                <div className='flex  justify-between'>
                    <section className='flex gap-1'>
                        <span className={`font-bold text-xl ${userData && userData.Location ? 'text-[#117dd5]' 
                        : 'text-[#000000b6]'}`}>
                            <MdOutlineVerifiedUser />
                        </span>
                        <p>Location</p>
                    </section>
                    <p className={`${userData && userData.Location ? 'text-[#117dd5]'
                        : 'text-[#000000b6]'}`}>
                            {userData && userData.Location ? '1/1' : '0/1'}</p>
                </div>

                <div className='flex justify-between'>
                    <section className='flex gap-1'>
                        <span className={`font-bold text-xl ${userData && userData.bio ? 'text-[#117dd5]' : 'text-[#000000b6]'}`}>
                            <MdOutlineVerifiedUser />
                        </span>

                        <p>Bio</p>
                    </section>
                    <p className={`${userData && userData.bio ? 'text-[#117dd5]'
                        : 'text-[#000000b6]'}`}>
                        {userData && userData.bio ? '1/1' : '0/1'}
                        </p>
                </div>

            </section>
        </div>
    )
}