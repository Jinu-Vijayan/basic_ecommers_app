import React, { useRef, useState } from 'react'
import './signUp.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import {useDispatch} from 'react-redux'
import { setSignedInUserId } from '../../redux/slices/userSlice';
import {db} from '../../firebase/app'
import toast, { Toaster } from 'react-hot-toast';
import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "10%",
  // backgroundColor: "black"
};

//TODO
// make functionality for users to add profile  name and other customizations
const SignUp = () => {

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#36d7b7");

  // const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function createNewUserInDataBase(uid){
    await setDoc(doc(db,"users",uid),{
      cartData : []
    })
  }

  function signUpHandler(e){

    e.preventDefault()

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password)

    if(email === "" || password === ""){
      return;
    }

    const auth = getAuth();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        dispatch(setSignedInUserId(user.uid));
        createNewUserInDataBase(user.uid);
        setLoading(false);
        toast.success("SignUp Complete");
        navigate('/signIn')
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        toast.error(errorMessage);
        // ..
      });
  }


  return (
    <div className='signup_container'>
      <Toaster/>
      <form >
        {/* <input ref={nameRef} type='text' placeholder='Enter user name'/> */}
        <input ref={emailRef} type='email' placeholder='Enter email'/>
        <input ref={passwordRef} type='password' placeholder='Enter password'/>
        <button onClick={signUpHandler} >SignUp</button>
      </form>
      <NavLink to={'/signIn'} >SignIn</NavLink>
      <BeatLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier = "1"
      />
    </div>
  )
}

export default SignUp