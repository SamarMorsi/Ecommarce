import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function RecentProducts() {
  let { addToCart } = useContext(CartContext)

  let [allProducts, setAllProducts] = useState(null)
  let [searchTerm, setSearchTerm] = useState("")
  let [filteredProducts, setFilteredProducts] = useState([])

  async function addProdToCart(prodId) {
    let response = await addToCart(prodId)
    if (response.data.status === 'success') {
      toast.success(response?.data?.message, {
        position: "top-right",
        style: { backgroundColor: "#479747", color: "#FFFFFF", padding: "20px", borderRadius: "5px" },
        icon: "🛺",
      })
    } else {
      toast.error(response?.data?.message,{
         position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
      })
    }
  }


  async function addProductWishlist(prodId) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    productId: prodId
  }, {
    headers: { token: localStorage.getItem('usertoken') }
  });
}


async function ProductWishlist(prodId) {
  try {
    let response = await addProductWishlist(prodId);
    if (response?.data?.status === 'success') {
      toast.success(response?.data?.message, {
        position: "top-right",
        style: { backgroundColor: "#479747", color: "#FFFFFF", padding: "20px", borderRadius: "5px" },
        icon: "❤️",
      });
    } else {
      toast.error(response?.data?.message,{
         position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
      });
    }
  } catch (error) {
    console.log(error);
    
  } 
}


  function getAllProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        setAllProducts(data?.data)
        setFilteredProducts(data?.data) 
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(allProducts)
    } else {
      let filtered = allProducts?.filter(prod =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducts(filtered)
    }
  }, [searchTerm, allProducts])


  return <>
  <Helmet>
    <title>Products</title>
  </Helmet>
    {filteredProducts?.length > 0 ?
      <div>
        <div className="flex justify-center items-center">
          <input
            className="mt-10 text-md py-2 md:w-3xl lg:w-5xl xl:w-6xl px-2 focus:outline-none border border-gray-300 focus:border-4 focus:ring-blue-200 shadow-sm focus:border-blue-300 focus:transition-all placeholder-gray-400  rounded-xl"
             type="search" name="q" placeholder="search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-y-3 flex-wrap mt-10">
          {filteredProducts?.map((prod) => (
            <div key={prod?.id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
              <div className="product p-3 relative group rounded overflow-hidden hover:shadow-lg hover:shadow-green-700/70 transition-shadow duration-300">
                <Link to={`/productdetails/${prod.id}/${prod?.category?.name}`}>
                  <img src={prod?.imageCover} alt={prod?.title} className='w-full' />
                  <span className='text-green-600'>{prod?.category?.name}</span>
                  <h3 className='mt-4 mb-3 font-medium'>{prod?.title?.split(' ').splice(0, 2).join(' ')}</h3>
                  <div className='flex justify-between'>
                    <span>{prod?.price} EGP</span>
                    <span><i className='fas fa-star text-yellow-500'></i>{prod?.ratingsAverage}</span>
                  </div>
                  
                </Link>
                <i tabIndex="0" onClick={()=>{ProductWishlist(prod?._id)}}  className='fa-solid fa-heart text-2xl mt-5 block text-right w-full focus focus:text-red-700'></i>
                <button onClick={() => { addProdToCart(prod?._id) }}
                  className='absolute bottom-[-100px] left-0 w-52 ms-14 cursor-pointer bg-green-500 text-white py-2 rounded-md opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-3 group-hover:opacity-100 group-hover:ring-1 z-10'>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      : <Spinner />}
  </>
}
