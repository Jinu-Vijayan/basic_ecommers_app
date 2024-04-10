import React, { useEffect, useRef } from 'react'
import './homeScreen.css'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import fetchData from '../../utils/apiCall'

const HomeScreen = () => {

  const inputRef = useRef();
  const navigate = useNavigate();

  function searchHandler(){
    navigate(`/search/${inputRef.current.value}`);
  }

  return (
    <div className='home_container'>
      <h1 className='heading'>Search for products from amazon</h1>
      <div className='search_field_container'>
      <input ref={inputRef} type='text' placeholder='Search product by name' className='search_box'/>
      <button onClick={searchHandler} className='search_button'>Search</button>
      </div>
    </div>
  )
}

export default HomeScreen