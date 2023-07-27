interface userdatas {
    isInputClicked: boolean,
    userData: any,
    handleBodyClick: () => void
}
import { useState } from 'react';
import { db } from '../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import SaveUpdateNav from './UserUpload/SaveUpdateNav';
import CoverimgUpload from "./UserUpload/CoverImgUpload";
import ProfileimgUpload from "./UserUpload/ProfileImgUpload";
import UpdateInputValue from './UserUpload/UpdateInputValue';
import { FilldetailsError } from '../Error-SuccessM';
export default function UpdateProfile({ isInputClicked, userData, handleBodyClick }: userdatas) {

    // ! dataofbirth formatter
    const dateofbirthValue = userData && userData.dateOfBirth;
    const DODValue = new Date(dateofbirthValue.seconds * 1000);
    

    // ! update user state
    const [profileImg, setProfileImg] = useState<any>(userData.profileImage  || "")
    const [coverImg, setCoverImg] = useState<any>(userData.coverImage || "")
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
        };
        reader.readAsDataURL(file);
    };

    // ! update cover image
    const handleImageUCload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverImg(reader.result);

        };
        reader.readAsDataURL(file);
    };

    const [error, setError] = useState<string | boolean>(false)

    // ! On load 
    const [Loader, setLoader] = useState<boolean>(false)
    // ! getting the userid from the local storage 
    let userid = sessionStorage.getItem('UserId')
    
    // Todo: handleUpdate
    const [userClickedRemoveCover, setUserClickedRemoveCover] = useState(false);

    const handleRemoveCoverClick = () => {
        setUserClickedRemoveCover(true);
    };
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
            if (userClickedRemoveCover) {
                await updateDoc(DataDocRef, {
                    fullName: fullName,
                    username: userName,
                    dateOfBirth: dateOfBirth,
                    profileImage: profileImg,
                    bio: bio,
                    coverImage: '',
                    Location: location
                });
            } else {
                await updateDoc(DataDocRef, {
                    fullName: fullName,
                    username: userName,
                    dateOfBirth: dateOfBirth,
                    profileImage: profileImg,
                    bio: bio,
                    coverImage: coverImg,
                    Location: location
                });
            }

            handleBodyClick();
            setLoader(false);
        } catch (error) {
            setError("Error")
            setTimeout(() => {
                setError(false);
            }, 1500);
            setLoader(false);
        }
    };

    return (
        <>
            {isInputClicked && (
                <div className=" absolute top-0 left-0 right-0 mx-auto bg-white px-4 pb-4 z-[30]  shadow md970:w-[100%] sm650:-top-9 rounded-t-2xl h-[35rem]  overflow-y-auto ">
                    <SaveUpdateNav 
                    handleUpdate={handleUpdate}
                    handleBodyClick={handleBodyClick}
                    Loader={Loader}
                    />
                    <div className="relative select-none">
                        <CoverimgUpload 
                        coverImg={coverImg}
                        handleRemoveCoverClick={handleRemoveCoverClick}
                        handleImageUCload={handleImageUCload}
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
                        />
                    </div>
                </div>
            )}
            {error && <FilldetailsError error={error} />}
        </>
    )
}
