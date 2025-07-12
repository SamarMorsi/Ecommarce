
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export let CartContext  =createContext(0)

export default function CartContextProvider(props){

   let [cartId,setcartId] =useState(null)
   let [numOfCartItems,setnumOfCartItems] =useState(0)
   let [products,setproducts] =useState(null)
   let [totalCartPrice,settotalCartPrice] =useState(0)

let headers={ token:localStorage.getItem('usertoken')}

let token=localStorage.getItem('usertoken')

function resetCart(){
    setcartId(null)
    setnumOfCartItems(0)
    settotalCartPrice(0)
    setproducts(null)
}

function addToCart(prodId){
 return   axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:prodId
    },{
        headers
    }
    ).then((response)=>{
   getUserCartItem()
        
    return response
        
    }).catch((error)=>{
      return error
    })
}

function getUserCartItem(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>{
        setcartId(response?.data?.cartId)
        setnumOfCartItems(response?.data?.numOfCartItems)
        setproducts(response?.data?.data?.products)
        settotalCartPrice(response?.data?.data?.totalCartPrice)
        console.log(response);
        
    }).catch((error)=>{
        console.log(error);
    })
}

function updateCart(prodId,count){
 return   axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        {count:count},
        {headers}
    ).then((response)=>{

        setcartId(response?.data?.cartId)
        setnumOfCartItems(response?.data?.numOfCartItems)
        setproducts(response?.data?.data?.products)
        settotalCartPrice(response?.data?.data?.totalCartPrice)

    return response
    }).catch((error)=>{
    return error
        
    })
}

function deleteCartItem(prodId){
 return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        {headers}
    ).then((response)=>{

        setcartId(response?.data?.cartId)
        setnumOfCartItems(response?.data?.numOfCartItems)
        setproducts(response?.data?.data?.products)
        settotalCartPrice(response?.data?.data?.totalCartPrice)

    return response
    }).catch((error)=>{
    return error
        
    })
}

function deleteCart(){
 return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,
        {headers}
    ).then((response)=>{

        setcartId(response?.data?.cartId)
        setnumOfCartItems(response?.data?.numOfCartItems)
        setproducts(response?.data?.data?.products)
        settotalCartPrice(response?.data?.data?.totalCartPrice)

    return response
    }).catch((error)=>{
    return error
        
    })
}

useEffect(()=>{
    if(token){
        getUserCartItem()
    }
    
},[token])

return<CartContext.Provider value={{addToCart,updateCart,deleteCartItem,deleteCart,resetCart,numOfCartItems,products,cartId,totalCartPrice}}>
{props.children}

</CartContext.Provider>



}