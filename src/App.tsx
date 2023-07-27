import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Preloader from "./Preloader";
import {
    SignIn,
    Signup,
    Page404,
    Forgetpasword,
    Otp,
    Newpassword,
    HomePage,
    TermsandCondition,
    Privacy,
    Cookie,
    Profile,
    FriendRequest,
} from "./Import";

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    });

    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : (
                <BrowserRouter>
                    <Routes>

                        {/*  Sigin In page */}
                        <Route path="/" element={<SignIn />} />

                        {/* Sign Up page */}
                        <Route path="/Siginup" element={<Signup />} />

                        {/* 404 error */}
                        <Route path="*" element={<Page404 />} />

                        {/* forgotpassword */}
                        <Route
                            path="/Forgotpassword"
                            element={<Forgetpasword />}
                        />
                        {/* Otp page */}
                        <Route path="/Otpverification" element={<Otp />} />

                        {/* Create a new passowrd  */}
                        <Route path="/Newpassword" element={<Newpassword />} />

                        {/*  TermsandCondition */}
                        <Route path='/T&C' element={<TermsandCondition />} />

                        {/* privacy */}
                        <Route path="/PrivacyPolicy" element={< Privacy />} />

                        {/* Cookie */}
                        <Route path="/Cookies" element={<Cookie />} />

                        {/* Profile */}
                        <Route path="/Profile" element={<Profile /> }/>

                        {/* Home page */}
                        <Route path="/Home" element={<HomePage />} />

                            {/* Friend Request*/}
                            <Route path="/FriendRequest" element={<FriendRequest />} />
                    </Routes>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
