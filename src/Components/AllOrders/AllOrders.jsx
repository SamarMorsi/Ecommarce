import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  let [cartData, setCartData] = useState(null);

  function getCartData() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`, {
      headers: {
        token: localStorage.getItem('usertoken')
      }
    })
    .then((response) => {
      console.log(response?.data); 
      setCartData(response?.data?.data); 

    })
    .catch((error) => {
      console.log(error);

    });
  }

  useEffect(() => {
    getCartData();
  }, []);

return <>
<Helmet>
  <title>Orders</title>
</Helmet>
  {cartData?   <div className="container mx-auto px-10 py-4 my-5 bg-gray-100">
    <h1 className="text-3xl font-medium my-4">All Orders</h1>

    {!cartData || cartData.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      cartData.map((order, orderIndex) => (
        <div key={order._id} className="mb-8 p-4 bg-white shadow rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-700">Order #{orderIndex + 1}</h2>
            <p>Total Price: <span className="text-green-500">{order.totalOrderPrice} EGP</span></p>
            <p>Payment Method: {order.paymentMethodType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          </div>

          {order.cartItems.map((item) => (
            <div key={item._id} className="flex items-center border-t py-4">
              <img src={item.product.imageCover} alt={item.product.title} className="w-20 h-20 object-cover rounded" />
              <div className="ml-4">
                <h3 className="font-medium text-gray-800">{item.product.title}</h3>
                <p>Count: {item.count}</p>
                <p>Price: {item.price} EGP</p>
              </div>
            </div>
          ))}
        </div>
      ))
    )}
  </div>
:  <Spinner/>}

</>
}
