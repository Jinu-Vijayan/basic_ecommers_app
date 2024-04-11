import React, { useEffect, useRef, useState } from 'react'
import './homeScreen.css'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import fetchData from '../../utils/apiCall'
import ProductCard from '../../components/productCard/ProductCard'

const HomeScreen = () => {

  const inputRef = useRef();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);


  async function fetchAllData(){
    const url = 'https://fakestoreapi.com/products'
    const res = await fetchData(url)
    setProductData(res);
    console.log(res)
  }

  useEffect(()=>{
    fetchAllData();
  },[])
  return (
    <div className='home_container'>
      {
        productData.length > 0 && (
          productData.map((productDetails) => {
            return(
              <ProductCard key={productDetails.id} productDetails = {productDetails}/>
            )
          })
        )
      }
    </div>
  )
}

export default HomeScreen