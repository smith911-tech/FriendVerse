interface userDatas{
    handleImageUpload: (event :any ) => void,
    profileImg: string
}
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineCloudUpload } from 'react-icons/ai'
export default function ProfileimgUpload({ handleImageUpload, profileImg }: userDatas){
    return(
        <>
            {profileImg === "" ? (
                //! default profile image update
                <div className=' text-8xl absolute left-4 -translate-y-1/2  border-white rounded-full bg-[#ffffffe6] text-[#000000d7] smm500:text-[80px] smm500:left-1'>
                    <span className=' brightness-[0.5]'>
                        <BiSolidUserCircle />
                    </span>
                    <label htmlFor="ProfileImg" className=' absolute top-1/4 cursor-pointer text-[#fff] text-3xl left-1/4 bg-[#0000008b] px-2 py-2 rounded-2xl brightness-200'>
                        <abbr title='Upload Image' >
                            <AiOutlineCloudUpload />
                        </abbr>
                        <input
                            type="file"
                            name=""
                            id="ProfileImg"
                            className='hidden'
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </label>
                </div>
            ) : (
                <div className='w-24 h-24 rounded-full absolute left-4 -translate-y-1/2 border border-white object-contain bg-white smm500:h-20 smm500:w-20 smm500:left-1 '>
                    <img
                        //! user profile image update
                        src={profileImg}
                        alt="Profile"
                        className="rounded-full brightness-[0.7] w-24 h-24 object-cover"
                    />
                    <label htmlFor="ProfileImg" className=' absolute top-1/4 cursor-pointer text-[#ffffff9c] text-3xl left-1/4 bg-[#0000008b] px-2 py-2 rounded-2xl brightness-200'>
                        <abbr title='Upload Image' >
                            <AiOutlineCloudUpload />
                        </abbr>
                        <input type="file"
                            name=""
                            id="ProfileImg"
                            className='hidden'
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </label>
                </div>
            )}
            
        </>
    )
}