import axios from 'axios';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../Context/UserContext';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
export default function ForgetPassword() {
  
let [errMse, seterrMse] = useState(null)
let [loading,setLoading]=useState(false)
let navigate=useNavigate()

 let {setuserLogin} =useContext(UserContext)

function submitForm(val){
  setLoading(true)
axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',val).then(({data})=>{

  setLoading(false)


  if(data?.statusMsg==='success'){
    
console.log(data?.statusMsg?.message);

    setuserLogin(data?.token)
    navigate('/verifycode')
    localStorage.setItem('usertoken',data?.token)
    toast.success('Code sent to your email ',{
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
  
})



let formik=useFormik({
  initialValues:{
    email:"",
  },
  validationSchema:validation
  ,
  onSubmit:submitForm
})

  return <>
<Helmet>
  <title>Forget password</title>
</Helmet>
<div className=" flex h-screen py-10  px-4 sm:px-6 lg:px-8">
  <div className="w-full  space-y-8">
    <div className="bg-white  rounded-md p-6">
    
      <h2 className="my-3  text-3xl font-medium tracking-tight">
        please enter your verification code
      </h2>
      <form className=" space-y-6" onSubmit={formik.handleSubmit}>
      
        <div>
          <div className="mt-1">
            <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' name="email" type="email" autoComplete="email" placeholder='Email' className="px-2 py-4 mt-1 block w-full rounded-md border border-gray-300  focus:border-[#C2DBFE] focus:transition-all  focus:border-4 focus:outline-none focus:ring-green-500 text-l" />
          </div>
          {formik.errors.email && formik.touched.email?<h5 className='bg-red-100 ps-5 rounded border text-red-700 border-red-200 py-4 mt-3'>{formik.errors.email}</h5>:null}
        </div>
      

        <div className="flex items-center justify-between">
          <button disabled={loading}  type="submit" className="flex  justify-center rounded-md text-green-700 hover  hover:bg-green-700 cursor-pointer border border-green-700 outline-none  hover:text-white py-2 px-4 text-xl font-medium  ">
           {loading?<i className='fas fa-spinner fa-spin'></i>:'verfiy'} 
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  </>
}


