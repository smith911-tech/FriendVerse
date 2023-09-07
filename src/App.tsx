import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Preloader from "./Preloader";
import {
    SignIn,
    Signup,
    Page404,
    Forgetpasword,
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
    OthersFollowersInterface,
    OthersFollowingInterface,
    ViewPost,
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

                        {/*OthersFollowersInterface on there page */}
                        <Route path="/User/:id/Followers" element={<OthersFollowersInterface />} />

                        {/* OthersFollowingInterface on there page */}
                        <Route path="/User/:id/Following" element={<OthersFollowingInterface />} />

                        {/* OthersFollowingInterface on there page */}
                        <Route path="/Home/:id" element={<ViewPost />} />

                        {/* 404 error */}
                        <Route path="*" element={<Page404 />} />

                    </Routes>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
