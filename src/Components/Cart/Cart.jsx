import React, { useContext} from 'react'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {

let {numOfCartItems,totalCartPrice,products,updateCart,deleteCartItem,deleteCart} =  useContext(CartContext)

async function handleUpdate(prodId,count){
let response = await updateCart(prodId,count)
if(response.data.status==='success'){
  toast.success('Products Updated',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "👌",
    }
  )
}else{
  toast.error('Error',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
    }
    
  )
}
}

async function handleDelete(prodId){
let response = await deleteCartItem(prodId)
if(response.data.status==='success'){
  toast.success('Product Deleted',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❌",
    })
}else{
  toast.error('Error',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
    })
}
}

async function handleDeleteCart(){
let response = await deleteCart()
if(response.data.status!=='success'){
  toast.success('Products Deleted',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❌",
      
    })
}else{
  toast.error('Error',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
    })
}
}

  return <>
  <Helmet>
    <title>Cart</title>
  </Helmet>
  {products?  <div>
<div className="container mx-auto px-10 py-4 my-5 rounded bg-gray-100">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
    <h1 className="text-3xl font-medium my-4">Cart Shop</h1>
    <Link to="/checkout">
    <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-normal text-xl py-3 px-5 rounded-xl">
      check out
    </button>
    </Link>
  </div>
  <div className='flex justify-between'>
    <h3 className='text-xl font-medium text-gray-800'>total price : <span className='text-green-400'>{totalCartPrice}</span> </h3>
    <h3 className='text-xl font-medium text-gray-800'>total number of items : <span className='text-green-400'>{numOfCartItems}</span> </h3>
  </div>
  <div className="mt-8">
    {products?.map((prod)=>{return  <div key={prod?.product?._id} className=" flex flex-col md:flex-row border-b border-gray-300 py-4 items-center">
      <div className="flex-shrink-0">
        <img src={prod?.product?.imageCover} alt={prod?.name} className="w-40 h-60 object-cover" />
      </div>
      <div className="mt-4 md:mt-0 md:ml-6 flex justify-between w-full">
       <div>
         <h2 className="text-lg font-medium">{prod?.product?.title}</h2>
        <h3 className="mt-2 font-medium">{prod?.price} EGP</h3>
        <h3 onClick={()=>{handleDelete(prod?.product?._id)}} className='text-red-600 mt-3 cursor-pointer'><i className="fa-solid fa-trash"></i>Remove</h3>
       </div>
        <div className="mt-4 flex items-center">
          
          <div className="flex items-center">
            <button onClick={()=>{handleUpdate(prod?.product?._id,prod?.count+1)}} className="border border-green-600 rounded-lg px-3 py-2 cursor-pointer " >+</button>
            <span className="mx-2 text-gray-600">{prod?.count}</span>
            <button onClick={()=>{handleUpdate(prod?.product?._id,prod?.count-1)}} className=" border border-green-600 rounded-lg px-3 py-2 cursor-pointer" >-</button>
          </div>
          
        </div>
      </div>
      
    </div>})}
   
   
  </div>
  <div className="flex justify-center items-center mt-8">
    <button onClick={handleDeleteCart} className='border border-outline-none py-3 px-5 text-xl font-light rounded-xl  border-green-500 cursor-pointer'>Clear Your Cart</button>
  </div>
</div>
  </div> :  <div>
 <div className="container mx-auto px-10 py-4 my-20 rounded bg-gray-100">
     <div className='flex justify-between my-10'>
 <div>
   <h2  className="text-3xl font-medium my-4">Cart Shop</h2>
   <h3 className='text-xl font-medium text-gray-800 mt-10'>total price : <span className='text-green-400'>{totalCartPrice}</span></h3>
 </div>
 <div>
   <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-normal text-xl py-3 px-5 rounded-xl">
      check out
    </button>
    <h3  className='text-xl font-medium text-gray-800 mt-10'>total number of items : <span className='text-green-400'>{numOfCartItems}</span></h3>
 </div>
 
</div>
 <div className="flex justify-center items-center mt-8">
    <button className='border border-outline-none mb-10 py-3 px-5 text-xl font-light rounded-xl  border-green-500 cursor-pointer'>Clear Your Cart</button>
  </div>
 </div>
  </div> }
  </>
}
