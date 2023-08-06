import useThemeStore from '../Usetheme';
export default function VerfiyId() {
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <div className={` rounded-lg shadow p-4 select-none mb-8 ${theme ? "bg-black text-[#ffffffe0]" : "bg-blue-200 text-black"}`}>
            <h2 className="text-2xl font-bold mb-2">Get Verified</h2>
            <p className={`text-base ${theme ? "text-[#ffffffc4]" : "text-gray-800"}`}>Verify Identity to get a blue tick</p>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4">
                Get Verified
            </button>
        </div>
    )
}