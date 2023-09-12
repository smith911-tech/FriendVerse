interface Props{
fullName: string
setFullName : any
userName : string
setUserName : any
bio : string
setBio : any
location : string
setLocation : any
dateOfBirth : string
setDateOfBirth : any
showDOB: boolean
setShowDOB: any
} 
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Switch } from '@headlessui/react'
import {useThemeStore} from '../../Zustand';
export default function UpdateInputValue({
    fullName,
    setFullName,
    userName,
    setUserName,
    bio,
    setBio,
    location,
    setLocation,
    dateOfBirth,
    setDateOfBirth,
    showDOB,
    setShowDOB,
}: Props){
    //! Theme Mode
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <>
            <section className='mt-16 w-full flex flex-col gap-4 items-center'>
                <input
                    type="text"
                    className={`w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500 ${theme 
                    ? "bg-[#1b1d21]" 
                    : "bg-[white]"}`}
                    placeholder='Fullname'
                    maxLength={20}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="text"
                    className={`w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500 ${theme 
                    ? "bg-[#1b1d21]" 
                    : "bg-[white]"}`}
                    placeholder='Username'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={35}
                />
                <textarea
                    className={`w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500 ${theme 
                    ? "bg-[#1b1d21]" 
                    : "bg-[white]"}`}
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
                    className={`w-full py-3 px-4 border border-gray-300 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:border-blue-500 ${theme
                        ? "bg-[#1b1d21]"
                        : "bg-[white]"}`}
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    maxLength={50}
                />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="showDateOfBirthToggle"
                        className="hidden"
                        checked={showDOB}
                        onChange={() => setShowDOB(!showDOB)}
                    />
                        <Switch
                            checked={showDOB}
                            onChange={setShowDOB}
                            className={`${showDOB ? 'bg-blue-600' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${showDOB ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                    
                    <span className="text-lg font-semibold ">Show Date of Birth</span>
                </div>

                {/* Date of Birth section */}
                    <DatePicker
                        showLeadingZeros
                        dayPlaceholder='DD'
                        monthPlaceholder='MM'
                        yearPlaceholder='YYYY'
                        minDate={new Date("01-01-1800")}
                        maxDate={new Date("01-01-2010")}
                        onChange={setDateOfBirth}
                        value={dateOfBirth}
                        className={`mt-4 ${theme 
                        ? "bg-[#1b1d21]" 
                        : "bg-[white]"}`}
                    />
            </section>
        </>
    )
}