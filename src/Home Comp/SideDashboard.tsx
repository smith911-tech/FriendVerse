import { CiSearch } from "react-icons/ci";
export default function SideDashboard() {
    return(
        <main className="lg1150:block hidden px-1">
            <section className="bg-[white]  px-2 py-2 shadow-2xl">
                <div className="flex relative">
                    <input type="text" className="w-full py-2 pl-10 pr-1  outline-[#117DD5] border rounded-2xl  border-solid bg-[#eff3f4]" placeholder="Search"/>
                    <div className='text-xl cursor-pointer absolute top-[10px] left-3'><CiSearch /></div>
                </div>
            </section>
    </main>
    )
}
