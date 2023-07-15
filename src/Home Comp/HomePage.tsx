import { useEffect } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import SideDashboard from "./SideDashboard";
export default function HomePage() {
    const navigate = useNavigate();
    useEffect(() => {
        let userid = sessionStorage.getItem('UserId')
        if (userid) {
            navigate("/Home")
        }
        else if (!userid) {
            navigate('/')
        }
    }, [])
    return(
        <main className="bg-[#000000] text-[#ffffffee] flex justify-between font-Inter">
            <section className="border-r-[0.5px] border-[#ffffff8f] w-[300px] fixed h-screen bg-black">
                <Dashboard />
            </section>
            <section className="ml-[300px] w-[80%] h-full bg-black mr-[300px]">
                <Content />
            </section>
            <section className="w-[300px] fixed  h-screen right-0 bg-black">
                <SideDashboard />
            </section>
        </main>
    )
}
