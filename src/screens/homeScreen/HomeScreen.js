import React, { useEffect, useRef, useState } from 'react'
import './homeScreen.css'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import fetchData from '../../utils/apiCall'
import ProductCard from '../../components/productCard/ProductCard'
import { setAllProductData, setFilteredProductData } from '../../redux/slices/productSlice'

const HomeScreen = () => {

  const inputRef = useRef();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const allProductData = useSelector((state)=> state.product.allProductData);
  const filteredProductData = useSelector((state) => state.product.filteredProductData);


  async function fetchAllData(){
    const url = 'https://fakestoreapi.com/products';
    const res = await fetchData(url);
    // setProductData(res);
    dispatch(setAllProductData(res));
    dispatch(setFilteredProductData(res));
    console.log(res)
  }

  useEffect(()=>{
    fetchAllData();
  },[])
  return (
    <div className='home_container'>
      {
        filteredProductData.length > 0 ? (
          filteredProductData.map((productDetails) => {
            return(
              <ProductCard key={productDetails.id} productDetails = {productDetails}/>
            )
          })
        ) : (
          <div>
            <p>No matching data found</p>
          </div>
        )
      }
    </div>
  )
}

export default HomeScreen