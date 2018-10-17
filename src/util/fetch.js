import axios from 'axios';
import qs from 'qs';
import { Toast, Indicator } from 'mint-ui';
import { handleLocalStorage } from './common';
import { URL } from './projectData';

import { getUuid } from '../plugins/uuid';
let uuid = '';
if(handleLocalStorage('get', 'uuid')){
  uuid = handleLocalStorage('get', 'uuid');
}else{
  uuid = getUuid();
  handleLocalStorage('set', 'uuid', uuid);
}

export function fetch (method, url, data, cb) {
  let newurl = URL + url;
  if (method === 'get') {
    if(data !== ''){
      newurl = URL + url + '?' + qs.stringify(data);
    }
    axios({
      url: newurl,
      method: 'get'
    }).then((res) => {
      Indicator.close();
      console.log(JSON.parse(JSON.stringify(res.data)));
      let data = res.data;
      if(data.code === 0){
        cb(data.data);
      }else{
        Toast(data.msg);
      }
    }).catch((err) => {
      Indicator.close();
      console.log(err);
      // Toast('服务器开小差了。。。')
    })
  }
  if (method === 'post') {
    axios({
      url: newurl,
      method: 'post',
      data: data
    },{timeout: 5000}).then((res) => {
      Indicator.close();
      console.log(JSON.parse(JSON.stringify(res.data)));
      let data = res.data;
      if(data.code === 0){
        cb(data.data);
      }else{
        Toast(data.msg);
      }
    }).catch((err) => {
      console.log(err);
      // Toast('服务器开小差了。。。')
    })
  }
}
