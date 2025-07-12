import React, { useContext} from 'react'
import { WishlistContext } from '../Context/WishlistContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Wishlist() {

let {deleteWishItem,getWishlistItem,products,addToWishlist} =useContext(WishlistContext)



async function handleDelete(prodId){
let response = await deleteWishItem(prodId)
if(response.data.status==='success'){
  toast.success('Product Deleted',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❌",
    })

    getWishlistItem()
}else{
  toast.error('Error',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
    })
}
}

  async function addProdToWishlist(prodId) {
    let response = await addToWishlist(prodId)
    if (response.data.status === 'success') {
      toast.success(response?.data?.message, {
        position: "top-right",
        style: { backgroundColor: "#479747", color: "#FFFFFF", padding: "20px", borderRadius: "5px" },
        icon: "🛺",
      })

      getWishlistItem()
    } else {
      toast.error(response?.data?.message,{
         position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
      })
    }
  }

  return <>
  <Helmet>
    <title>Wishlist</title>
  </Helmet>
 {products?   <div className="container mx-auto px-10 py-10 rounded my-5 mt-20 bg-gray-100">
   <div className="flex flex-col md:flex-row md:justify-between md:items-center">
 <h1 className="text-3xl font-medium my-4">My Wish List</h1>
 
   </div>
   
   <div className="mt-8">
     {products?.map((prod)=>{return  <div key={prod._id} className=" flex flex-col md:flex-row border-b border-gray-300 py-4 items-center">
 <div className="flex-shrink-0">

   <img src={prod?.imageCover} alt={prod?.title} className="w-40 h-60 object-cover" />
 </div>
 <div className="mt-4 md:mt-0 md:ml-6 flex justify-between w-full">
   <div>
          <h2 className="text-lg font-medium">{prod?.title}</h2>
         <h3 className="mt-2 font-medium">{prod?.price} EGP</h3>
         <h3  onClick={()=>{handleDelete(prod?._id)}}  className='text-red-600 mt-3 cursor-pointer'><i className="fa-solid fa-trash"></i>Remove</h3>
        </div>
          <div className='flex justify-end items-center'>
    <button onClick={() => { addProdToWishlist(prod?._id) }} className=" cursor-pointer border border-green-600 border-outline-none font-normal text-xl py-3 px-5 rounded-xl">
       add to cart
     </button>
 </div>
 </div>
 </div>})}

  </div>
  </div> :    <div>
    <div className="container mx-auto px-10 my-20 rounded bg-gray-100">
    <div className='flex justify-between my-10'>
 <div>
   <h2  className="text-3xl font-medium my-4">My Wish List</h2>
 
 </div>
 </div>
 </div>
 </div>
  }

  </>
}