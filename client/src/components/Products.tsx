import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  imageSrc: string;
}
function Products() {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    const url = "http://localhost:8000/api/getProducts";
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(url);
        setData(response.data);
        // console.log(response.data);
      } catch (error) {}
    };
    fetchProducts();
  },[data]);

  return (
    <div>
      {data.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
          category={product.category}
          inStock={product.inStock}
          imageSrc={product.imageSrc}
        />
      ))}
    </div>
  );
}

export default Products;
