import BrokenPencil from './assets/Broken Pencil.png'
import { useNavigate } from 'react-router-dom'
export default function Page404(){
  const navigate = useNavigate()
  const handlenavigate = () =>{
    navigate('/Home')
  }
    return(
      <div className="flex  justify-center min-h-screen bg-black flex-col ">
        <img src={BrokenPencil} alt="" className='w-full mt-[-252px] object-contain sm500:w-[350px] block mb-0 mx-auto'/>
      <div className="text-white text-center">
        <h1 className="text-6xl font-bold mb-8 text-[#117DD5]" >
          404
        </h1>
        <p className="text-2xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <br />
          <button onClick={handlenavigate} className='py-2 bg-[#0145d4] font-bold px-4 rounded-2xl'>Go To Website</button>
      </div>
    </div>
    )
}