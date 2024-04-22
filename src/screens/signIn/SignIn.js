import React, { useEffect, useRef, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { NavLink,useNavigate  } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import './signIn.css'
import { db } from '../../firebase/app';
import { setProductsInCart } from '../../redux/slices/productSlice';
import { setSignedInUserId, setUserSignedIn } from '../../redux/slices/userSlice';
import LoadingAnimation from '../../components/loadingAnimation/LoadingAnimation';

const SignIn = () => {

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log("user data from fire base",user.uid)
        toast.success("SignIn success")
        getCartDataFromDb(user.uid);
        dispatch(setSignedInUserId(user.uid));
        dispatch(setUserSignedIn(true));
        setLoading(false);
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage);
      });
  }
  
  return (
    <div className='signin_container'>
      <Toaster/>
      <form className='signin_form' >
        <p>SignIn</p>
        <input ref={emailRef} type='email' placeholder='Enter email'/>
        <input ref={passwordRef} type='password' placeholder='Enter password'/>
        <button onClick={signInHandler}>SignIn</button>
      </form>
      <NavLink to={'/signUp'}>Create new account</NavLink>
      <LoadingAnimation loading={loading}/>
    </div>
  )
}

export default SignIn