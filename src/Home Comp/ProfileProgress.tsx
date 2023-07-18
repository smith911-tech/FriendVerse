// @ts-ignore
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
export default function ProfileProgress() {
    return(
        <div className=' rounded-lg shadow-lg p-4 select-none mb-8 bg-white progress'>
            <h2 className=' text-lg font-semibold mb-2'>Complete your Profile</h2>
            <Progress
                percent={20}
                type="circle" 
                
                theme={{
                    success: {
                        symbol: '🏄‍'
                    }
                }}
            />
        </div>
    )
}