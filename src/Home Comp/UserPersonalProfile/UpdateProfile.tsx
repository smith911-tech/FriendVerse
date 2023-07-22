interface userdatas{
    isInputClicked: boolean
}
export default function UpdateProfile({ isInputClicked }: userdatas): JSX.Element{
    return(
        <>
            {isInputClicked && (
                <div className=" absolute top-0 left-0 right-0 mx-auto bg-white p-4 z-[30]  shadow md970:w-[100%] sm650:-top-9 ">
                    
                </div>
            )}
        </>
    )
}