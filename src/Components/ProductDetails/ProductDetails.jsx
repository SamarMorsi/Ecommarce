import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {

   var settings = {
    dots: true,
    infinite: true,
    arrows: false ,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    let {id,category} =useParams()
    let { addToCart } = useContext(CartContext)


   let[prodDetails,setprodDetails]= useState(null)
   let[relatedProd,setrelatedProd]= useState(null)


function getAllProducts(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then(({data})=>{
    console.log('allprod', data?.data);
    console.log('category',category);
 let related =   data?.data.filter((prod)=>{return prod.category.name ===category})
 
    setrelatedProd(related)
    
  }).catch((error)=>{
console.log(error);

  })
}

    function getProductDetails(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
console.log(data?.data);
setprodDetails(data?.data)

        }).catch((error)=>{
            console.log(error);
        })
    }

useEffect(()=>{
getProductDetails();
getAllProducts();
},[id])


  async function addProdToCart(prodId) {
    let response = await addToCart(prodId)
    if (response.data.status === 'success') {
      toast.success(response?.data?.message, {
        position: "top-right",
        style: { backgroundColor: "#479747", color: "#FFFFFF", padding: "20px", borderRadius: "5px" },
        icon: "🛺",
      })
    } else {
      toast.error(response?.data?.message)
    }
  }

  return <>
  <Helmet>
    <title>product details</title>
  </Helmet>
  {prodDetails?  <div key={prodDetails?._id} className='flex flex-wrap items-center'>
<div className='w-full md:w-1/4'>
 <Slider {...settings}>
  <img className='w-full' src={prodDetails?.imageCover} alt={prodDetails?.title}/>
{prodDetails?.images?.map((src)=>{return  <img className='w-full' src={src} alt={prodDetails?.title}/>})}
 </Slider>

</div>

<div className='w-full md:w-3/4'>
<div>
    <h3 className='text-3xl font-medium'>{prodDetails?.title}</h3>
    <p className='text-slate-600 my-2'>{prodDetails?.description}</p>
    <span className='text-green-500 text-xl'>{prodDetails?.category?.name}</span>
     <div className='flex justify-between my-2'>
            <span>{prodDetails?.price} EGP</span>
            <span><i className='fas fa-star text-yellow-300'></i>{prodDetails?.ratingsAverage}</span>
        </div>
        <button onClick={() => { addProdToCart(prodDetails?._id) }} className='bg-green-500 cursor-pointer w-full py-2 rounded-md my-2'>Add To Cart</button>
</div>
</div>
  </div> :  <Spinner/>}
  
  <div className='my-10'>
    <h3 className='text-3xl text-green-600 my-3'>Related Products</h3>
    <div className='flex flex-wrap'>
      {relatedProd?.map((prod)=>{return <div className='w-full md:w-1/3 lg:w-1/4 xl:w-1/6'>
      
       <div className="product p-3">
    <Link to={`/productdetails/${prod.id}/${prod.category.name}`}>
    
      <img src={prod.imageCover} alt={prod.title} className='w-full'/>
        <span className='text-green-700'>{prod.category.name}</span>
        <h3 className='text-lg font-medium'>{prod.title.split(' ').splice(0,2).join(' ')}</h3>
        <div className='flex justify-between'>
            <span>{prod.price} EGP</span>
            <span><i className='fas fa-star text-yellow-300'></i>{prod.ratingsAverage}</span>
        </div>
    
    </Link>
        <button onClick={() => { addProdToCart(prod?._id) }} className='bg-green-500 cursor-pointer w-full py-2 rounded-md my-2'>Add To Cart</button>
    </div>
      
      </div>})}
    
    </div>
  </div>
  
  
  </>
}
