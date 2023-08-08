interface userdatas {
    isInputClicked: boolean,
    userData: any,
    handleBodyClick: () => void
    showDOB: boolean
    setShowDOB: any
}
import { useState } from 'react';
import { db, storage } from '../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import SaveUpdateNav from './UserUpload/SaveUpdateNav';
import CoverimgUpload from "./UserUpload/CoverImgUpload";
import ProfileimgUpload from "./UserUpload/ProfileImgUpload";
import UpdateInputValue from './UserUpload/UpdateInputValue';
import { FilldetailsError, SuccessLoginM } from '../Error-SuccessM';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import useThemeStore from '../Zustand';
export default function UpdateProfile({ 
    isInputClicked, 
    userData, 
    handleBodyClick,
    showDOB,
    setShowDOB,
    }: userdatas) {

    // ! dataofbirth formatter
    const dateofbirthValue = userData && userData.dateOfBirth;
    const DODValue = new Date(dateofbirthValue.seconds * 1000);
    

    // ! update user state
    const [profileImg, setProfileImg] = useState<any>(userData.profileImage  || "")
    const [coverImg, setCoverImg] = useState<any>(userData.coverImage || "")
    const [profileImgUrl, setProfileImgUrl] = useState<any>(null)
    const [coverImgUrl, setCoverImgUrl] = useState<any>(null)
    const [fullName, setFullName] = useState<string>(userData.fullName || "")
    const [userName, setUserName] = useState<string>(userData.username || "")
    const [bio, setBio] = useState<string>(userData.bio || "")
    const [location, setLocation] = useState<string>(userData.Location || "")
    const [dateOfBirth, setDateOfBirth] = useState<any>(DODValue || "")

    // ! update profile image
    const handleImageUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImg(reader.result);
            setProfileImgUrl(file)
        };
        reader.readAsDataURL(file);
    };
    

    // ! update cover image
    const handleImageCUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverImg(reader.result);
            setCoverImgUrl(file)

        };
        reader.readAsDataURL(file);
    };

    const [error, setError] = useState<string | boolean>(false)
    const [successFul, setSuccessful] = useState<string | boolean>(false)

    // ! On load 
    const [Loader, setLoader] = useState<boolean>(false)
    // ! getting the userid from the local storage 
    let userid = sessionStorage.getItem('UserId')
    
    // ! background image state
    const [userClickedRemoveCover, setUserClickedRemoveCover] = useState(false);
    // ! removal of background image
    const handleRemoveCoverClick = () => {
        setUserClickedRemoveCover(true);
        setSuccessful("Removed Successfully")
    };
    setTimeout(() => {
        setSuccessful(false);
    }, 1500);
      // !  handleUpdate
    const handleUpdate = async (_e: any) => {
        setLoader(true);

        if (fullName.trim().length < 1) {
            setError("Full name cannot be empty.");
            setLoader(false);
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        } else if (userName.trim().length < 1) {
            setError("Username cannot be empty.");
            setLoader(false);
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const DataDocRef = doc(db, "users", userid as string);
        try {
            // Upload the profileImg to Firebase Storage if it's not null
            if (profileImgUrl) {
                const profileImgRef = ref(storage, `Users/${userid}/Profile_Img`);
                await uploadBytesResumable(profileImgRef, profileImgUrl);
                // Get the download URL of the uploaded profile image
                const profileImgURL = await getDownloadURL(profileImgRef);
                await updateDoc(DataDocRef, {
                    profileImage: profileImgURL,
                });
            }

            // Upload the coverImg to Firebase Storage if it's not null
            if (coverImgUrl && !userClickedRemoveCover) {
                const coverImgRef = ref(storage, `Users/${userid}/Cover_Img`);
                await uploadBytesResumable(coverImgRef, coverImgUrl);
                // Get the download URL of the uploaded cover image
                const coverImgURL = await getDownloadURL(coverImgRef);
                await updateDoc(DataDocRef, {
                    coverImage: coverImgURL,
                });
            } else if (userClickedRemoveCover) {
                // If userClickedRemoveCover is true, delete the profile image by setting it to an empty string
                await updateDoc(DataDocRef, {
                    coverImage: "",
                });
            }
            (
                await updateDoc(DataDocRef, {
                    fullName: fullName,
                    username: userName,
                    dateOfBirth: dateOfBirth,
                    bio: bio,
                    Location: location,
                    showDOB: showDOB
                })
            )
            handleBodyClick();
            setLoader(false);
            setTimeout(() => {
                setUserClickedRemoveCover(false)
            }, 50)
        } catch (error) {
            setError("Error")
            setTimeout(() => {
                setError(false);
            }, 1500);
            setLoader(false);
            console.log(error)
        }
    };

    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);


    return (
        <>
            {isInputClicked && (
                <div className=' absolute top-0 left-0 right-0 bg-black h-[36rem]'>
                <div className={` absolute top-0 left-0 right-0 mx-auto  px-4 pb-5  shadow md970:w-[100%] sm650:-top-9 rounded-t-2xl h-[35rem]  overflow-y-auto z-[60] ${theme ? "bg-black" : "bg-white"}`}>
                    <SaveUpdateNav 
                    handleUpdate={handleUpdate}
                    handleBodyClick={handleBodyClick}
                    Loader={Loader}
                    />
                    <div className="relative select-none">
                        <CoverimgUpload 
                        coverImg={coverImg}
                        handleRemoveCoverClick={handleRemoveCoverClick}
                        handleImageCUpload={ handleImageCUpload}
                        userClickedRemoveCover={userClickedRemoveCover}
                        />
                        <ProfileimgUpload 
                        handleImageUpload={handleImageUpload} 
                        profileImg={profileImg}/>
                    </div>
                    {/* Name, username, location, date of birth, bio Input */}
                    <div className="flex justify-center update-user-Date">
                        <UpdateInputValue 
                        fullName={fullName}
                        setFullName={setFullName}
                        userName={userName}
                        setUserName={setUserName}
                        bio={bio}
                        setBio={setBio}
                        location={location}
                        setLocation={setLocation}
                        dateOfBirth={dateOfBirth}
                        setDateOfBirth={setDateOfBirth}
                        showDOB={showDOB}
                        setShowDOB={setShowDOB}
                        />
                    </div>
                </div>
                </div>
            )}
            {error && <FilldetailsError error={error} />}
            {successFul && <SuccessLoginM successFul={successFul}/>}
        </>
    )
}
