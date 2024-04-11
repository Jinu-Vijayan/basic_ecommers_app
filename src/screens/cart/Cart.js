import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import './Cart.css'
import CartItemCard from '../../components/cartItemCard/CartItemCard';

const Cart = () => {
  const userSignedIn = useSelector((state)=> state.user.userSignedIn);
  const productsInCart = useSelector((state)=> state.product.productsInCart);
  const [subtotal, setSubTotal] = useState(0);

  return (
    <div className='cart_container'>
      {
        userSignedIn === false ? (
          <div className='cart_message'>
            <p>SignIn to access data in the cart</p>
          </div>
        ) : (
          productsInCart.length === 0 ? (
            <div className='cart_message'>
              <p>No products added to cart</p>
            </div>
          ) : (
            <div>
              <p className='cart_title'>Shopping Cart</p>
              <div className='cart_items_container'>
                {
                  productsInCart.length > 0 && (
                    productsInCart.map((product)=>{
                      return(
                        <CartItemCard productDetails = {product} setSubTotal = {setSubTotal} />
                      )
                    })
                  )
                }
              </div>
              <div>
                <p className='cart_total'>Subtotal {`(${productsInCart.length}) items`}: ${subtotal}</p>
              </div>
            </div>
          )
        )
      }
    </div>
  )
}

export default Cart