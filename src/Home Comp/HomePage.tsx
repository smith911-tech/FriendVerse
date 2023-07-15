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
            <section 
                className="border-r-[0.5px] border-[#ffffff8f] w-[100px] fixed h-screen bg-black pt-36 md734:w-[250px] sm520:left-[2000px]">
                <Dashboard />
            </section>
            <section 
                className="ml-[50px] lg1280:w-[80%] h-screen bg-black lg1280:mr-[300px]  pt-3 w-full md734:ml-[250px] sm520:ml-0">
                <Content />
            </section>
            <section 
                className="w-[300px] fixed  h-screen right-0 bg-black border-l-[0.5px] border-[#ffffff8f]  pt-20 hidden lg1280:block">
                <SideDashboard />
            </section>
        </main>
    )
}
