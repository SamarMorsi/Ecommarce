import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../Context/UserContext';
import { Helmet } from 'react-helmet';
export default function Register() {

let {setuserLogin} = useContext(UserContext)

let [errMse, seterrMse] = useState(null)
let [loading,setLoading]=useState(false)
let navigate=useNavigate()
function submitForm(val){
  setLoading(true)
axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',val).then(({data})=>{

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
  name: Yup.string().required('name is required').min(3,'min 3 letters'),
  email: Yup.string().email('invalid email').required('email is required'),
  password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,10}$/, ' invalid password start 1 letters capital and min 4 letters small and max 9 and numbers'),
  rePassword:Yup.string().required('repassword is requird').oneOf([Yup.ref('password')], 'passwords do not match'),
  phone:Yup.string().required('phone is requird').matches(/^01[01257][0-9]{8}$/, 'invalid phone'),
})



let formik=useFormik({
  initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  },
  validationSchema:validation
  ,
  onSubmit:submitForm
})

  return <>
  <Helmet>
    <title>Register</title>
  </Helmet>
<div className=" flex h-screen py-10 items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="w-full  space-y-8">
    <div className="bg-white  rounded-md p-6">
      <h2 className="my-3 mb-5   text-3xl font-medium tracking-tight ">
        register now
      </h2>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name" className="block  text-l text-gray-700">Name</label>
          <div className="mt-1">
            <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} id='name' name="name" type="text"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4  focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.name && formik.touched.name?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.name}</h5>:null}
        </div>
        <div>
          <label htmlFor="email" className="block text-l  text-gray-700">Email</label>
          <div className="mt-1">
            <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name="email" type="email" autoComplete="email"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4  focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.email && formik.touched.email?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.email}</h5>:null}
        </div>
        <div>
          <label htmlFor="password" className="block text-l  text-gray-700">Password</label>
          <div className="mt-1">
            <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' name="password" type="password" autoComplete="password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4  focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.password && formik.touched.password?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.password}</h5>:null}
        </div>
        <div>
          <label htmlFor="rePassword" className="block text-l  text-gray-700">Re-Password</label>
          <div className="mt-1">
            <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} id='rePassword' name="rePassword" type="password" autoComplete="confirm-password"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4  focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.rePassword}</h5>:null}
        </div>
           <div>
          <label htmlFor="phone" className="block text-l  text-gray-700">Phone</label>
          <div className="mt-1">
            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} id='phone' name="phone" type="tel"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4  focus:outline-none focus:ring-green-500 sm:text-sm"/>
          </div>
          {formik.errors.phone && formik.touched.phone?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.phone}</h5>:null}
        </div>
        <div className='flex  justify-end items-center '>
          <button type="submit" className={`text-xl  rounded-md border border-gray-400  outline-none py-2 px-4 cursor-pointer font-medium text-gray-400  ${formik.isValid && formik.dirty ? 'bg-green-500 hover:bg-green-600 text-white'   : 'border border-gray-400  outline-none text-gray-400  '}  `}> 
           {loading?<i className='fas fa-spinner fa-spin'></i>:'Register now'}  
          </button>
        </div>
          {errMse?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3 text-center'>{errMse}</h5>:null}
       
      </form>
    </div>
  </div>
</div>

  </>
}
