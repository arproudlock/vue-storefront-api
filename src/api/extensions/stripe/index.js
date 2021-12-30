import { apiStatus, apiError } from '../../../lib/util';
import { Router } from 'express';
import request from 'request';
import axios from 'axios';
// const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config, db }) => {
  const inst = this;

  function collectTotals (customerToken, cartId, shippingMethod) {
    const reqArray = { customerToken: customerToken, cartId: cartId, params: shippingMethod};
    const token = 'Bearer ' + config.moorup.api.token;
    const baseURL = config.moorup.api.baseUrl;
    const instance = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: {'Authorization': token}
    });
    // console.log(instance);
    inst.moorup = instance;

    return new Promise((resolve, reject) => {
      try {
        inst.moorup.post('cart/shipping-information/', reqArray).then((response) => {
          console.log(response.data);
          resolve(response.data.result);
        }, (error) => {
          console.log(error);
          reject(error);
        });
      } catch (e) {
        reject(e)
      }
    });
  };

  let api = Router();
  var stripe = require('stripe')(config.extensions.stripe.key);
  // var stripe = require('stripe')('sk_test_AOYhP19kzQ1XlfpiURLBqXHW00GHmVk8L4');

  api.post('/create', async (req, res) => {
    console.log(req.body.cartId);
    this.paymentAmount = null;
    const inst = this;
    // const reqArray = { customerToken:req.body.customerToken, cartId:req.body.cartId, params: req.body.shippingMethod};
    // console.log(req.cartId);
    // Get Cart Totals

    const totals = await collectTotals(req.body.customerToken, req.body.cartId, req.body.shippingMethod);
    // Need to check for discount and apply correct paymentAmount...
    this.paymentAmount = totals.totals.grand_total;

    // try {
    // const totals = await inst.moorup.post('cart/shipping-information/',reqArray).then((response) => {
    //   console.log(response.data.result.totals.grand_total);
    //   // inst.paymentAmount;
    //   resolve (response.data.result);
    // }, (error) => {
    //   console.log(error);
    //   // reject(error);
    // });
    // } catch (e) {
    //     // reject(e)
    //     console.log(e);
    // }
    const paymentIntent = stripe.paymentIntents.create({
      amount: Math.ceil(inst.paymentAmount * 100),
      currency: 'aud',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'}
    }).then((result) => {
      console.log(result.client_secret);
      // apiStatus(res, result, 200);
      res.json({client_secret: result.client_secret});
    }).catch(err => {
      apiError(res, 500, err);
    });
    // console.log(paymentIntent.client_secret);
    // res.json({client_secret: paymentIntent.client_secret});
    // res.json({message: 'success'})
  })

  // api.post('/update', (req, res) => {

  // })

  return api;
}
