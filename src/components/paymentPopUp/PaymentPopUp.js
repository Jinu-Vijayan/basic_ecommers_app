import React from 'react'
import './paymentPopUp.css'

const PaymentPopUp = ({setOpenPaymentModal,displayRazorPay, nameRef, addressRef, phoneNumberRef}) => {
  return (
    <div className='payment_popup_container'>
        <div>
            <input ref={nameRef} type='text' placeholder='Enter name'/>
            <input ref={addressRef} type='text' placeholder='Enter address'/>
            <input ref={phoneNumberRef} type='tel' placeholder='Enter phone number' />
            <button onClick={(e)=>{
                displayRazorPay(e);
            }} >Proceed to payment</button>
            <button className='close_modal_window_btn' style={{
                backgroundColor : "transparent"
            }} onClick={()=>{
                setOpenPaymentModal(false);
            }}>X</button>
        </div>
    </div>
  )
}

export default PaymentPopUp