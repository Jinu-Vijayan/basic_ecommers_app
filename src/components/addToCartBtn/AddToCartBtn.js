import './addToCartBtn.css'
import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setProductsInCart } from '../../redux/slices/productSlice';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase/app';
import toast, { Toaster } from 'react-hot-toast';

const AddToCartBtn = ({productDetails}) => {

    const [IsProductPresentInCart, setIsProductPresentInCart] = useState(false);

    const productsInCart = useSelector((state)=> state.product.productsInCart);
    const userSignedIn = useSelector((state)=>state.user.userSignedIn);
    const signedInUserId = useSelector((state)=> state.user.signedInUserId);

    const dispatch = useDispatch()

    useEffect(()=>{
        productsInCart.length > 0 && (
            productsInCart.forEach((elem)=>{
                if(elem.id === productDetails.id){
                    setIsProductPresentInCart(true);
                }
            })
        )
        return () => setIsProductPresentInCart(false);
    },[productsInCart,productDetails])

    async function uploadDataToDb(newData){
        await setDoc(doc(db,'users',signedInUserId),{
            cartData : newData
        })
    }

    function clickHandler(e){

        e.stopPropagation()

        if(!userSignedIn){
            toast.error("Sign in to your accout in order to add items to cart");
            return;
        }

        const newData = [...productsInCart, productDetails];

        uploadDataToDb(newData);
        dispatch(setProductsInCart(newData));

        toast.success("Product added to cart")
    }

  return (
    <div className='btn_contanier'>
        <Toaster/>
        {
            !IsProductPresentInCart ? (
                <button onClick={clickHandler}  className='add_to_cart_btn'>Add to cart</button>
            ) : (
                <button className='add_to_cart_btn disabled_btn' disabled={true}>Item In Cart</button>
            )
        }
        
    </div>
  )
}

export default AddToCartBtn