import logo from '../src/assets/Logo.png'
// ! Page Loading
import { useEffect } from 'react'
export default function Preloader() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
        <div className='bg-[#1B1D21] h-screen preloader'>
      <img src={logo} alt="Logo" className="preloader-logo" loading='lazy'/>
        </div>
  );
}        

