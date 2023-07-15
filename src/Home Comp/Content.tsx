interface Props {
    handleToggle: () => void;
}
import logo from '../assets/Logo2.png'
import { FaCircleUser } from "react-icons/fa6"

export default function Content({ handleToggle }: Props): JSX.Element  {
    return (
        <main>
            <div className='border-b-[0.5px] border-[#ffffff8f] mb-3  sm520:px-1 select-none'>
                <span className="text-[33px] absolute top-4 left-5 sm520:inline hidden" onClick={handleToggle}>
                    <FaCircleUser />
                </span>
            <img src={logo} alt="" className='w-[40px] block mx-auto my-0 pb-3 '/>
            </div>
        </main>
    )
}   