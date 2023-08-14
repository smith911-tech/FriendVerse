import FollowersFollowingH from '../FollowingFollowersH'
import { useThemeStore } from '../../Zustand';

export default function Followers() {
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <main className={`min-h-screen 
        ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
            <FollowersFollowingH />
        </main>
    )
}