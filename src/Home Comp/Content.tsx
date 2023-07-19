import PostSection from "./PostSection";

interface userdatas{
    userData : any,
    isInputClicked : boolean,
    handleInputClick: () => void,
    handleBodyClick: () => void
}

export default function Content({userData, isInputClicked, handleInputClick, handleBodyClick }: userdatas): JSX.Element {

    return (
        <main className='relative'>
            <PostSection 
            userData={userData} 
            isInputClicked={isInputClicked} 
            handleInputClick={handleInputClick} 
            handleBodyClick={handleBodyClick}
            /> 
        </main>
    );
}
