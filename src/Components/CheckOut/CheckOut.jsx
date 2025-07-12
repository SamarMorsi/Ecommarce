import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function CheckOut() {

  let navigate=useNavigate()
let [isOnline,setisOnline]=useState(true)

let validation=Yup.object().shape({
  details: Yup.string().required('details is required').min(3,'min 3 letters'),
  phone: Yup.string().required('phone is required').matches(/^01[01257][0-9]{8}$/, 'invalid phone'),
  city: Yup.string().required('city is required')
})

let {cartId,resetCart} = useContext(CartContext)
console.log(cartId,'id');

function payCash(val){
    
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        shippingAddress:val
    },{
        headers:{ token:localStorage.getItem('usertoken')}
    }).then((response)=>{
        console.log(response);
        if(response.data.status==='success'){
            toast.success('check out done ....',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "👌",
    })
            resetCart()
            navigate('/allorders');
        }else{
            toast.error('check out failed ....',{
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
    })
    
        }
    }).catch((error)=>{
        console.log(error)
    })
}

function payOnline(val){
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,{
    shippingAddress:val
  },{
    headers:{
      token:localStorage.getItem('usertoken')
    }
  }).then((response)=>{
    console.log(response);
    if(response.data.status==='success'){
      console.log(response.data.session.url);
      window.location.href=response.data.session.url
    
    }
    
  }).catch((error)=>{
    console.log(error);
    
  })

}

function detectPayment(val){
  if(isOnline){
    payOnline(val)
  }else{
    payCash(val)
  }
}

let formik=useFormik({
  initialValues:{
    details:"",
    phone:"",
    city:""
  },
  validationSchema:validation
  ,
  onSubmit:detectPayment
})

  return <>
  <Helmet>
    <title>Checkout</title>
  </Helmet>
 <div className=" flex h-screen py-10 px-4 sm:px-6 lg:px-8">
<div className="w-full  space-y-8">
<div className="bg-white  rounded-md p-6">
<form onSubmit={formik.handleSubmit} className=" space-y-6">
    <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 ">Details</label>
          <div className="mt-1">
            <input value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} id='details' name="details" type="text" autoComplete="details"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.details && formik.touched.details?<h5 className='bg-red-100 mt-2 py-4 ps-3 text-red-500 border border-red-300 rounded'>{formik.errors.details}</h5>:null}
          </div>

    <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 ">Phone</label>
          <div className="mt-1">
            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} id='phone' name="phone" type="tel" autoComplete="phone"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.phone && formik.touched.phone?<h5 className='bg-red-100 mt-2 py-4 ps-3 text-red-500 border border-red-300 rounded'>{formik.errors.phone}</h5>:null}
          </div>

    <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 ">City</label>
          <div className="mt-1">
            <input value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} id='city' name="city" type="text" autoComplete="city"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.city && formik.touched.city?<h5 className='bg-red-100 mt-2 py-4 ps-3 text-red-500 border border-red-300 rounded'>{formik.errors.city}</h5>:null}
          </div>

        
          <div>
          <button onClick={()=>{setisOnline(false)}}  type="submit" className="flex w-full justify-center rounded-md border mb-3 border-outline-none py-2 border-sky-300 px-4 text-l font-medium text-sky-300 cursor-pointer "> 
           Pay Cash 
          </button>


          <button onClick={()=>{setisOnline(true)}}  type="submit" className="flex w-full justify-center rounded-md border  border-outline-none py-2 border-sky-300 px-4 text-l font-medium text-sky-300 cursor-pointer "> 
           Pay Online
          </button>
        </div>
        
</form>
</div>
</div>
</div> 



  </>
}
