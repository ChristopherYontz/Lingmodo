import { useState } from "react";
import { UserAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = UserAuth();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      setEmail("")
      setPassword("")
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
    </div>
  );
};

export default LoginPage