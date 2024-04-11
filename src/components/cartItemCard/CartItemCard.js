import './cartItemCard.css'
import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setProductsInCart } from '../../redux/slices/productSlice';

const CartItemCard = ({productDetails,setSubTotal}) => {

    const dispatch = useDispatch();
    const productsInCart = useSelector((state)=>state.product.productsInCart)

    function deleteHandler(){
        let newData = [...productsInCart]
        newData.map((elem,index)=>{
            if(elem.id === productDetails.id){
                newData.splice(index,1);
                setSubTotal((prev)=>{
                    prev -= Number(elem.price)
                    return prev.toFixed(2);
                })
            }
        })
        dispatch(setProductsInCart(newData))
    }

    useEffect(()=>{
        setSubTotal((prev)=>{
            return prev += Number(productDetails.price)
        })
    },[])

  return (
    <div className='cart_card_container'>
        <div className='cart_card_top'>
            <div className='cart_card_top_left'>
                <img src={productDetails?.image} alt={`image of ${productDetails?.image}`} />
            </div>
            <div className='cart_card_top_right'>
                <p>{productDetails?.title}</p>
                <p>Price : {productDetails?.price}</p>
            </div>
        </div>
        <div className='cart_card_bottom'>
            <button onClick={deleteHandler} className='delete_btn'>Delete</button>
        </div>
    </div>
  )
}

export default CartItemCard