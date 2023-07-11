import { Link } from "react-router-dom"
interface Props {
    isChecked : boolean
    setIsChecked : any 
}
export default function ThirdSection({
    isChecked,
    setIsChecked,
}: Props): JSX.Element {

    return (
        <section className="flex flex-col mt-8  md734:px-24 font-sans">
            <h2 className="text-lg font-bold ">
                Personalize your experience
            </h2>
            <h3 className="mt-4 font-bold text-base mb-1">
                Keep track of where you see Friend verse content on the web.
            </h3>
            <p className="text-[#ffffff9b] text-sm font-normal">
                Friend Verse utilizes this information to tailor your
                experience. Your web browsing history will never be saved
                alongside your name, email, or phone number.
            </p>
            <br />
            <p className="text-[#ffffff9b] text-sm font-normal">
                By signing up, you agree to our  
                <Link to="/T&C" className="text-[#117DD5] cursor-pointer"> Terms, </Link>
                <span className="text-[#117DD5] cursor-pointer"> 
                        Privacy Policy
                </span>
                , and {" "}
                <span className="text-[#117DD5] cursor-pointer">
                    Cookie Use
                </span>
                . Friend Verse may use your contact information, including your
                email address and phone number for purposes outlined in our
                <span className="text-[#117DD5] cursor-pointer">
                    {" "}
                    Privacy Policy
                </span>
                .
            </p>
            <br />
            <div className="text- text-xs font-bold select-none">
                <label htmlFor="acknowledge">I acknowledge</label>{" "}
                <input 
                type="checkbox" 
                name="" 
                id="acknowledge" 
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                />
            </div>
            <br />
            <div className="flex justify-between">
            </div>
        </section>
    )
}