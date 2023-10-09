import { useThemeStore } from '../Zustand';
interface Props {
    data: any
}

export default function OthersPosts({data}: Props){
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <main className={` mt-3 
        ${theme ? "bg-[#1b1d21] text-[#ffff]" : "bg-[#f0f2f5]  text-[#000000]"}`}>
        </main>
    )
}