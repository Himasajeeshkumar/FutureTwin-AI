import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({

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

      const data = await loginUser(form);

      if (data.error) {

        setError(data.error);

      }

      else {

        login(data);

        navigate("/dashboard");

      }

    }

    catch (err) {

      setError("Login failed.");

    }

    setLoading(false);

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>FutureTwin AI</h1>

        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>

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

          {error &&

            <p className="error">

              {error}

            </p>

          }

          <button disabled={loading}>

            {

              loading

              ?

              "Logging in..."

              :

              "Login"

            }

          </button>

        </form>

        <p>

          Don't have an account?

          <Link to="/signup">

            {" "}Sign Up

          </Link>

        </p>

        <Link
            to="/forgot-password"
            className="forgot-link"
        >
            Forgot Password?
        </Link>

      </div>

    </div>

  );

}

export default Login;