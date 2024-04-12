import React from 'react'
import {useNavigate} from 'react-router-dom'
import './productCard.css'
import AddToCartBtn from '../addToCartBtn/AddToCartBtn';

const ProductCard = ({productDetails}) => {

    const navigate = useNavigate();

    function clickHandler(){
        navigate(`/details/${productDetails.id}`)
    }

  return (
    <div onClick={clickHandler} className='card_container'>
        <img src={productDetails?.image} alt=''/>
        <div>
            <p>{productDetails?.title}</p>
            <div>
                <p>Price : {(productDetails?.price * 83.33).toFixed(2)} Rs</p>
                <p>Rating : {productDetails?.rating?.rate}</p>
            </div>
        </div>
        <AddToCartBtn productDetails = {productDetails} />
    </div>
  )
}

export default ProductCard