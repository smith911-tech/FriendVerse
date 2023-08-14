interface userDatas{
    userData: any | null
}
import FollowersFollowingH from '../FollowingFollowersH'

export default function Following({userData}: userDatas) {
    return (
        <main>
            <FollowersFollowingH userData={userData}/>
        </main>
    )
}