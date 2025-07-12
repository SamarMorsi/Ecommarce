import axios from 'axios'
import { useFormik} from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../Context/UserContext'
import toast from 'react-hot-toast'
export default function ResetPassword() {

      
let [errMse, seterrMse] = useState(null)
let [loading,setLoading]=useState(false)
let navigate=useNavigate()

 let {setuserLogin} =useContext(UserContext)

function submitForm(val){
  setLoading(true)

axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',val).then(({data})=>{

  setLoading(false)

if (data?.token) {
  setuserLogin(data?.token);
  localStorage.setItem('usertoken', data?.token);
  navigate('/');


  toast.success('Password Changed Successfully',{
    
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "👌",
    
  })
}

  
}).catch((error)=>{
  setLoading(false)
  console.log(error);
  seterrMse(error?.response?.data?.message)
  toast.error(error.response.data.message,{
    
        position: "top-right",
        style: { backgroundColor: "#479747",color:"#FFFFFF",padding:"20px",borderRadius:"5px"},
        icon: "❗",
    
  })
})
}


let validation=Yup.object().shape({
    email: Yup.string().email('invalid email').required('email is required'),
    newPassword: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,10}$/, 'invalid password'),

})



let formik=useFormik({
  initialValues:{
    email:"",
    newPassword:'',
  },
  validationSchema:validation
  ,
  onSubmit:submitForm
})

useEffect(()=>{
  document.title='Reset password'
},[])

  return <>
  
  <div className=" flex h-screen py-10  px-4 sm:px-6 lg:px-8">
  <div className="w-full  space-y-8">
    <div className="bg-white  rounded-md p-6">
    
      <h2 className="my-3  text-3xl font-medium tracking-tight">
        reset your account password
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
          <label htmlFor="newPassword" className="block text-l text-gray-700">new password</label>
          <div className="mt-1">
            <input value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} id='newPassword' name="newPassword" type="password" autoComplete="newPassword"  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#C2DBFE] focus:transition-all  focus:border-4  focus:outline-none focus:ring-green-500 sm:text-sm" />
          </div>
          {formik.errors.newPassword && formik.touched.newPassword?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.newPassword}</h5>:null}
        </div>

        <div className="flex items-center justify-between">
            
          <button disabled={loading} type="submit"  className="flex  justify-center rounded-md text-green-700 hover  hover:bg-green-700 cursor-pointer border border-green-700 outline-none  hover:text-white py-2 px-4 text-xl font-medium  ">
           {loading?<i className='fas fa-spinner fa-spin'></i>:'reset password'} 
          </button>
        </div>
         
      </form>
    </div>
  </div>
</div>
  
  </>
}
