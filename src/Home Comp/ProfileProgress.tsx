// @ts-ignore
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { useState } from 'react';
import { MdOutlineVerifiedUser } from "react-icons/md";
export default function ProfileProgress() {
    const [percentage, setPercentage] = useState<number>(25)
    return (
        <div className=' rounded-lg shadow-lg p-4 select-none mb-8 bg-white progress'>
            <h2 className=' text-lg font-semibold mb-2'>Complete your Profile</h2>
            <Progress
                type="circle"
                percent={percentage}
            />
            <section className='flex flex-col gap-2 font-bold text-[#000000b6]'>

                <div className='flex justify-between'>
                    <section className='flex gap-1'>
                    <span className='font-bold text-xl'>
                        <MdOutlineVerifiedUser />
                    </span>
                        <p>Profile Photo</p>
                    </section>
                    <p className=''>0/1</p>
                </div>

                <div className='flex  justify-between'>
                    <section className='flex gap-1'>
                        <span className='font-bold text-xl'>
                            <MdOutlineVerifiedUser />
                        </span>
                        <p>Cover Photo</p>
                    </section>
                    <p>0/1</p>
                </div>

                <div className='flex  justify-between'>
                    <section className='flex gap-1'>
                        <span className='font-bold text-xl'>
                            <MdOutlineVerifiedUser />
                        </span>
                        <p>Location</p>
                    </section>
                    <p>0/1</p>
                </div>

                <div className='flex justify-between'>
                    <section className='flex gap-1'>
                        <span className='font-bold text-xl'>
                            <MdOutlineVerifiedUser />
                        </span>
                        <p>Bio</p>
                    </section>
                    <p>0/1</p>
                </div>

            </section>
        </div>
    )
}