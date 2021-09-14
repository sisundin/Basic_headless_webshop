const express = require("express");
const app = express();
const { resolve } = require("path");


require('dotenv').config()

// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require('stripe')(process.env.REACT_APP_SECRET_KEY);
const cors = require('cors')
app.use(cors())
app.use(express.static("http://localhost:3000"));
app.use(express.json());
var exec = require("child_process").exec;


const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};



app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post("/create-klarna-payment-intent", async () => {
  await (await stripe).createSource({
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
  }).then(async function(result) {
    console.log(result.error)
    console.log(result.source)
    return result.source
  }).catch( e => { console.error(e) }); 
});


app.post("/webhook", (req, res) => {
  const event = req.body;
  var obj = JSON.parse(req.body);
  console.log(obj);
  console.log(req.body)
  // Call your action on the request here

  switch(event.type) {
    case 'checkout.completed':
      const session = event.data.object;
      console.log("Session ID = ", session.id); 
      break
    case 'payment.intent.created': 
      const paymentintent = event.data.object; 
      consol.log("Payment intend created, with id: ", paymentintent.id);
      break;
      default:
        console.log("Unknown event type ", event.type);

  }
  res.status(200).end() // Responding is important
})






app.listen(4242, () => console.log('Node server listening on port 4242!'));