interface userdatas {
    SuggestData : any,
    userData : any
}
import { CiSearch } from "react-icons/ci";
import { useState} from "react";
import { GoAlertFill } from "react-icons/go";
import { BiSolidUserCircle } from "react-icons/bi";
import VerfiyId from "../Home Comp/VerifyBox";
import ProfileProgress from "../Home Comp/ProfileProgress";
import { useNavigate } from "react-router-dom";
export default function SideDashboard({ SuggestData, userData }: userdatas):JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate(`/ViewOtherUsers`)
    }


    function getSuggestions() {
        const regex = new RegExp(`${searchTerm}`, "i");
        return SuggestData.filter((data: any) => regex.test(data.fullName || data.username)).slice(0, 5);
    }
    let userid = sessionStorage.getItem('UserId')
    return (
        <main className="lg1150:block hidden px-1 pt-2 ">
            <section className="bg-[white]  px-2 py-2 shadow relative mb-8">
                <div className="flex relative">
                    <input type="text"
                        className="w-full py-2 pl-10 pr-1  outline-[#117DD5] border rounded-2xl  border-solid bg-[#eff3f4]" placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className='text-xl cursor-pointer absolute top-[10px] left-3'><CiSearch /></div>
                </div>
                {searchTerm && (
                    <div className={`absolute bg-white w-full   shadow z-10 -ml-2 overflow-y-auto overflow-x-hidden ${getSuggestions().length === 0 ? " h-[inherit] " : "h-44 "}`}>
                        {getSuggestions().length === 0 ? (
                            <button className="ml-2 py-3 w-full font-semibold flex justify-center gap-2">
                                <span className=" text-2xl text-red-600"><GoAlertFill /></span>
                                <h2>User doesn't exist</h2>
                            </button>
                        ) : (
                                getSuggestions().filter((data: any) => data.id !== userid).map((data : any) => (
                                
                                <button
                                    className="cursor-pointer w-full select-none flex  my-4 ml-1 rounded-2xl hover:bg-[#e1e6e7] gap-2"
                                        onClick={() => {
                                            handleNavigate()
                                        }}
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
                                        className="text-sm text-left text-[#000000a9]"><span className='select-none'>@</span>{data.username}</p>
                                        </div>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </section>
            <VerfiyId />
            <ProfileProgress userData={userData}/>
        </main>
    )
}