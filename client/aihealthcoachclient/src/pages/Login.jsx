import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {

        // JWT ko temporarily localStorage mein store
        localStorage.setItem("token", data.token);

        setMessage("Login successful!");

        navigate("/dashboard");

      } else {

        setMessage(data.message);

      }

    } catch (error) {

      console.error(error);

      setMessage("Server error");

    }
  };

  return (
  <div className="auth-page">

    <div className="auth-card">

      {/* LEFT */}

      <div className="auth-left">

        <div className="auth-logo">
          AI HEALTH COACH
        </div>

        <h1>
          Welcome<br />
          Back 👋
        </h1>

        <p>
          Continue your health journey with
          personalized insights and smarter goals.
        </p>

        <button
          className="secondary-btn"
          onClick={() => navigate("/register")}
        >
          Create New Account
        </button>

      </div>


      {/* RIGHT */}

      <div className="auth-right">

        <h2>Welcome Back</h2>

        <p className="auth-subtitle">
          Login to continue to your dashboard
        </p>


        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>


          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>


          <button
            type="submit"
            className="primary-btn"
          >
            Login →
          </button>

        </form>


        <p className="auth-message">
          {message}
        </p>

      </div>

    </div>

  </div>
);
}

export default Login;