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
        <article className="bg-white flex justify-between gap-[5%] ">
            <section
                className="bg-white pt-2"
            >
                <Dashboard />
            </section>
            <section
                className="bg-white w-[85%] pt-2">
                <Content />
            </section>
            <section
                className="bg-white pt-2">
                <SideDashboard />
            </section>
        </article>
        </>
    )
}
