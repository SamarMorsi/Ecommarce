import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategorySlider() {

       var settings = {
    dots: false,
    infinite: true,
    arrows: false ,
    autoplay:true,
    autoplaySpeed:3000,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    responsive:[
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };

  let [categories,setcategories] =  useState(null)


function getAllCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{

setcategories(data?.data)

    }).catch((error)=>{
console.log(error);

    })
}

useEffect(()=>{
    getAllCategories()
},[])

  return <>
  
  <div className='my-10'>
    <Slider {...settings}>
        {categories?.map((category)=>{return <div>
            <img src={category.image} className='h-[200px]' alt={category.name} />
            <h3 className='text-center'>{category.name}</h3>
        </div>})}
        
    </Slider>
  </div>
  
  </>
}
