import React, { useState, useEffect } from "react";
import axios from "axios";
import CatalogueItems from "./CatalogueItems";
  const API_BASE = "http://localhost:5000";

const SellerCatalogue = () => {
  const [products, setProducts] = useState({});
  const [flag, setFlag]=useState(0);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          API_BASE + "/seller/products/64c2981e5aea20c708e36441"
        );
        setProducts(response.data); // Set the retrieved product details to the state
        if (response.data.productImages && response.data.productImages.length > 0
        ) {
          setFlag(1); // Set the flag to 1 if there are product images
        }
        console.log("Product:", response.data); // Log the response.data directly
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

   return (
     <div>
       {flag && (
         <CatalogueItems
           key={products._id}
           name={products.name}
           type={products.type}
           price={products.price}
           model={products.model}
           special_feature={products.special_feature}
           imageUrl={products.productImages[0]}
         />
       )}
     </div>
   );
};

export default SellerCatalogue;
