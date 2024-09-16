import axios from "axios";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    name:"",
    age: "",
    email: "",
    address: "",
    phone: "",
    password: ""
  });
  const [error, setError] = useState("");
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    console.log(data);
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/signup";

      await axios.post(url, data);
        navigate("/login")
      
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        {/* Username */}
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

        {/* Name */}
        <FloatingLabel
          controlId="floatingInput"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="string"
            name="name"
            placeholder="name"
            value={data.name}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* age */}
        <FloatingLabel
          controlId="floatingInput"
          label="Age"
          className="mb-3"
        >
          <Form.Control
            type="string"
            name="age"
            placeholder="age"
            value={data.age}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* email */}
        <FloatingLabel
          controlId="floatingInput"
          label="Email"
          className="mb-3"
        >
          <Form.Control
            type="string"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* address */}
        <FloatingLabel
          controlId="floatingInput"
          label="Address"
          className="mb-3"
        >
          <Form.Control
            type="string"
            name="address"
            placeholder="address"
            value={data.address}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* phone */}
        <FloatingLabel
          controlId="floatingInput"
          label="Phone Number"
          className="mb-3"
        >
          <Form.Control
            type="string"
            name="phone"
            placeholder="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* password */}
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </FloatingLabel>
        <input type="submit" className="sbmt-btn" value={"Signup"} />
      <p className="error">{error}</p>
      </form>
      <p>Already a registered user?<Link to={'/login'}>Login</Link> </p>
    </div>
  );
};

export default Signup;
