import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
interface Props {
    setDateOfBirth : any
    dataOfBirth: string
}
export default function SecondSection({
    setDateOfBirth,
    dataOfBirth,
    }: Props): JSX.Element {
    return (
        <section className="flex flex-col mt-8 md734:px-24 SignupDate font-Inter">
            <h2 className="text-xl font-bold">Date of birth</h2>
            <p className="text- text-sm font-semibold  text-[#ffffffb9] mb-3">
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
                <br />
                <span className='text-[#d70101]'>Note</span> User must be above 3 Years
            </p>
            <DatePicker 
            value={dataOfBirth} 
            onChange={setDateOfBirth} 
            disableCalendar
            showLeadingZeros
            dayPlaceholder='dd'
            monthPlaceholder='mm'
            yearPlaceholder='yyyy'
            minDate={new Date("01-01-1900")}
            maxDate={new Date("01-01-2020")}
            />
        </section>
    )
}