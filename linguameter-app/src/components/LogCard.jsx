export default function LogCard({userLogs}) {
  return (
      <div id="logs">
        {userLogs.length > 0 ? (
          userLogs.map((log) => (
            <div key={log.id} className="card-tile">
              <div className="card-tile-head bg-primary-color-1">
                <div className="profile">
                  <img
                    className="rounded-full"
                    src={`http://127.0.0.1:8090/api/files/users/${log.expand.created_by.id}/${log.expand.created_by.avatar}`}
                    alt="Profile Picture"
                  />
                </div>
                <div>
                  <h4 className="text-utility-color-1 text-top inter-medium">
                    @{log.expand.created_by.username}
                  </h4>
                </div>
                <div className="spacer"></div>
                <div className="text-utility-color-1">
                  {log.date.slice(0, 10)}
                </div>
              </div>

              <div className="card-tile-body bg-white">
                <h2 className="card-title text-utility-color-2 inter-bold mb-1">
                  {log.activity}
                </h2>
                {log.activity_type === "Reading" ? (
                  <div className="grid grid-cols-3 justify-between text-utility-color-3 font-semibold">
                    <div className="flex flex-row gap-x-1 justify-start">
                      <img className="w-5" src="/clock.svg" alt="Clock" />
                      <span>{log.word_count} words</span>
                    </div>
                    <div className="flex flex-row gap-x-1 justify-center">
                      <img className="w-5" src="/volume-1.svg" alt="Volume" />
                      <span>{log.activity_type}</span>
                    </div>
                    <div className="flex flex-row gap-x-1 justify-end">
                      <img className="w-5" src="/clock.svg" alt="Clock" />
                      <span>{log.language}</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 justify-between text-utility-color-3 font-semibold">
                    <div className="flex flex-row gap-x-1 justify-start">
                      <img className="w-5" src="/clock.svg" alt="Clock" />
                      <span>{log.duration} minutes</span>
                    </div>
                    <div className="flex flex-row gap-x-1 justify-center">
                      <img className="w-5" src="/volume-1.svg" alt="Volume" />
                      <span>{log.activity_type}</span>
                    </div>
                    <div className="flex flex-row gap-x-1 justify-end">
                      <img className="w-5" src="/clock.svg" alt="Clock" />
                      <span>{log.language}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No logs found.</h1>
        )}
      </div>
  );
}
