import axios from "axios";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "../styles/admin.css";

function Admin() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "option1",
    inStock: "",
    imageSrc: ""
  });
  const [image, setImage] = useState("");
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    console.log("product data:\n" + data);
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/addProducts";
      const res = await axios.post(url, data);

      if (res.data.message) {
        setMessage(res.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
      console.log("internal server error");
    }
  };

  const convtToBase64 = (e:any) =>{
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      if (typeof reader.result === "string") {
        setImage(reader.result);    // Safe to set since it's a string
        setData({ ...data, imageSrc: reader.result });
      }
    }
    reader.onerror= error =>{
      console.log(error);
      
    }
  }

  return (
    <div>
      <br></br>
      <p className="text">Add Product</p>
      <br></br>
      <form method="post" onSubmit={handleSubmit}>
        {/* Name */}
        <FloatingLabel
          controlId="floatingInput"
          label="Product Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="name"
            placeholder="name"
            value={data.name}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* Description */}
        <FloatingLabel
          controlId="floatingInput"
          label="Product Description"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="description"
            placeholder="description"
            value={data.description}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* Price */}
        <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
          <Form.Control
            type="text"
            name="price"
            placeholder="price"
            value={data.price}
            onChange={handleChange}
          />
        </FloatingLabel>

        {/* Category */}
        <FloatingLabel
          controlId="floatingCategory"
          label="Category"
          className="mb-3"
        >
          <Form.Select
            name="category"
            value={data.category}
            onChange={handleChange}
            aria-label="Category"
          >
            <option value="option1">Action</option>
            <option value="option2">Option 1</option>
            <option value="option3">Option 2</option>
          </Form.Select>
        </FloatingLabel>

        {/* In Stock */}
        <div className="radio-buttons">
          <label className="form-label"> In Stock</label>
          <Form.Check
            type="radio"
            id="trueOption"
            label="True"
            name="inStock"
            value="true"
            onChange={handleChange}
            checked={data.inStock === "true"}
          />
          <Form.Check
            type="radio"
            id="falseOption"
            label="False"
            name="inStock"
            value="false"
            onChange={handleChange}
            checked={data.inStock === "false"}
          />
        </div>

        <br/>
        <label className="form-label" > Image</label>
        <input onChange={convtToBase64} type="file"></input>
        <br/>
        {image==""||image==null?"":<img width={100} height={100} src={image}/> }

        <input
          type="submit"
          className="sbmt-btn"
          value={"Add Product"}
          
          />
        <p className="error">{message}</p>
      </form>
    </div>
  );
}

export default Admin;
