import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
interface Props {
    setDateOfBirth : any
    dataOfBirth: any
}
export default function SecondSection({
    setDateOfBirth,
    dataOfBirth,
    }: Props): JSX.Element {

    return (
        <section className="flex flex-col mt-8 md734:px-24 SignupDate">
            <h2 className="text-xl font-bold font-serif">Date of birth</h2>
            <p className="text- text-sm font-semibold font-sans text-[#ffffffb9] mb-3">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
            </p>
            <DatePicker 
            value={dataOfBirth} 
            onChange={setDateOfBirth} />
        </section>
    )
}