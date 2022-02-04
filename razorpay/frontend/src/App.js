import React from 'react';
import logo from './logo.svg';
import './App.css';

function loadscript(src){
  return new Promise(resolve =>{
  const script = document.createElement('script')
  script.src = 'https://checkout.razorpay.com/v1/checkout.js'
  document.body.appendChild(script)
  script.onload = () => {
    resolve(true)
  }
    script.onerror = () => {
      resolve(false)
    }
  })
}

const __DEV__ = document.domain === 'localhost'


if(document.domain === 'localhost'){
    //production
}
else{
   //development
}

function App() {
  async function displayRazorpay(){
    const res = await loadscript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res){
      alert('Razorpay SDk failed to load. Are you online?')
      return
    }

    const data = await fetch('http://localhost:1337/razorpay',{method: 'POST'}).then((t) =>
      t.json()
    )
    console.log(data)

    var options = {
      key: __DEV__? 'rzp_test_yG2l3M0Xpx8J3C':'PRODUCTION_KEY',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Sports Kart',
      description: 'Thank you for completing your order',
      image:'http://localhost:1337/logo.svg',
      handler: function(response){
        alert(response.razorpay_payment_id)
        alert(response.razorpay_order_id)
        alert(response.razorpay_signature)
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className="App">
      <h1><button><a className="App-Link" onClick={displayRazorpay} target="_blank" rel="noopener noreferrer">Pay 499</a></button></h1>
    </div>
  );
}

export default App;