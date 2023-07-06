interface Props { 
    Error : string | boolean
}
export function FilldetailsError({ Error }: Props): JSX.Element{
    return(
        <article className="absolute bg-[#19212b] top-6 right-3 flex py-2 px-4 shadow-2xl rounded-lg   ErrorContainer">
            <i className="fa-solid fa-ban text-lg text-[#d70101] mr-3"></i>
            <h2 className="text-white font-semibold select-none text-center">{Error}</h2>
        </article> 
    )
}
export function SuccessLoginM(){
    return(
        <>
        </>
    )
}