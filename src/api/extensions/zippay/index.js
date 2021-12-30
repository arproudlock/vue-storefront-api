import { apiStatus, apiError } from '../../../lib/util';
import { Router } from 'express';
import request from 'request';
import axios from 'axios';
// const Magento2Client = require('magento2-rest-client').Magento2Client



module.exports = ({ config, db }) => {

  const inst = this;

  function collectTotals (customerToken, cartId, shippingMethod) {

    const reqArray = { customerToken:customerToken, cartId:cartId, params: shippingMethod};
    const token = "Bearer "+config.moorup.api.token;
    const baseURL = config.moorup.api.baseUrl;
    const instance = axios.create({
      baseURL: baseURL,
      timeout: 5000,
      headers: {'Authorization': token}
    });
    // console.log(instance);
    inst.moorup = instance;


      return new Promise ((resolve, reject) => {
        try {
          inst.moorup.post('cart/shipping-information/',reqArray).then((response) => {
            console.log(response.data);
            resolve (response.data.result);
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

  api.post('/create',async (req, res) => {
  console.log(req.cartId);
  this.paymentAmount = null;
  const inst = this;
  // const reqArray = { customerToken:req.body.customerToken, cartId:req.body.cartId, params: req.body.shippingMethod};
  // console.log(req.cartId);
  // Get Cart Totals


  // const totals = await collectTotals(req.body.customerToken, req.body.cartId, req.body.shippingMethod);
  // Need to check for discount and apply correct paymentAmount...
  // this.paymentAmount = totals.totals.grand_total;

  let zipreq = {
    "shopper": {
      "title": "Mr",
      "first_name": req.query.first_name,
      "last_name": req.query.last_name,
      "middle_name": "",
      "phone": req.query.phone,
      "email": req.query.email,
      "birth_date": null,
      "gender": "",
      "billing_address": {
        "line1": "10 Test st",
        "city": "Sydney",
        "state": "NSW",
        "postal_code": "2000",
        "country": "AU"
      }
    },
    "order": {
      "reference": req.query.cartId,
      "amount": 200,
      "currency": "AUD",
      "shipping": {
        "pickup": false,
        "address": {
          "line1": "10 Test st",
          "city": "Sydney",
          "state": "NSW",
          "postal_code": "2000",
          "country": "AU"
        }
      },
      "items": [
        {
          "name": "Awesome shoes",
          "amount": 200,
          "quantity": 1,
          "type": "sku",
          "reference": "1"
        }
      ]
    },
    "config": {
      "redirect_uri": "http://localhost:3000/au/finalise-order"
    },
    "metadata": {
      "name1": "value1"
    }
  };

  var options = { method: 'POST',
    url: 'https://api.sandbox.zipmoney.com.au/merchant/v1/checkouts',
    headers:
     { 'content-type': 'application/json',
       'zip-version': '2017-03-01',
       authorization: 'Bearer test' },
    body: zipreq,
    json: true };

  request(options, function (error, response, body) {
    // if (error) throw new Error(error);
    // console.log(zipreq);
    console.log(body.error);
    // console.log(error);

    let zipResp = {
      "id": body.id,
      "uri": body.uri,
      "redirect_uri": body.uri
    }

    res.json(zipResp);
  });

  })

api.get('/redirect',async (req, res) => {
  let response = {
    "code": 200,
    "message": "Success"
  }

  // res.json(response)
  return true;
})

return api;

}
