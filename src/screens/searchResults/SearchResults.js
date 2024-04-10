import React, { useMemo } from 'react'
import './searchResults.css'
import {useParams} from "react-router-dom"
import fetchData from '../../utils/apiCall'

const SearchResults = () => {
  const {productName} = useParams()

  const productData = useMemo(async()=>{

    // const params = {
    //   type: 'search',
    //   amazon_domain: 'amazon.com',
    //   search_term: productName
    // }

    console.log(productName)

    console.log("running memo")
    fetchData();
    // const res = await fetchData(params);
    // console.log(res);

    // return res

  },[])


  return (
    <div className='search_container'>
      <p className='search_title'>Search results for "{productName}"</p>
      <div className='searched_products_container'>
        <p></p>
      </div>
    </div>
  )
}

export default SearchResults