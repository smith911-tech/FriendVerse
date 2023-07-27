interface userDatas{
    coverImg: string,
    handleRemoveCoverClick: () => void
    handleImageUCload: (event: any) => void
    userClickedRemoveCover: boolean
}
import { AiOutlineClose } from 'react-icons/ai'
import defaultcoverimg from '../../assets/DefalutCoverImg.jpg'
import { AiOutlineCloudUpload } from 'react-icons/ai'
export default function CoverimgUpload({ 
    coverImg, 
    handleImageUCload, 
    handleRemoveCoverClick,
    userClickedRemoveCover,
}: userDatas){
    return(
        <>
            {coverImg === "" && !userClickedRemoveCover ? (
                // ! defuly cover image image update
                <section className='relative'>
                    <img
                        src={defaultcoverimg}
                        alt="Cover"
                        className="w-full rounded-t-lg h-44 smm500:h-32 object-cover brightness-[0.5]"
                    />
                    <label htmlFor="coverimg" className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-4xl left-[45%] bg-[#0000008b] px-2 py-2 rounded-2xl'>
                        <abbr title='Upload Image' >
                            <AiOutlineCloudUpload />
                        </abbr>
                        <input type="file" name="" id="coverimg" className='hidden' onChange={handleImageUCload} />
                    </label>
                </section>
            ) : (
                // ! user cover image update
                <section className='relative'>
                    <img
                        src={coverImg}
                        alt="Cover"
                        className="w-full rounded-t-lg h-44  object-cover smm500:h-32 brightness-[0.5]"
                    />
                    <label htmlFor="coverimg" className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-3xl left-1/3 bg-[#0000008b] px-2 py-2 rounded-2xl'>
                        <abbr title='Upload Image' >
                            <AiOutlineCloudUpload />
                        </abbr>
                        <input type="file" name="" id="coverimg" className='hidden' onChange={handleImageUCload} />
                    </label>
                    <div className=' absolute top-2/4 cursor-pointer text-[#ffffffc8] text-2xl right-1/3 bg-[#0000008b] px-2 py-2 rounded-2xl' onClick={handleRemoveCoverClick}>
                        <abbr title='Remove Cover Image' >
                            <AiOutlineClose />
                        </abbr>
                    </div>
                </section>
            )}
        </>
    )
}