export default function DashboardStats({userLogs, graphData}) {
    // Get today's logs
    const currentDate = new Date()
    const formatedDate = currentDate.toLocaleDateString('en-CA')
    console.log('the currentDate is:', formatedDate)
    const todaysLogs = userLogs.filter(log => log.date.slice(0, 10) === formatedDate)
    console.log('todays logs are:', todaysLogs)

    // Get total time for today


    // Get total languages studied today


    //
    return (
        <div>
            <ul>
                <li>
                    <span>Activities Logged: {todaysLogs.length}</span>
                </li>
                <li>
                    <span>Time Today: {graphData[6] ? graphData[6].y : 0}</span>
                </li>
            </ul>
        </div>
    )
}