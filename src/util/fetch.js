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

let userInfo = {
  account: '15601732620',
  userSn: '15601732620',
  userToken: '1233343534535435353443354'
};
export function fetch (method, url, data, cb) {
  if(handleLocalStorage('get', 'userInfo')){
    userInfo = JSON.parse(handleLocalStorage('get','userInfo'));
  }
  data.account = userInfo.account;
  data.token = userInfo.userToken;
  data.userSn = userInfo.userSn;
  data.userToken = userInfo.userToken;
  let requestHeadStr = {
    clientType: 'H',
    timeStamp: new Date().getTime(),
    account: userInfo.account,
    clientBrand: '',
    clientModel: '',
    clientSystemNo: '',
    clientDeviceNo: uuid,
    clientVersion: '2.47.0',
    serverVersion: '2.47.0',
    clientChannel: 'H',
    clientCode: 1300
  };
  data.requestHeadStr = JSON.stringify(requestHeadStr);
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
      if(res.data.Result === "0"){
        if(res.data.Data){
          console.log(JSON.parse(JSON.stringify(res.data.Data)));
          cb(res.data.Data)
        }else{
          cb(res.data)
        }
      }
      else if(res.data.Result === "08" || res.data.Result === "8"){
        handleLocalStorage('remove', 'userInfo');
        window.location.href = '/jnwtv-live-cartoon-h5/people';
      }
      else if(res.data.Result === "4009"){
        cb(res.data)
      }else{
        let unicode = res.data.Desc;
        Toast(unescape(unicode.replace(/\\u/g, '%u')));
      }
    }).catch((err) => {
      Indicator.close();
      console.log(err);
      // Toast('服务器开小差了。。。')
    })
  }
  if (method === 'post') {
    let formdata = new FormData();
    for(let value in data){
      formdata.append(value,data[value]);
    }
    axios({
      url: newurl,
      method: 'post',
      data: formdata
    },{timeout: 5000}).then((res) => {
      if(res.data.Result === "0"){
        console.log(JSON.parse(JSON.stringify(res.data.Data)));
        cb(res.data.Data)
      }else{
        let unicode = res.data.Desc;
        Toast(unescape(unicode.replace(/\\u/g, '%u')))
      }
    }).catch((err) => {
      console.log(err);
      // Toast('服务器开小差了。。。')
    })
  }
}
