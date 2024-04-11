import React, { useRef, useState } from 'react'
import './navbar.css'
import {NavLink, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getAuth, signOut } from "firebase/auth";
import { setUserSignedIn } from '../../redux/slices/userSlice';

// TODO
// show pop up when user has singed out of the account
const Navbar = () => {
  const location = useLocation();
  const searchRef = useRef();
  const [searchInput, setSearchInput] = useState("")
  const userSignedIn = useSelector((state) => state.user.userSignedIn)
  const dispatch = useDispatch()

  function searchInputHandler(e){
    setSearchInput(e.target.value)
  }

  function signOutHandler(){
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch(setUserSignedIn(false));
    }).catch((error) => {
      // An error happened.
      console.error(error)
    });
  }

  const notAllowedPath = ['/signIn','/signUp'];

  return (
    <>
    {notAllowedPath.includes(location.pathname) ? null :(
      <nav>
        <NavLink to={'/'} className="nav_icons ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='nav_icons'>
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
        </NavLink>
          <div className='nav_center'>
            <form onClick={(e)=> e.preventDefault()}>
              <input type='text' placeholder='Search...' onChange={searchInputHandler}/>
              {/* {console.log(searchRef.current?.value)} */}
              <NavLink to={`/search/${searchInput}`} className="nav_icons search_icon">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </button>
              </NavLink>
            </form>
          </div>
        <div className='nav_right'>
          <NavLink to={'/cart'} className='nav_icons'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='nav_icons' >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
          </NavLink>
          {
            userSignedIn === false ? 
          <NavLink to={'/signIn'} className='nav_button'>
            <p >SignIn</p>
          </NavLink>
          :
          <button className='nav_button' onClick={signOutHandler} >SignOut</button>
          }
        </div>
      </nav>
    ) }
    </>
  )
}

export default Navbar