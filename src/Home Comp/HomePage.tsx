import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import SideDashboard from "./SideDashboard";
import Header from "./Header";
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
        <>
        <Header />
            <article className="bg-[#f0f2f5] flex justify-between gap-[5%] ">
            <section
                className="pt-2 w-[20%]  h-screen sticky top-[10%]"
            >
                <Dashboard />
            </section>
            <section
                className="bg-white w-[50%] mt-10 rounded-2xl shadow-xl ">
                <Content />
            </section>
            <section
                    className="pt-2 w-[25%] h-screen sticky top-[10%]">
                <SideDashboard />
            </section>
        </article>
        </>
    )
}
