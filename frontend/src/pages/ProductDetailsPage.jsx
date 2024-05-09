import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id: productId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();
        setSingleProduct(data);
      } catch (error) {
        console.log("Data Error", error);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);

  return singleProduct ? (
    <ProductDetails singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
  ) : (
    <p>Product uploading..</p>
  );
};

export default ProductDetailsPage;
