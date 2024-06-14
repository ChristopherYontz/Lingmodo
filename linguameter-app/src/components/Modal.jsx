import { useState, useEffect } from "react";

function Modal({ setOpenModal, userID, pb, refreshUserLogs }) {
  const getLocalDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split("T")[0];
  };

  //   console.log('Debugging:', user)

  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const [formData, setFormData] = useState({
    activity: "",
    language: "Spanish",
    activity_type: "Listening",
    duration: 0,
    date: getLocalDate(),
    tag: "",
    created_by: userID,
    word_count: 0,
  });

  const [postData, setPostData] = useState({
    language: "Spanish",
    text: "",
    title: "",
    created_by: userID,
  });

  useEffect(() => {
    if (formData.activity_type === "Reading") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        duration: 0, // Reset duration to 0 when activity_type is "Reading"
      }));
    }

    if (formData.activity_type !== "Reading") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        word_count: 0,
      }));
    }
  }, [formData.activity_type]);

  // const [readingFormData, setReadingFormData] = useState({
  //   title: "",
  //   language: "",
  //   activity_type: "",
  //   word_count: 0,
  //   date: getLocalDate(),
  //   tag: "",
  //   created_by: userID,
  // })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  // Submit Listening/Speaking Logs
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      await pb.collection("logs").create(formData);
      setOpenModal(false);
      refreshUserLogs();
    } catch (error) {
      console.error("Log submission failed:", error);
    }
  };

  // Submit Reading Logs
  // const handleReadingLogsSubmit = async (e) => {
  //   e.preventDefault()
  //   console.log('Reading Log submitted:', readingFormData)
  // }

  // Submit Progress Posts
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log("Progress update submitted:", postData);
    try {
      await pb.collection("progress_updates").create(postData);
      setOpenModal(false);
      refreshUserLogs();
    } catch (error) {
      console.error("Log submission failed:", error);
    }
  };

  const langOptions = [
    "Spanish",
    "English",
    "German",
    "French",
    "Chinese",
    "Japanese",
  ];

  const typeOptions = ["Listening", "Speaking", "Reading"];

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title inter-bold entry-options">
          <button
            onClick={handleClick}
            className={!isSelected ? "colored-btn" : "uncolored-btn"}
          >
            Activity Log
          </button>
          <button
            onClick={handleClick}
            className={isSelected ? "colored-btn" : "uncolored-btn"}
          >
            Progress Post
          </button>
        </div>
        <div className="body">
          {isSelected ? (
            <div>
              <h1>Progress Report</h1>
              <form onSubmit={handlePostSubmit}>
                <div className="formInput">
                  <label htmlFor="language">Language</label>
                  <select
                    type="select"
                    name="language"
                    required
                    value={formData.language}
                    onChange={handlePostChange}
                  >
                    {langOptions.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="formInput">
                <label htmlFor="title">Post Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Post Title"
                  required
                  value={postData.title}
                  onChange={handlePostChange}
                />
              </div>
                <div className="formInput">
                  <label htmlFor="text">Progress Report</label>
                  <textarea
                    type="text"
                    name="text"
                    required
                    value={postData.text}
                    onChange={handlePostChange}
                  ></textarea>
                </div>
                <button type="submit" className="inter-semi-bold">
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="language">Language</label>
                <select
                  type="select"
                  name="language"
                  required
                  value={formData.language}
                  onChange={handleChange}
                >
                  {langOptions.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="activity_type">Type</label>
                <select
                  type="select"
                  name="activity_type"
                  required
                  value={formData.activity_type}
                  onChange={handleChange}
                >
                  {typeOptions.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="activity">Activity</label>
                <input
                  type="text"
                  name="activity"
                  placeholder="Activity Name"
                  required
                  value={formData.activity}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="tag">Tag</label>
                <input
                  type="text"
                  name="tag"
                  placeholder="Add a tag"
                  required
                  value={formData.tag}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="duration">Duration</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="0"
                  required
                  value={formData.duration}
                  onChange={handleChange}
                  disabled={formData.activity_type === "Reading"}
                />
              </div>
              <div className="formInput">
                <label htmlFor="word_count">Word Count</label>
                <input
                  type="number"
                  name="word_count"
                  placeholder="0"
                  required
                  value={formData.word_count}
                  onChange={handleChange}
                  disabled={formData.activity_type !== "Reading"}
                />
              </div>
              <button type="submit" className="inter-semi-bold">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
