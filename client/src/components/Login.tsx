import axios from "axios";
import { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";
import { LoginContext } from "../LoginContext";

const Login = () => {
  const AuthContext = useContext(LoginContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    console.log(data);
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/login";

      const res = await axios.post(url, data);

      window.localStorage.setItem("isLoggedin", "true");
      AuthContext?.setIsLoggedIn(true);
      window.localStorage.setItem("UserType", res.data.userRole);
      AuthContext?.setUserType(res.data.userRole);
      window.localStorage.setItem(
        "userinfo",
        JSON.stringify(res.data.userinfo)
      );

      navigate("/");
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <form method="post" onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="string"
              name="username"
              placeholder="username"
              value={data.username}
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </FloatingLabel>
          <input type="submit" className="sbmt-btn" value={"Login"} />

          <p className="error">{error}</p>
          <p>
            Not a registered user yet? <Link to={"/signup"}>Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
