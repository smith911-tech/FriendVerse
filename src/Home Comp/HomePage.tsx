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
        <main className="bg-[#000000] text-[#ffffffee] flex justify-between px-2">
            <section>
                <Dashboard />
            </section>
            <section>
                <Content />
            </section>
            <section>
                <SideDashboard />
            </section>
        </main>
    )
}
