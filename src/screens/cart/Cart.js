import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './Cart.css'
import CartItemCard from '../../components/cartItemCard/CartItemCard';
import toast, { Toaster } from 'react-hot-toast';
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../../firebase/app';
import { setProductsInCart } from '../../redux/slices/productSlice';

// TODO
// when clicking on proceed to pay button have a pop up that asks for name , address, and phone number on the client and pass that data on in the payment part
// remove the items in cart after the payment is a success
const Cart = () => {
  const userSignedIn = useSelector((state)=> state.user.userSignedIn);
  const productsInCart = useSelector((state)=> state.product.productsInCart);
  const signedInUserId = useSelector((state)=> state.user.signedInUserId);
  const dispatch = useDispatch()
  const [subtotal, setSubTotal] = useState(0);

  async function uploadDataToDb(newData){
    await setDoc(doc(db,'users',signedInUserId),{
        cartData : newData
    })
}

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }

  async function displayRazorPay(e){
    e.preventDefault();

    const key = process.env.REACT_APP_RAZOR_PAY_ID;
    const secretKey = process.env.REACT_APP_RAZOR_PAY_SECRET_KEY
    const priceInRs = subtotal * 83.33 * 100;
    console.log(typeof priceInRs)

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if(!res){
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // console.log(instance)

    const options = {
      "key": key, // Enter the Key ID generated from the Dashboard
      "key_secret":secretKey,
      "amount": parseInt(priceInRs), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_receipt": 'order_rcptid_new_receipt', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
        toast.success("Payment Succes");
        dispatch(setProductsInCart([]));
        uploadDataToDb([]);
      } ,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  }


  return (
    <div className='cart_container'>
      {
        userSignedIn === false ? (
          <div className='cart_message'>
            <p>SignIn to access data in the cart</p>
          </div>
        ) : (
          productsInCart.length === 0 ? (
            <div className='cart_message'>
              <p>No products added to cart</p>
            </div>
          ) : (
            <div>
              <Toaster/>
              <p className='cart_title'>Shopping Cart</p>
              <div className='cart_items_container'>
                {
                  productsInCart.length > 0 && (
                    productsInCart.map((product)=>{
                      return(
                        <CartItemCard productDetails = {product} setSubTotal = {setSubTotal} />
                      )
                    })
                  )
                }
              </div>
              <div>
                <p className='cart_total'>Subtotal {`(${productsInCart.length}) items`}: ${subtotal}</p>
              </div>
              <div className='razor_pay_btn_container'>
                <button onClick={displayRazorPay}>Proceed to Payment</button>
              </div>
            </div>
          )
        )
      }
    </div>
  )
}

export default Cart