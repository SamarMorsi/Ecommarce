import React from 'react'
import img1 from '../../assets/img/grocery-banner-2.jpeg'
import img2 from '../../assets/img/slider-2.jpeg'
import img3 from '../../assets/img/slider-image-1.jpeg'
import img4 from '../../assets/img/slider-image-2.jpeg'
import img5 from '../../assets/img/slider-image-3.jpeg'
import Slider from "react-slick";

export default function MainSlider() {

   var settings = {
    dots: true,
    infinite: true,
    arrows: false ,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
      autoplay:true,
    autoplaySpeed:3000,
  };

  return <>
  
  <div className='flex flex-wrap'>
    
    <div className='w-3/4 ' >
     <Slider {...settings}>
    <img src={img2} className='h-[200px] md:h-[300px] lg:h-[400px]'  alt="vegetables" />
    <img src={img1} className='h-[200px] md:h-[300px] lg:h-[400px]'  alt="bread" />
    <img src={img5} className='h-[200px] md:h-[300px] lg:h-[400px]'  alt="cookies" />
     </Slider>
    
    </div>
    <div className='w-1/4'>
    <img src={img4} className='w-full h-[100px] md:h-[150px] lg:h-[200px]' alt="wafer rolls" />
    <img src={img3} className='w-full h-[100px] md:h-[150px] lg:h-[200px]' alt="vegetables" />
    </div>
  </div>
  
  
  </>
}
