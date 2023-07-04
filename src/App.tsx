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
            <Route path="/Forgotpassowrd" element={<Forgetpasword />} />
            {/* Otp page */}
            <Route path="/Otpverification" element={<Otp />} />
            {/* Create a new passowrd  */}
            <Route path="/Newpassword" element={<Newpassword />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
