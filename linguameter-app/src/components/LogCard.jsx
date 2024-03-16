export default function LogCard() {

  return (
    <div className="card-container w-[30.125rem] h-[8.75rem] shadow-lg rounded-[1rem]">
      <div className="card-top bg-green-primary flex flex-row justify-between rounded-t-[1rem] h-2/5">
        <div className="card-top-left">
          <div className="img-container w-[2.688] h-[2.688]">
            <img src='#' alt="profile-picture object-cover" />
          </div>
          <span>Username</span>
        </div>
        <div className="card-top-right">
          <span>Date</span>
        </div>
      </div>
      <div className="card-bottom bg-white rounded-b-[1rem] h-3/5">
        <h3>Activity Name</h3>
        <div className="activity-info flex flex-row justify-between">
          <span>Duration</span>
          <span>Type</span>
          <span>Language</span>
        </div>
      </div>
    </div>
  );
}
