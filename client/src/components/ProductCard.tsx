import { useState } from "react";
import axios from "axios";
import "../styles/productcard.css";

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
  refreshProducts: () => void; // Add refresh function as a prop
}

function ProductCard(props: ProductProps) {
  {
    console.log(props);
  }
  const deleteHandler = async (id: string) => {
    const url = `http://localhost:8000/api/deleteProduct/${id}`;
    try {
      console.log("Deleted product", id);
      await axios.delete(url);
      props.refreshProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const [cart, setCart] = useState([]);
  const cartHandler = (product: ProductProps) => {
    setCart((prevCart: any) => {
      const itemExists = prevCart.find((item: any) => item._id === product._id);
      if (itemExists) {
        return prevCart.map((item: any) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    console.log(cart);
  };

  return (
    <div className="product-card">
      {props.imageSrc && <img width={100} height={100} src={props.imageSrc} />}
      <h1>{props.name}</h1>${props.price}
      <p>{props.category}</p>
      <p>{props.description}</p>
      <button onClick={() => deleteHandler(props._id)}>Delete</button>
      <button onClick={() => cartHandler(props)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
