import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await signup(form);

      if (data.error) {
        setError(data.error);
      } else {
        alert("Signup Successful!");
        navigate("/login");
      }
    } catch (err) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>FutureTwin AI</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <button disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;