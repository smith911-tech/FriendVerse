import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase-config'
import { GoAlertFill } from "react-icons/go";
import { BiSolidUserCircle } from "react-icons/bi";
import VerfiyId from "../Verify";
export default function SideDashboard() {
    const [SuggestData, setSuggestData] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const fetchUser = async () => {
        await getDocs(collection(db, "users"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                setSuggestData(newData);
                console.log(SuggestData);
            });
    };
    console.log(SuggestData)
    useEffect(() => {
        fetchUser();
    }, [])

    function getSuggestions() {
        const regex = new RegExp(`${searchTerm}`, "i");
        return SuggestData.filter((data: any) => regex.test(data.fullName || data.username)).slice(0, 5);
    }
    return (
        <main className="lg1150:block hidden px-1 pt-10 ">
            <section className="bg-[white]  px-2 py-2 shadow-2xl relative mb-14">
                <div className="flex relative">
                    <input type="text"
                        className="w-full py-2 pl-10 pr-1  outline-[#117DD5] border rounded-2xl  border-solid bg-[#eff3f4]" placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className='text-xl cursor-pointer absolute top-[10px] left-3'><CiSearch /></div>
                </div>
                {searchTerm && (
                    <div className={`absolute bg-white w-full   shadow-xl z-10 -ml-2 overflow-y-auto overflow-x-hidden ${getSuggestions().length === 0 ? " h-[inherit] " : "h-44 "}`}>
                        {getSuggestions().length === 0 ? (
                            <button className="ml-2 py-3 w-full font-semibold flex justify-center gap-2">
                                <span className=" text-2xl text-red-600"><GoAlertFill /></span>
                                <h2>User doesn't exist</h2>
                            </button>
                        ) : (
                            getSuggestions().map((data) => (
                                <button
                                    className="cursor-pointer w-full select-none flex  my-4 ml-1 rounded-2xl hover:bg-[#e1e6e7] gap-2"
                                    key={data.id}>
                                        <div>
                                        {data.profileImage === "" ? (
                                            <div className='text-[48px]   rounded-full text-[#000000d7]'>
                                                <BiSolidUserCircle />
                                            </div>
                                        ) : (
                                            <img
                                                src={data.profileImage}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full   object-contain   "
                                            />
                                        )}
                                        </div>
                                        <div>
                                        <p 
                                        className="text-left font-semibold">{data.fullName}</p>
                                        <p 
                                        className="text-sm text-left text-[#000000a9]">{data.username}</p>
                                        </div>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </section>
            <VerfiyId />
        </main>
    )
}