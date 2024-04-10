import React, { useEffect, useRef } from 'react'
import './signIn.css'
import { NavLink,useNavigate  } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useSelector,useDispatch} from 'react-redux'
import { setUserSignedIn } from '../../redux/slices/userSlice';

const SignIn = () => {

  const navigate = useNavigate ()
  const emailRef = useRef()
  const passwordRef = useRef()

  const userSignedIn = useSelector((state)=> state.user.userSignedIn);
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log(userSignedIn)
  },[userSignedIn])

  function signInHandler(e){

    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if(email === "" || password === ""){
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user)
        dispatch(setUserSignedIn(true));
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  }
  
  return (
    <div className='signin_container'>
      <form className='signin_form' onClick={signInHandler}>
        <p>SignIn</p>
        <input ref={emailRef} type='email' placeholder='Enter email'/>
        <input ref={passwordRef} type='text' placeholder='Enter password'/>
        <button>SignIn</button>
      </form>
      <NavLink to={'/signUp'}>Create new account</NavLink>
    </div>
  )
}

export default SignIn