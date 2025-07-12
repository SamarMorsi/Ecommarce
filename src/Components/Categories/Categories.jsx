import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Categories() {

    let [categories,setcategories]=useState(null)

    function getCategories(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
        
        setcategories(data?.data)
      }).catch((error)=>{
        console.log(error);
      })
    }

useEffect(()=>{
  getCategories();
})

  return <>
  <Helmet>
    <title>Categories</title>
  </Helmet>
 {categories?  <div className="flex flex-wrap  gap-y-5 mt-5 ">
   {categories?.map((category)=>{ return  <div key={category?._id} className='w-full md:w-1/2 lg:w-1/3  '>
  <div className='p-10 relative rounded  hover:shadow-lg hover:shadow-green-700/70'>
     <Link to={`/categorydetails/${category._id}`}>
      <img className='w-full h-[400px]  object-cover rounded ' src={category?.image} alt={category?.slug} />
      <div className='absolute  flex items-center justify-center  '>
        <h3 className='text-green-600 text-xl font-medium text-center '>{category.name}</h3>
      </div>
     </Link>
  </div>
  
  </div>})}
  </div>:  <Spinner/>}
  
  </>
}








