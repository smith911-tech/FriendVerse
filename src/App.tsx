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
    VideoContent,
    MessageComp,
    NotificationComp,
    ViewOtherUsers,
    UserSearch,
    Settings,
    FollowersInterface,
    FollowingInterface,
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

                        {/* Videos */}
                        <Route path="/VideoContent" element={<VideoContent />} />

                        {/* Message page */}
                        <Route path="/Message" element={<MessageComp />} />

                        {/* Notification page*/}
                        <Route path="/Notifications" element={<NotificationComp />} />

                        {/*  ViewOtherUsers */}
                        <Route path="/User/:id" element={<ViewOtherUsers />} />

                        {/*  ViewOtherUsers */}
                        <Route path="/UserSearch" element={<UserSearch />} />

                        {/*  Settings */}
                        <Route path="/Profile/Settings" element={<Settings />} />

                        {/* Profile Followers */}
                        <Route path="/Followers" element={<FollowersInterface />} />

                        {/* Profile Following */}
                        <Route path="/Following" element={<FollowingInterface />} />

                        {/* 404 error */}
                        <Route path="*" element={<Page404 />} />

                    </Routes>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
