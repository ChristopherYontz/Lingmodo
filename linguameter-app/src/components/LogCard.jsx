export default function LogCard () {
    return (
    <div className="background-layer card w-96 shadow-xl flex flex-col">
        <div className="top-part-container rounded-t-[1rem] h-[3.625rem] bg-green-500">
            <div className="top-part-info flex flex-row justify-between">
                <h1>Username</h1>
                <span>Date</span>
            </div>
        </div>
        <div className="bottom-part rounded-b-[1rem] h-[5.125rem] bg-white">
            <div className="bottom-part-info">
                <h1>Activity Name</h1>
                <div className="activity-info flex justify-between">
                    <span>Time</span>
                    <span>Type</span>
                    <span>Language</span>
                </div>
            </div>
        </div>
    </div>
    )
}