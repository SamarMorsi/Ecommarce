import React from 'react'
import { Bars } from 'react-loader-spinner'
export default function Spinner() {
  return <>
  
<div className='h-screen flex justify-center items-center'>
     <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
</div>
  
  
  
  </>
}
