import React from 'react';
import { 
  useState, 
  useEffect } from "react";
import { 
  CardElement, 
  useStripe, 
  useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import KlarnaButton from "./prebuilt/KlarnaButton";
import { Elements } from "@stripe/react-stripe-js";


import CheckoutError from "./prebuilt/CheckoutError";





export default function KlarnaCheckout() {

  
  

  const stripe = useStripe(); 
  useEffect(() => {
    const source = () => {
    
    stripe.createSource({
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
     }],
    },
    }).then(function(result) {
    return result.source
    }); 
  };
  



  })
  
  Klarna.Payments.init({
    client_token: useEffect().source.klarna.client_token,
  });
  



    window.klarnaAsyncCallback = function () {

        // Initialize the SDK

      
        // Load the widget for each payment method category:
        // - pay_later
        // - pay_over_time
        // - pay_now
        var available_categories = source.klarna.payment_method_category.split(',');
        for (var category of available_categories) {
          Klarna.Payments.load({
            container: "#klarna_" + category + "_container",
            payment_method_category: category,
          }, function(res) {
            if (res.show_form) {
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


    const handleClick = () => {

        // get the category the customer chose(using your own code)
        //var selectedCategory = getSelectedCategory();
        // Submit the payment for authorization with the selected category

        console.log(Klarna.Payments)
        Klarna.Payments.authorize({
          payment_method_category: "pay_now"
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

    
 
  return <div>
    
        <KlarnaButton id={"paybutton"} onClick={handleClick}> 
            Pay 
        </KlarnaButton>
     
      </div>

};