interface Props {
    setDateOfBirth : any
    dataOfBirth: string
}
export default function SecondSection({
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
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
        </section>
    )
}