import { useState } from "react";
// import pb from "../lib/pocketbase";
// import { useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";


export default function Auth() {
  const { user, login } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await login(email, password)
    } catch (error) {
      console.error('Error logging in:', error)
    }

    
    // try {
    //   const { data, error } = await pb
    //     .collection("users")
    //     .authWithPassword(email, password);
    //   if (error) {
    //     console.error("Error logging in:", error);
    //     // Clear form after submission
    //     setEmail("");
    //     setPassword("");
    //   } else {
    //     console.log("Logged in successfully:", data);
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.error("Error logging in:", error);
    //   setEmail("");
    //     setPassword("")
    // }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
