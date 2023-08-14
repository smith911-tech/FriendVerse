import { useThemeStore } from '../../Zustand';
import OFollowingFollowersH from '../OFollowingFollowersH';
export default function OFollowingInterface() {
    const theme = useThemeStore((state: any) => state.theme);
    return(
        <main className={`min-h-screen 
        ${theme ? "bg-black text-white" : "bg-white text-black"}`}>
            <OFollowingFollowersH />
        </main>
    )
}