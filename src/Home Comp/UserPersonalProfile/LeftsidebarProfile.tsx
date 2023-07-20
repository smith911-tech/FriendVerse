interface userdatas {
    SuggestData: any
}
import { BiSolidUserCircle } from "react-icons/bi";
import { SmallCard } from "../LoadingCard";
import { GoTelescopeFill } from "react-icons/go";

export default function ProfileLeftbar({ SuggestData }: userdatas): JSX.Element {
    let userid = sessionStorage.getItem('UserId')

    return (

        <main className="md970:block hidden font-Inter pt-2 px-2">
            <section className="mt-6">
                {SuggestData.length === 0 ? (
                    <SmallCard />
                ) : (
                    <section className="bg-white rounded-lg shadow py-2">
                        <div className="flex text-lg justify-between mx-2">
                            <h2 className="font-extrabold">Suggestions</h2>
                            <span className="text-[#117dd5]"><GoTelescopeFill /></span>
                        </div>
                        {SuggestData.filter((data: any) => data.id !== userid).slice(0, 8).map((data: any) => (
                            <div
                                className="cursor-pointer w-full select-none flex my-4 ml-1 rounded-2xl gap-2"
                                key={data.id}
                            >
                                <div>
                                    {data.profileImage === "" ? (
                                        <div className='text-[48px] rounded-full text-[#000000d7]'>
                                            <BiSolidUserCircle />
                                        </div>
                                    ) : (
                                        <img
                                            src={data.profileImage}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full object-contain"
                                        />
                                    )}
                                </div>
                                <div>
                                    <p className="text-left font-semibold">{data.fullName}</p>
                                    <p className="text-sm text-left text-[#000000a9]">{data.username}</p>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </section>
        </main>
    )
}