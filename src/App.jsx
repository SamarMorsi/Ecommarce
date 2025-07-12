import { lazy } from 'react';
import './App.css'
import Layout from './Components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CounterContextProvider from './Components/Context/CounterContext';
import UserContextProvider from './Components/Context/UserContext';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import CartContextProvider from './Components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import WishlistContextProvider from './Components/Context/WishlistContext';
const AllOrders = lazy(() => import('./Components/AllOrders/AllOrders'));
const Cart = lazy(() => import('./Components/Cart/Cart'));
const Brands = lazy(() => import('./Components/Brands/Brands'));
const Products = lazy(() => import('./Components/Products/Products'));
const Categories = lazy(() => import('./Components/Categories/Categories'));
const Wishlist = lazy(() => import('./Components/Wishlist/Wishlist'));
const CheckOut = lazy(() => import('./Components/CheckOut/CheckOut'));
const CategoryDetails = lazy(() => import('./Components/CategoryDetails/CategoryDetails'));
const ProductDetails = lazy(() => import('./Components/ProductDetails/ProductDetails'));
const Notfound = lazy(() => import('./Components/Notfound/Notfound'));
const Register = lazy(() => import('./Components/Register/Register'));
const Login = lazy(() => import('./Components/Login/Login'));
const Home = lazy(() => import('./Components/Home/Home'));
const ResetPassword = lazy(() => import('./Components/ResetPassword/ResetPassword'));
const VerifyCode = lazy(() => import('./Components/VerifyCode/VerifyCode'));
const ForgetPassword = lazy(() => import('./Components/ForgetPassword/ForgetPassword'));

let Qclient= new QueryClient()
let route=createBrowserRouter([
  {path:'',element:<Layout/> ,children:[
   {index:true,element:<ProtectRoute><Home/></ProtectRoute>},
   {path:'brands',element:<ProtectRoute><Brands/></ProtectRoute>},
   {path:'cart',element:<ProtectRoute><Cart/></ProtectRoute>},
   {path:'forgetpassword',element:<ForgetPassword/>},
   {path:'verifycode',element:<VerifyCode/>},
   {path:'resetpassword',element:<ResetPassword/>},
   {path:'wishlist',element:<ProtectRoute><Wishlist/></ProtectRoute>},
   {path:'allorders',element:<ProtectRoute><AllOrders/></ProtectRoute>},
   {path:'checkout',element:<ProtectRoute><CheckOut/></ProtectRoute>},
   {path:'categories',element:<ProtectRoute><Categories/></ProtectRoute>},
   {path:'categorydetails/:id',element:<ProtectRoute><CategoryDetails/></ProtectRoute>},
   {path:'products',element:<ProtectRoute><Products/></ProtectRoute>},
   {path:'productdetails/:id/:category',element:<ProtectRoute><ProductDetails/></ProtectRoute>},
   {path:'login',element:<Login/>},
   {path:'register',element:<Register/>},
   {path:'*',element:<Notfound/>},
  ]}
])

function App() {
 

  return<>
  <QueryClientProvider client={Qclient}>

<UserContextProvider>



<CartContextProvider>
  <WishlistContextProvider>

<CounterContextProvider>

<RouterProvider router={route}>

</RouterProvider>
< Toaster/>

</CounterContextProvider>

</WishlistContextProvider>
</CartContextProvider>




</UserContextProvider>

  </QueryClientProvider>





  </>
}

export default App
