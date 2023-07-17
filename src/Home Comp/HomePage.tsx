import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import SideDashboard from "./SideDashboard";
import Header from "./Header";
import ButtomNav from "./ButtomNav";
export default function HomePage() {
    // ! toggle profile on mobile screen
    const [Toggle, setToggle] = useState<boolean>(false)
    const handleToggle = () => {
        setToggle(!Toggle)
        handleToggle()
    }
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
    return (
        <main className="relative">
        <Header />
            
            <article className="bg-[#f0f2f5] flex justify-between gap-[1%] sm650:px-3">
            <section
                    className="pt-2 w-[5%] h-screen sticky top-[13%] md970:w-[25%] sm650:hidden"
            >
                <Dashboard />
            </section>
            <section
                    className="bg-white w-[95%] mt-10 rounded-2xl shadow-xl md800:w-[60%] sm650:w-[100%]">
                <Content />
            </section>
            <section
                    className="pt-2 lg1150:w-[25%]  h-screen sticky top-[10%] w-[5%] sm650:hidden">
                <SideDashboard />
            </section>
        </article>
        <ButtomNav />
        </main>
    )
}
