import PostComposer from "./PostComposer";
import PostSection from "./Postsection";

interface userdatas{
    userData : any
    isInputClicked : boolean
    handleInputClick: () => void
    handleBodyClick: () => void
    SuggestData : any
}

export default function Content({ 
    userData, 
    isInputClicked, 
    handleInputClick, 
    handleBodyClick,
    SuggestData}: userdatas) {

    return (
        <main className='relative'>
            <PostComposer 
            userData={userData} 
            isInputClicked={isInputClicked} 
            handleInputClick={handleInputClick} 
            handleBodyClick={handleBodyClick}
            /> 
            <section>
                <PostSection SuggestData={SuggestData} />
            </section>
        </main>
    );
}
