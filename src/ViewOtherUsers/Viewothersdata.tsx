interface userDatas{
    data: any; 
    SuggestData: any[];
}

export default function ViewUsersData({data, SuggestData}: userDatas){
    console.log(SuggestData && data);
    
    return(
        <main>
        </main>
    )
}