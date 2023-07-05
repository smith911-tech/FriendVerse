import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
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
        <>
        Home PAGE
        </>
    )
}