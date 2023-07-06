import { ChangeEvent } from "react";
interface Props {
    handleNextSection: () => void
    handlePreviousSection: () => void
    setDateOfBirth : any
    dataOfBirth: string
}
export default function SecondSection({
    handleNextSection,
    handlePreviousSection,
    setDateOfBirth,
    dataOfBirth,
    }: Props): JSX.Element {

    return (
        <section className="flex flex-col mt-8 md734:px-24">
            <h2 className="text-xl font-bold font-serif">Date of birth</h2>
            <p className="text- text-sm font-semibold font-sans text-[#ffffffb9] mb-3">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
            </p>

            <input
                type="date"
                name=""
                id=""
                className="w-full bg-[#ffffff62] border border-solid border-[#ffffffd5] h-10 px-4 mb-8 lg1280:h-11 mt-5 outline-none"
                value={dataOfBirth}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}
            />
            <div className="flex justify-between">
                <button
                    onClick={handlePreviousSection}
                    className="block mx-auto my-0 py-2 px-10  text-black bg-[#D9D9D9] rounded-[30px] font-sans font-bold select-none"
                >
                    Prev
                </button>
                <button
                    onClick={handleNextSection}
                    className="block mx-auto my-0 py-2 px-10  text-white bg-[#117DD5] rounded-[30px] font-sans font-bold select-none"
                >
                    Next
                </button>
            </div>
        </section>
    )
}