import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
}

function Products() {
  const [data, setData] = useState<Product[]>([]);
  
  const fetchProducts = async () => {
    const url = "http://localhost:8000/api/getProducts";
    try {
      const response = await axios.get<Product[]>(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("hello")
    fetchProducts();
  }, []);

  return (
    <div>
      {data.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          name={product.name}
          price={product.price}
          description={product.description}
          category={product.category}
          imageSrc={product.imageSrc}
          refreshProducts={fetchProducts}  /* Pass refresh function */
        />
      ))}
    </div>
  );
}

export default Products;
