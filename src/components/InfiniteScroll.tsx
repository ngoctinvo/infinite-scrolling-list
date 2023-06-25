import React, { useEffect, useState } from "react";
import { fetchProducts, searchProduct } from "../api/product";
import ProductList from "./ProductList";
import { ProductType } from "../types/product";
import { styled, InputBase } from '@mui/material';

const StyledInput = styled(InputBase)`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #f2f2f2;
  border: none;
  outline: none;

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    background-color: #ffffff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
`;
const ScrollList: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 20;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  const fetchNextProducts = async () => {
    const newProducts = await fetchProducts(skip, limit);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setSkip((prevSkip) => prevSkip + limit);
  };

  const searchProducts = async (query: string) => {
    const searchedProducts = await searchProduct(query);
    setFilteredProducts(searchedProducts);
  };

  const clearSearch = () => {
    setFilteredProducts(products);
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      const initialProducts = await fetchProducts(skip, limit);
      setProducts(initialProducts);
      setFilteredProducts(initialProducts);
      setSkip(skip + limit);
    };

    fetchInitialProducts();
  }, []);

  useEffect(() => {
    let isFetching = false;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const threshold = 200; // Distance from the bottom of the page

      if (!isFetching && scrollTop + clientHeight >= scrollHeight - threshold) {
        isFetching = true;
        fetchNextProducts()
          .then(() => {
            isFetching = false;
          })
          .catch((error) => {
            console.error("Error fetching next products:", error);
            isFetching = false;
          });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      searchProducts(query);
    } else {
      clearSearch();
    }
  };

  return (
    <div>
        <StyledInput
      type="text"
      value={searchQuery}
      onChange={handleSearchInputChange}
      placeholder="Search products"
    />
 
      <h1>Product List</h1>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ScrollList;




// import React, { useEffect, useState } from "react";
// import { fetchProducts } from "../api/product";
// import ProductList from "./ProductList";
// import { ProductType } from "../types/product";

// const ScrollList: React.FC = () => {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [skip, setSkip] = useState(0);
//   const limit = 20;

//   const fetchNextProducts = async () => {
//     const newProducts = await fetchProducts(skip, limit);
//     setProducts((prevProducts) => [...prevProducts, ...newProducts]);
//     setSkip((prevSkip) => prevSkip + limit);
//   };

//   useEffect(() => {
//     const fetchInitialProducts = async () => {
//       const initialProducts = await fetchProducts(skip, limit);
//       setProducts(initialProducts);
//       setSkip(skip + limit);
//     };

//     fetchInitialProducts();
//   }, []);

//   useEffect(() => {
//   let isFetching = false;

//   const handleScroll = () => {
//     const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
//     const threshold = 200; // Distance from the bottom of the page

//     if (!isFetching && scrollTop + clientHeight >= scrollHeight - threshold) {
//       isFetching = true;
//       fetchNextProducts()
//         .then(() => {
//           isFetching = false;
//         })
//         .catch((error) => {
//           console.error("Error fetching next products:", error);
//           isFetching = false;
//         });
//     }
//   };

//   window.addEventListener("scroll", handleScroll);

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, [products]);

//   return (
//     <div>
//       <h1>Product List</h1>
//       <ProductList products={products} />
//     </div>
//   );
// };

// export default ScrollList;
