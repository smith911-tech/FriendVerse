import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const fullname = sessionStorage.getItem("fullName")
    const navigate = useNavigate();
    useEffect(() => {
        let userid = sessionStorage.getItem('UserId')
        if (userid) {
            navigate(`/Homepage`)
        }
        else if (!userid) {
            navigate('/')
        }
    }, [])
    return(
        <h2 className="text text-3xl">
        Home PAGE {fullname}
        </h2>
    )
}

// import React from 'react';
// import { auth } from './firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import Login from './login';
// import Mainpage from './main';

// function App() {
//     const [user] = useAuthState(auth);
//     return (
//         user ? <Mainpage /> : <Login />
//     );
// }

// export default App;
