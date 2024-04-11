import './addToCartBtn.css'
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setProductsInCart } from '../../redux/slices/productSlice';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase/app';
// TODO
// replace alerts with appropriate pop up messages
const AddToCartBtn = ({productDetails}) => {

    const productsInCart = useSelector((state)=> state.product.productsInCart);
    const userSignedIn = useSelector((state)=>state.user.userSignedIn);
    const signedInUserId = useSelector((state)=> state.user.signedInUserId);
    const dispatch = useDispatch()

    async function uploadDataToDb(newData){
        await setDoc(doc(db,'users',signedInUserId),{
            cartData : newData
        })
    }

    function clickHandler(e){

        e.stopPropagation()

        let productPresentInCart = false;

        if(!userSignedIn){
            alert("Sign in to your accout in order to add items to cart");
            return;
        }

        productsInCart.forEach((elem)=>{
            if(elem.id === productDetails.id){
                productPresentInCart = true;
                return;
            }
        })

        if(productPresentInCart){
            alert("Product already exists in cart");
            return;
        }

        const newData = [...productsInCart, productDetails];

        uploadDataToDb(newData);
        dispatch(setProductsInCart(newData));

        alert("Product added to cart")
    }

  return (
    <button onClick={clickHandler}  className='add_to_cart_btn'>Add to cart</button>
  )
}

export default AddToCartBtn