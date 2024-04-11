import React, { useEffect} from 'react'
import './homeScreen.css'
import {useSelector, useDispatch} from 'react-redux'
import fetchData from '../../utils/apiCall'
import ProductCard from '../../components/productCard/ProductCard'
import { setAllProductData, setFilteredProductData } from '../../redux/slices/productSlice'

const HomeScreen = () => {

  const dispatch = useDispatch();
  const filteredProductData = useSelector((state) => state.product.filteredProductData);
  const signedInUserId = useSelector((state)=> state.user.signedInUserId)


  async function fetchAllData(){
    const url = 'https://fakestoreapi.com/products';
    const res = await fetchData(url);
    // setProductData(res);
    dispatch(setAllProductData(res));
    dispatch(setFilteredProductData(res));
  }

  useEffect(()=>{
    fetchAllData();
    // console.log(signedInUserId)
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