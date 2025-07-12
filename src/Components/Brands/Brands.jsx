
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function Brands() {

  let [brands, setBrands] = useState(null)
  let [selectedBrand, setSelectedBrand] = useState(null) 

  function getAllBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data?.data)
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getAllBrands();
  }, [])

  return <>
  <Helmet>
    <title>Brands</title>
  </Helmet>
    {brands ? <div>
      <h1 className='text-center my-5 font-medium text-4xl text-green-600'>All Brands</h1>
      
      <div className='flex flex-wrap gap-y-5 justify-center'>
        {brands.map((brand) => (
          <div key={brand._id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3'>
            <div 
              onClick={() => setSelectedBrand(brand)} 
              className='brands py-3 cursor-pointer h-60 relative group border border-gray-300 m-1 rounded hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-shadow duration-300'
            >
              <img className='mx-auto w-40 h-32 object-contain' src={brand?.image} alt={brand?.slug} />
              <h3 className='text-green-600 text-center text-lg font-medium mt-3'>{brand?.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedBrand && (
<div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[9999]">

          <div className="bg-white p-6 rounded-lg shadow-lg py-20 w-[90%] md:max-w-xl relative">

            <button 
              onClick={() => setSelectedBrand(null)} 
              className="absolute top-2 right-2 text-gray-400 text-2xl font-bold cursor-pointer hover:text-gray-600 "
            >
              &times;
            </button>
            <div className='flex justify-between border-y border-gray-300 py-4 items-center'>
              
            <div className='pt-10 '>
              <h2 className="text-green-600 text-4xl font-medium  pb-2">{selectedBrand.name}</h2>
            <p className=" text-gray-700 mb-4">{selectedBrand.slug}</p>
            </div>
            <img  src={selectedBrand.image}  alt={selectedBrand.name}  className="w-40  h-auto "  />
            </div>
            <div className='flex justify-end items-center mt-5'>
              <button 
                onClick={() => setSelectedBrand(null)} 
                className='bg-gray-500 cursor-pointer text-white px-5 py-2 rounded text-center hover:bg-gray-600 '
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div> : <Spinner />}
  </>
}
