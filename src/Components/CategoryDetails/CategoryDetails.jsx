import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Style from "./CategoryDetails.module.css";
import Spinner from '../Spinner/Spinner';
import { Helmet } from 'react-helmet';
export default function CategoryDetails() {
    let {id } = useParams()
    console.log(id);
    console.log(useParams());

    

    let [categoryDetails,setcategoryDetails] = useState(null)

function getAllCategoryDetails(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`).then(({data})=>{
      setcategoryDetails(data?.data)
        
    }).catch((error)=>{
        console.log(error);
    })
}

useEffect(()=>{
    getAllCategoryDetails();
},[id])

  return <>
  <Helmet>
    <title>Category Details</title>
  </Helmet>
  {categoryDetails? <div className='flex flex-wrap items-center my-10 '>
      <div className='w-full md:w-1/4 '>
      <img className={`w-full ${Style["animate-spin-appear"]} rounded border-0 hover hover:border-4 hover:border-green-400`} src={categoryDetails?.image} alt={categoryDetails?.slug} />
       

      </div>
      
      <div className='w-full md:w-3/4 flex justify-center items-center'>
      <div>
        <i className="fa-solid fa-arrow-right text-5xl me-52"></i>
      </div>
      <h1 className={`${Style.test} text-5xl text-green-700 font-bold`}>{categoryDetails?.name}</h1>
      </div>
     </div> : <Spinner/>}
   

  </>
}
