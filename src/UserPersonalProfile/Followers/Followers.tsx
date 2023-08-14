interface UserDatas{
    userData: any | null,
}

import FollowersFollowingH from '../FollowingFollowersH'

export default function Followers({userData}: UserDatas) {
    return(
        <main>
            <FollowersFollowingH userData={userData}/>
        </main>
    )
}