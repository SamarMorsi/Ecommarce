import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext(null);

export default function WishlistContextProvider({ children }) {
  let [products, setProducts] = useState(null);
  let token = localStorage.getItem("usertoken");

  let headers = {
    token,
  };

  function resetWishlist() {
    setProducts(null);
  }

  function addToWishlist(prodId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: prodId },
        { headers }
      ).then((response) => {
        getWishlistItem()
      return response
    }
    ).catch((error) => {
      return error})
  }

  function getWishlistItem() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((response) => {
        console.log("Wishlist response:", response.data);
        setProducts(response?.data?.data);
        return response;
      }).catch((error) => {
        return error
      });
  }

  function deleteWishItem(prodId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,
        { headers }
      )
      .then((response) => {
        getWishlistItem()
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  useEffect(() => {
    if (token) {
      getWishlistItem();
    }
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{addToWishlist,deleteWishItem,resetWishlist,getWishlistItem,products}}
    >
      {children}
    </WishlistContext.Provider>
  );
}
