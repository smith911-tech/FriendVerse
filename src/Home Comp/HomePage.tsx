import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import SideDashboard from "./SideDashboard";
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
        <main className="bg-[#f0f2f5] flex justify-between gap-[5%]">
            <section
                className="bg-white w-[30%]"
            >
                <Dashboard />
            </section>
            <section
                className="bg-white w-[35%]">
                <Content />
            </section>
            <section
                className="bg-white  w-[30%]">
                <SideDashboard />
            </section>
        </main>
    )
}
