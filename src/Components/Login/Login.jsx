import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../Context/UserContext';
import { Helmet } from 'react-helmet';
export default function Login() {

 let {setuserLogin} =useContext(UserContext)
  
let [errMse, seterrMse] = useState(null)
let [loading,setLoading]=useState(false)
let navigate=useNavigate()
function submitForm(val){
  setLoading(true)
axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).then(({data})=>{

  setLoading(false)

  if(data.message==='success'){
    setuserLogin(data?.token)
    navigate('/')
    localStorage.setItem('usertoken',data?.token)
  }
  
}).catch((error)=>{
  setLoading(false)

  seterrMse(error?.response?.data?.message)
})
}


let validation=Yup.object().shape({
  email: Yup.string().email('invalid email').required('email is required'),
  password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,10}$/, 'invalid password'),
})



let formik=useFormik({
  initialValues:{
    email:"",
    password:"",
  },
  validationSchema:validation
  ,
  onSubmit:submitForm
})

  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
<div className=" flex h-screen py-10  px-4 sm:px-6 lg:px-8">
  <div className="w-full  space-y-8">
    <div className="bg-white  rounded-md p-6">
    
      <h2 className="my-3  text-3xl font-medium tracking-tight">
        login now
      </h2>
      <form className=" space-y-6" onSubmit={formik.handleSubmit}>
      
        <div>
          <label htmlFor="email" className="block text-l text-gray-700 ">Email</label>
          <div className="mt-1">
            <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name="email" type="email" autoComplete="email"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4 focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.email && formik.touched.email?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.email}</h5>:null}
        </div>
        <div>
          <label htmlFor="password" className="block text-l text-gray-700">Password</label>
          <div className="mt-1">
            <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name="password" type="password" autoComplete="password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4  focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.password && formik.touched.password?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.password}</h5>:null}
        </div>

        <div className="flex items-center justify-between">
              <Link to={'/forgetpassword'} className='text-xl font-medium text-gray-700 cursor-pointer hover hover:text-green-600 transition-all '>
                        forget your password ?
              </Link>
          <button type="submit" className="flex  justify-center rounded-md  bg-[#3FA43F] hover hover:bg-green-600 cursor-pointer border border-transparent focus:outline-none focus:ring-0 focus:border-gray-500 focus:bg-transparent  focus:text-gray-400 py-2 px-4 text-lg font-medium text-white  ">
           {loading?<i className='fas fa-spinner fa-spin'></i>:'login now'} 
          </button>
        </div>
          {errMse?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{errMse}</h5>:null}
      </form>
    </div>
  </div>
</div>

  </>
}
