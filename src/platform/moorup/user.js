import AbstractUserProxy from '../abstract/user'
import { multiStoreConfig } from './util'
import axios from 'axios';

class UserProxy extends AbstractUserProxy {
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

    register (userData) {
      const inst = this;
          return new Promise ((resolve, reject) => {
            try {
              inst.api.post('user/create/',userData).then((response) => {
                console.log(response.data);
                if(response.data.code == 200){
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

    login (userData) {
      const inst = this;
          return new Promise ((resolve, reject) => {
            try {
              inst.api.post('user/login/',userData).then((response) => {
                console.log(response.data);
                if(response.data.code == 200){
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

    me (requestToken) {
        const inst = this;
        const reqArray = { token:requestToken};
          return new Promise ((resolve, reject) => {
            try {
              inst.api.post('user/me/',reqArray).then((response) => {
                console.log(reqArray);
                console.log(response.data);
                if(response.data.code == 200){
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
    orderHistory (requestToken) {
        const inst = this;
        return new Promise ((resolve, reject) => {
            try {
              inst.api.post('user/order-history/',requestToken).then((response) => {
                console.log(response.data);
                if(response.data.code == 200){
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

    resetPassword (emailData) {
        const inst = this;
          return new Promise ((resolve, reject) => {
            try {
              inst.api.post('user/reset-password/',emailData).then((response) => {
                console.log(response.data);
                if(response.data.code == 200){
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

    update (userData) {
      const inst = this;
          return new Promise ((resolve, reject) => {
            try {
              inst.api.post('user/me/',userData).then((response) => {
                console.log(response.data);
                if(response.data.code == 200){
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

    changePassword (passwordData) {
      const inst = this;
          return new Promise ((resolve, reject) => {
            try {
              inst.api.post('user/change-password/',passwordData).then((response) => {
                console.log(response.data);
                if(response.data.code == 200){
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
}

module.exports = UserProxy
