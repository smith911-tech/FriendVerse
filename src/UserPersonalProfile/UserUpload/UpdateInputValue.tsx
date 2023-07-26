interface userDatas{
fullName: string
setFullName : any
userName : string
setUserName : any
bio : string
setBio : any
location : string
setLocation : any
dataOfBirthValue : string
setDateOfBirth : any
} 
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
export default function UpdateInputValue({
    fullName,
    setFullName,
    userName,
    setUserName,
    bio,
    setBio,
    location,
    setLocation,
    dataOfBirthValue,
    setDateOfBirth

}: userDatas){
    return(
        <>
            <section className='mt-16 w-full flex flex-col gap-4 items-center'>
                <input
                    type="text"
                    className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'

                    placeholder='Fullname'
                    maxLength={35}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="text"
                    className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                    placeholder='Username'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <textarea
                    className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                    placeholder='Bio'
                    name=""
                    cols={30}
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={170}
                >
                </textarea>
                <input
                    type="text"
                    className='w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500'
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    maxLength={50}
                />
                <DatePicker
                    showLeadingZeros
                    dayPlaceholder='dd'
                    monthPlaceholder='mm'
                    yearPlaceholder='yyyy'
                    minDate={new Date("01-01-1800")}
                    maxDate={new Date("01-01-2010")}
                    onChange={setDateOfBirth}
                    value={dataOfBirthValue}
                />
            </section>
        </>
    )
}