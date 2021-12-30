import AbstractCartProxy from '../abstract/cart'
import { multiStoreConfig } from './util'
import axios from 'axios';

class CartProxy extends AbstractCartProxy {
  constructor (config, req) {
    // const Magento2Client = require('magento2-rest-client').Magento2Client;
    super(config, req)
    // this.api = Magento2Client(multiStoreConfig(config.magento2.api, req));
    this.token = "Bearer "+config.moorup.api.token;
    this.baseURL = config.moorup.api.baseUrl;
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: 5000,
      headers: {'Authorization': this.token}
    });
    // console.log(instance);
    this.api = instance;
  }

  create (customerToken) {
    const inst = this;
    const reqArray = { customerToken:customerToken };
      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/create/',reqArray).then((response) => {
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

  }

  update (customerToken, cartId, cartItem) {
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, cartItem:cartItem };

      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/update/',reqArray).then((response) => {
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
  }

  delete (customerToken, cartId, cartItem) {
    // return this.api.cart.delete(customerToken, cartId, cartItem)
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, cartItem:cartItem };

    return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/delete/',reqArray).then((response) => {
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
  }

  pull (customerToken, cartId,  params) {
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, params:params };

      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/pull/',reqArray).then((response) => {
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
  }

  totals (customerToken, cartId,  params) {
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, params:params };

      return new Promise ((resolve, reject) => {
        try {
          inst.api.get('cart/totals/',reqArray).then((response) => {
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
  }

  getShippingMethods (customerToken, cartId, address) {
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, params:address };

      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/shipping-methods/',reqArray).then((response) => {
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
  }

  getPaymentMethods (customerToken, cartId) {
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId};

      return new Promise ((resolve, reject) => {
        try {
          inst.api.get('cart/payment-methods/',reqArray).then((response) => {
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
  }

  setShippingInformation (customerToken, cartId, address) {
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, params: address};

      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/shipping-information/',reqArray).then((response) => {
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
  }

  collectTotals (customerToken, cartId, shippingMethod) {
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, params: shippingMethod};

      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/shipping-information/',reqArray).then((response) => {
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
  }

  applyCoupon (customerToken, cartId, coupon) {
    // return this.api.cart.applyCoupon(customerToken, cartId, coupon)
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId, coupon: coupon};

      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/apply-coupon/',reqArray).then((response) => {
            console.log(response.data);
            if(response.data.result) {
              resolve (response.data.result);
            } else {
              reject(response.data.result);
            }

          }, (error) => {
            console.log(error);
            reject(error);
          });
        } catch (e) {
            reject(e)
        }
    });
  }

  deleteCoupon (customerToken, cartId) {
    // return this.api.cart.deleteCoupon(customerToken, cartId)
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId};

      return new Promise ((resolve, reject) => {
        try {
          inst.api.post('cart/delete-coupon/',reqArray).then((response) => {
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
  }

  getCoupon (customerToken, cartId) {
    // return this.api.cart.getCoupon(customerToken, cartId)
    const inst = this;
    const reqArray = { customerToken:customerToken, cartId:cartId};

      return new Promise ((resolve, reject) => {
        try {
          inst.api.get('cart/coupon/',reqArray).then((response) => {
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
  }
}

module.exports = CartProxy
