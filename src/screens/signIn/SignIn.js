import React, { useEffect, useRef } from 'react'
import './signIn.css'
import { NavLink,useNavigate  } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useSelector,useDispatch} from 'react-redux'
import { setSignedInUserId, setUserSignedIn } from '../../redux/slices/userSlice';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/app';
import { setProductsInCart } from '../../redux/slices/productSlice';

const SignIn = () => {

  const navigate = useNavigate ()
  const emailRef = useRef()
  const passwordRef = useRef()

  const userSignedIn = useSelector((state)=> state.user.userSignedIn);
  const dispatch = useDispatch()

  async function getCartDataFromDb(uid){

    const docRef = doc(db,"users",uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().cartData);
      dispatch(setProductsInCart(docSnap.data().cartData))
    } else {
      // docSnap.data() will be undefined in this case
      console.error("No such document!");
    }

  }

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
        // console.log("user data from fire base",user.uid)
        getCartDataFromDb(user.uid);
        dispatch(setSignedInUserId(user.uid));
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