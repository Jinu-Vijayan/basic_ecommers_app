import React, { useRef } from 'react'
import './signUp.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


//TODO
// make functionality for users to add profile  name and other customizations
// Show a pop up for error handling and to inform user of the error
const SignUp = () => {

  // const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate()

  function signUpHandler(e){

    e.preventDefault()

  
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password)

    if(email === "" || password === ""){
      return;
    }

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("user created",userCredential)
        navigate('/signIn')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
  }


  return (
    <div className='signup_container'>
      <form onClick={signUpHandler}>
        {/* <input ref={nameRef} type='text' placeholder='Enter user name'/> */}
        <input ref={emailRef} type='email' placeholder='Enter email'/>
        <input ref={passwordRef} type='text' placeholder='Enter password'/>
        <button >SignUp</button>
      </form>
      <NavLink to={'/signIn'} >SignIn</NavLink>
    </div>
  )
}

export default SignUp