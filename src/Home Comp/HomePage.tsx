import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const fullname = sessionStorage.getItem("fullName")
    const navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('AuthToken')
        if (authToken) {
            navigate('/Homepage')
        }
        else if (!authToken) {
            navigate('/')
        }
    }, [])
    return(
        <h2 className="text text-3xl">
        Home PAGE {fullname}
        </h2>
    )
}