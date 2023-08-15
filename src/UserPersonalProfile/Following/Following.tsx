import { BiSolidUserCircle, BiDotsHorizontalRounded } from 'react-icons/bi';
import FollowersFollowingH from '../FollowingFollowersH';
import { useThemeStore } from '../../Zustand';

interface UserDatas {
    userData: any;
    SuggestData: any;
}

export default function Following({ userData, SuggestData }: UserDatas) {
    const theme = useThemeStore((state: any) => state.theme);
    const followingIds = new Set(userData && userData.Following);
    const suggestedUsers = SuggestData && SuggestData.filter((user: any) => followingIds.has(user.id));

    return (
        <main className={`min-h-[85vh] ${theme ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <FollowersFollowingH />
            <section className='px-2 flex flex-col gap-2 w-full'>
                {suggestedUsers.map((user: any) => (
                    <main key={user.id} >
                        <section className='flex w-full'>
                        <div>
                            {user.profileImage === '' ? (
                                <div className={`text-[52px] rounded-full ${theme ? 'text-white' : 'text-[#000000d7]'}`}>
                                    <BiSolidUserCircle />
                                </div>
                            ) : (
                                <img src={user.profileImage} alt='Profile' className='w-12 h-12 rounded-full object-cover' />
                            )}
                        </div>
                        <section className='flex flex-col ml-1'>
                            <p className='font-bold text-lg'>{user.fullName}</p>
                            <p className={`-mt-[2px] font-semibold text-sm ${theme ? 'text-[#ffffffc3]' : 'text-[#0000009f]'}`}>
                                @{user.username}
                            </p>
                        </section>
                        <div className='ml-auto'>
                            <aside className='flex gap-2'>
                            <button className={` font-medium py-1 px-3 rounded-full ${theme 
                            ? "bg-[#ffffff] text-[black]" 
                            : "bg-[#000000a5] text-[white]"}`}>Follow</button>
                            <div className='text-3xl'>
                                    <BiDotsHorizontalRounded />
                            </div>
                            </aside>
                        </div>
                        </section>
                        <p className='font-medium  ml-[52px]'>{user.bio}</p>
                    </main>
                ))}
            </section>
        </main>
    );
}
