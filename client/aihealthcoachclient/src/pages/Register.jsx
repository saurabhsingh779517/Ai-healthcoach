
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/register",
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

        setMessage("Registration successful!");

        // Registration successful hone ke baad Login page
        navigate("/login");

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
          Start Your<br />
          Health Journey 🚀
        </h1>

        <p>
          Create your account and take the first
          step towards a healthier and smarter lifestyle.
        </p>

        <button
          className="secondary-btn"
          onClick={() => navigate("/login")}
        >
          Already have an account?
        </button>

      </div>


      {/* RIGHT */}

      <div className="auth-right">

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Join AI Health Coach today
        </p>


        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>


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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>


          <button
            type="submit"
            className="primary-btn"
          >
            Create Account →
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

export default Register;

