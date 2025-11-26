import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailId, setEmailId] = useState("Harvey@gmail.com");
  const [password, setPassword] = useState("Harvey@1994new2");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const loginData = {
      emailId,
      password,
    };
    try {
      const url = `${API_URL}/login`;
      const response = await axios.post(url, loginData, {
        withCredentials: true,
      });
      console.log(response);
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong"
      );
    }
  };
  return (
    <div className="card-container">
      <div className="card bg-base-100 w-100 shadow-sm">
        <div className="card-body text-center">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={emailId}
                placeholder="mail@site.com"
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </fieldset>
          {error && <small className="text-red-500">{error}</small>}

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
