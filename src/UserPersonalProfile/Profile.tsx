import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rightsidebar from "../GeneralComponent/Rightsidebar";
import Header from "../GeneralComponent/Header";
import ButtomNav from "../GeneralComponent/ButtomNav";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import ProfileLeftbar from "./LeftsidebarProfile";
import ProfileInterface from "./ProfileInterface";
import { useThemeStore } from "../Zustand";
export default function userPersonalProfile() {
  const navigate = useNavigate();
  let userid = sessionStorage.getItem("UserId");
  useEffect(() => {
    if (userid) {
      navigate("/Profile");
    } else if (!userid) {
      navigate("/");
    }
  }, []);

  const cachedUserData = localStorage.getItem("userData");
  const [userData, setUserData] = useState<any>(
    cachedUserData ? JSON.parse(cachedUserData) : null
  );

  // ! data fetched
  useEffect(() => {
    if (userid) {
      const userRef = doc(collection(db, "users"), userid as string);
      const handleSnapshot = (snapshot: {
        exists: () => any;
        data: () => any;
      }) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserData(data);
          // Cache user data in localStorage
          localStorage.setItem("userData", JSON.stringify(data));
        } else {
          setUserData(null);
        }
      };
      const unsubscribe = onSnapshot(userRef, handleSnapshot);
      return () => {
        unsubscribe();
      };
    }
  }, [userid]);
  //! states
  const cachedSuggestData = localStorage.getItem("suggestData");
  const [SuggestData, setSuggestData] = useState<any[]>(
    cachedSuggestData ? JSON.parse(cachedSuggestData) : []
  );

  // !suggestions user data
  useEffect(() => {
    const handleSnapshot = (snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSuggestData(data);
      // Cache suggestion data in localStorage
      localStorage.setItem("suggestData", JSON.stringify(data));
    };
    const unsubscribe = onSnapshot(collection(db, "users"), handleSnapshot);
    return () => {
      unsubscribe();
    };
  }, []);

  // ! name that will apear on the followers count page
  let name = userData && userData.fullName;
  sessionStorage.setItem("name", name);
  let username = userData && userData.username;
  sessionStorage.setItem("username", username);

  // ! Opening the post div
  const [isInputClicked, setInputClicked] = useState(false);

  const handleBodyClick = () => {
    setInputClicked(false);
    document.body.style.overflow = "auto";
  };
  const handleInputClick = () => {
    setInputClicked(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };

  //! Theme Mode
  const theme = useThemeStore((state: any) => state.theme);

  return (
    <main className="relative">
      <header
        onClick={handleBodyClick}
        className={`fixed  top-0 w-full z-10  ${
          isInputClicked ? " brightness-[0.2]" : " brightness-100"
        }`}
      >
        <Header userData={userData} SuggestData={SuggestData} />
      </header>

      <article
        className={` flex justify-between gap-[1%] sm650:px-3 pt-[70px] 
            ${
              theme
                ? isInputClicked
                  ? " bg-[#000000ee]"
                  : "bg-[#1b1d21]"
                : isInputClicked
                ? "bg-[#000000ca]"
                : "bg-[#f0f2f5]"
            }`}
      >
        <section
          onClick={handleBodyClick}
          className={`pt-2 w-[5%] h-screen sticky top-[70px] md970:w-[25%] sm650:hidden ${
            isInputClicked ? " brightness-[0.2]" : " brightness-100"
          }`}
        >
          <ProfileLeftbar SuggestData={SuggestData} />
        </section>
        <section className=" w-[95%] mt-4 rounded-2xl  md800:w-[60%] sm650:w-[100%] smm500:mt-0 min-h-screen">
          <ProfileInterface
            userData={userData}
            handleInputClick={handleInputClick}
            isInputClicked={isInputClicked}
            handleBodyClick={handleBodyClick}
            SuggestData={SuggestData}
          />
        </section>
        <section
          onClick={handleBodyClick}
          className={`pt-2 lg1150:w-[25%]  h-screen sticky top-[70px] w-[5%] sm650:hidden ${
            isInputClicked ? " brightness-[0.2]" : " brightness-100"
          }`}
        >
          <Rightsidebar SuggestData={SuggestData} userData={userData} />
        </section>
      </article>
      <ButtomNav />
    </main>
  );
}
