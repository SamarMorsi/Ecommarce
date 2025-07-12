import React, { useContext, useState } from 'react'
import { Link, NavLink ,useNavigate} from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { Menu } from 'lucide-react';
import { CartContext } from '../Context/CartContext';
export default function Navbar() {

    let {numOfCartItems }= useContext(CartContext)

  let navigate=useNavigate()
  let {userLogin,setuserLogin} = useContext(UserContext)

function logout() {
    localStorage.removeItem('usertoken')
    setuserLogin(null)
    navigate('/login')
}

let [isMobileOpen,setisMobileOpen]= useState(false)

function toggleMobile(){
    setisMobileOpen(!isMobileOpen)
}

  return <>
  
  <nav className='bg-gray-100  fixed top-0 end-0 start-0 p-2 z-50 '>
    <div className="container max-w-7xl  justify-between m-auto flex flex-col items-center lg:flex-row">
        <div className='flex flex-col items-center md:flex-row'>
            <i className='fa-solid fa-cart-shopping nav-icon text-3xl text-green-600'></i>
            <Link to={"/"}><h1 className='text-3xl font-medium cursor-pointer'>fresh cart</h1></Link>
            <ul className='hidden items-center md:flex ms-60 '>

{userLogin !==null ? <>  <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='' className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Home</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='cart' className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Cart</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='wishlist' className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Wishlist</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='products' className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Products</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='categories' className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Categories</NavLink></li> 
                 <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='brands' className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Brands</NavLink></li></> :null }

            </ul>
        </div>

        <div>
            <ul className='hidden items-center md:flex'>

{userLogin ===null ? <>   <li className='mx-2 py-2 text-l text-gray-500'><NavLink to='register'>register</NavLink></li>
                <li className='mx-2 py-2 text-l text-gray-500'><NavLink to='login'>login</NavLink></li> 
                 </> :  <li onClick={logout} className='mx-2 py-2 text-l text-gray-500'> <i className="fa-solid fa-cart-shopping me-5 text-3xl text-gray-600 cursor-pointer hover:text-gray-800 relative"><span className=" absolute bottom-4 end-0  bg-green-600 text-white text-xs font-light px-1.5  py-1 rounded-sm  ">{numOfCartItems}</span></i> <span className='cursor-pointer'>logout</span></li> }

               
            </ul>
        </div>
     
        </div>
        <div className=''>
          <Menu onClick={toggleMobile} className='md:hidden '/>
        <div className={`md:hidden overflow-hidden  ${isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} transition-all duration-300 ease-in-out`}>
                    <div className="flex flex-col  w-full px-4 py-2" >
            
            <ul className='flex flex-col items-start w-full pl-4 mt-4 '>

{userLogin !==null ? <>  <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='' onClick={toggleMobile} className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Home</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='cart' onClick={toggleMobile} className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Cart</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='wishlist' onClick={toggleMobile} className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Wishlist</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='products' onClick={toggleMobile} className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Products</NavLink></li>
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='categories' onClick={toggleMobile} className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Categories</NavLink></li> 
                <li className='text-xl mx-2 text-slate-800 py-2'><NavLink to='brands' onClick={toggleMobile} className='text-gray-500 text-sm font-medium relative focus focus:text-gray-700 hover:text-gray-700' >Brands</NavLink></li>
                
                </> :null }
                

            </ul>
        </div>

                  <div>
            <ul className='md:hidden flex justify-center w-full items-center'>

{userLogin ===null ? <>  <div className='flex flex-col items-center w-full'>
   <li className='mx-2 py-2 text-s text-gray-500 items-center justify-center'><NavLink to='register'>register</NavLink></li>
                <li className='mx-2 py-2 text-sm text-gray-500 items-center justify-center'><NavLink to='login'>login</NavLink></li> 
</div>
                 </> :  <li onClick={logout} className='mx-2 py-2 text-sm text-gray-500 items-center justify-center'> <i className="fa-solid fa-cart-shopping me-5 text-3xl text-gray-600 cursor-pointer hover:text-gray-800 relative"><span className=" absolute bottom-4 end-0  bg-green-600 text-white text-xs font-light px-1.5  py-1 rounded-sm  ">{numOfCartItems}</span></i> <span className='cursor-pointer'>logout</span></li> }

               
            </ul>
        </div>
 
        </div>
        </div>
  </nav>
  </>
}
