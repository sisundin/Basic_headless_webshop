import '../butterclient';
import React from 'react'
import CheckoutForm from '../ordering_components/CheckoutForm.jsx'
import BasketDetails from '../ordering_components/BasketDetails.js'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import history from '../history';
import KlarnaButton from "../ordering_components/prebuilt/KlarnaButton.jsx";
import {Helmet} from "react-helmet";
import Klarna from "klarna-checkout";

//************************TO DO ___ LATER ****************************/
// Learning
// To best leverage Stripe’s advanced fraud functionality,
// include this script on every page, not just the checkout page.
// This allows Stripe to detect anomalous behavior that may be indicative
// of fraud as customers browse your website.
// Note: This is why we are adding it to a Layout component.


const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);
const stripe = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);


const klarnapayment = async () => {
  return (await stripe).createSource({
  type: 'klarna',
  amount: 816,
  currency: 'eur',
  klarna: {
    product: 'payment',
    purchase_country: 'DE',
  },

  source_order: {
    items: [{
      type: 'sku',
      description: 'Grey cotton T-shirt',
      quantity: 2,
      currency: 'eur',
      amount: 796,
   }, {
      type: 'tax',
      description: 'Taxes',
      currency: 'eur',
      amount: 20,
   }, {
      type: 'shipping',
      description: 'Free Shipping',
      currency: 'eur',
      amount: 0,
   }]
  }, 
  
}).then((res)=>{
  
  return res.source;
})};


window.klarnaAsyncCallback = function () {

  // Initialize the SDK
  Klarna.Payments.init({
    client_token: await klarnapayment().then((res) => {return res.klarna.client_token})
  });
  console.log("hej");
  // Load the widget for each payment method category:
  // - pay_later
  // - pay_over_time
  // - pay_now
  var available_categories = klarnapayment.klarna.payment_method_category.split(',');
  for (var category of available_categories) {
    Klarna.Payments.load({
      container: "#klarna_" + category + "_container",
      payment_method_category: category,
    }, function(res) {
      if (res.show_form) {
        console.log("heejj");
        /*
        * this payment method category can be used, allow the customer
        * to choose it in your interface.
        */
      } else {
        // this payment method category is not available
      }
    });
  }
};

const goklarna =  async function(){
  // get the category the customer chose(using your own code)
  //var selectedCategory = getSelectedCategory();
  // Submit the payment for authorization with the selected category
  Klarna.Payments.authorize({
    payment_method_category: "card"
  }, function(res) {
    if (res.approved) {
      // Payment has been authorized
    } else {
      if (res.error) {
        // Payment not authorized or an error has occurred
      } else {
        // handle other states
      }
    }
  })
};




export default class CheckOutView extends React.Component {
  constructor(props){
    super();
    this.props = props;
    }

   
   
  render() {
    let totalPrice = 0;

    // comment toself: lägg in klarna här sedan
    return <>
    <Helmet>   
    
    <script src="https://x.klarnacdn.net/kp/lib/v1/api.js" async></script>
    </Helmet>

        <div>
          <div className="pageTopDivider"></div>
            <div class="row" style={{"margin-right": "0px", "margin-left":"0px"}}>
              <div class="col-xl-6" style={{"padding-right": "0px", "padding-left":"0px"}}>  
                <div style={{"text-align": "center"}}>       
                  <BasketDetails model={this.props.model} />
                </div> 
              </div>
              <div class="col-xl-6" style={{"padding-right": "0px", "padding-left":"0px"}}>
              <Elements stripe={stripePromise}>
                  <KlarnaButton id={"pay-button"} onClick={()=> goklarna()}> 
                    Pay using Klarna 
                  </KlarnaButton>
                  
                  <CheckoutForm price={ totalPrice}/> 
                  
                </Elements>
                </div>
              </div>
        </div>
    </>
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}