interface Error { 
    error : string | boolean
}
export function FilldetailsError({ error }: Error): JSX.Element{
    return(
        <article className="absolute bg-[#19212b] top-6 right-3 flex py-2 px-4 shadow-2xl rounded-lg   ErrorContainer">
            <i className="fa-regular fa-circle-xmark text-[#d70101] mr-3 text-lg"></i>
            <h2 className="text-white font-semibold select-none text-center">{error}</h2>
        </article> 
    )
}
interface Success {
    successFul: string | boolean
}
export function SuccessLoginM({ successFul }: Success): JSX.Element{
    return(
    <article className="absolute bg-[#19212b] top-6 right-3 flex py-2 px-4 shadow-2xl rounded-lg ErrorContainer">
            <i className="fa-solid fa-circle-check text-lg text-[#00bfa5] mr-3"></i>
            <h2 className="text-white font-semibold select-none text-center">{successFul}</h2>
    </article> 
    )
}