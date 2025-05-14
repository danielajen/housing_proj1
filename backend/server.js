
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const Stripe = require('stripe');

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['POST'] 
}));
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/statcan', async (req, res) => {
  try {
    const statcanResponse = await axios.post(
      'https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVectorsAndLatestNPeriods',
      req.body
    );
    console.log('StatCan Response:', statcanResponse.data);
    res.json(statcanResponse.data);
  } catch (error) {
    console.error('Full Error:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data 
    });
  }
});


app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Support Open Housing Data',
          },
          unit_amount: 500, 
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://glocalfoundation.ca/success',
      cancel_url: 'https://glocalfoundation.ca/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Error:', err);
    res.status(500).json({ error: 'Stripe session creation failed.' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
