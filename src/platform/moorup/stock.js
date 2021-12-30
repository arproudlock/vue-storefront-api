import AbstractStockProxy from '../abstract/stock'
import { multiStoreConfig } from './util'
import axios from 'axios';

class StockProxy extends AbstractStockProxy {
  constructor (config, req) {
    // const Magento2Client = require('magento2-rest-client').Magento2Client;
    super(config, req)
    // this.api = Magento2Client(multiStoreConfig(config.magento2.api, req));
    this.token = 'Bearer ' + config.moorup.api.token;
    this.baseURL = config.moorup.api.baseUrl;
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: 5000,
      headers: {'Authorization': this.token}
    });
    // console.log(instance);
    this.api = instance;
  }

  check ({sku, stockId = 0}) {
    const inst = this;
    const reqArray = { sku: sku, stockId: stockId };

    return new Promise((resolve, reject) => {
      try {
        inst.api.post('stock/check/', reqArray).then((response) => {
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
  }
}

module.exports = StockProxy
