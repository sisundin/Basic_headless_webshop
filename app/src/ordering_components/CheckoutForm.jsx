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
import CheckoutError from "./prebuilt/CheckoutError";

export default function CheckoutForm({ price }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, [])


  
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };


  const handleSubmit = async ev => {

    ev.preventDefault();


    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        postal_code: ev.target.zip.value
      },
      phone: ev.target.phone.value
    };

    console.log(billingDetails)

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails

      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      window.location.replace("http://localhost:3000/success");


    }
  };

  const CardElementContainer = styled.div`
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

  const iframeStyles = {
    base: {
      iconColor: "black",
      "::placeholder": {
        color: "#87bbfd"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  
  };

  return (
    <div>
      <h6> Or pay with card </h6>


      <form onSubmit={handleSubmit}>
      <div class="text-center"> 
        <Row>
          <BillingDetailsFields/>
        </Row>
      </div>
        <Row>
        <CardElement id="card-element" options={cardElementOpts} onChange={handleChange} />
          <SubmitButton
            disabled={processing || disabled || succeeded}
            id="submit"
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay with card"
              )}
            </span> {price}
          </SubmitButton>
      </Row>
      </form>
    </div>
  );
};