import "../styles/productcard.css";

import axios from "axios";
interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock?: boolean;
  imageSrc: string;
}

function ProductCard(props: ProductProps) {
  const deleteHandler = async (id: number) => {
    // alert(id)
    const url = `http://localhost:8000/api/deleteProduct/${id}`;
    axios.delete(url)
    .then(res=> console.log('deleted',res)).catch(err=>console.log(err))
  };

  return (
    <div className="product-card">
      {props.imageSrc==""||props.imageSrc==null?"":<img width={100} height={100} src={props.imageSrc}/> }
      <h1>
        {props.name}~{props.price}
      </h1>
      <p>{props.category}</p>
      <p>{props.description}</p>

      <button onClick={() => deleteHandler(props.id)}>Delete</button>
    </div>
  );
}

export default ProductCard;
