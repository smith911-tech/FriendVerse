import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
export default function Page404(){
  useEffect(() => {
      navigate('/Wrong-Link')
  }, [])
  const navigate = useNavigate()
    return(
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="p-8 bg-gray-800 shadow-lg rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-lg mb-6">
            The page you're looking for could not be found. Please check the URL and try again.
          </p>
          <Link
            to="/Home"
            className="text-blue-400 hover:underline bg-gray-700 py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
}