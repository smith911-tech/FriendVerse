import logo from '../src/assets/Logo.png'
export default function Preloader() {
  return (
        <div className='bg-[#1B1D21] h-screen preloader'>
          <img src={logo} alt="Logo" className="preloader-spinner" />
        </div>
  );
}