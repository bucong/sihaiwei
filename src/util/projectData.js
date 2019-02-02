import { fetch } from "./fetch";
import {handleLocalStorage} from "./common";

//服务器地址
// const URL = 'http://localhost:3000/api/';
const URL = 'http://47.100.51.191:3000/api/';

//三方登录回调地址
const thridLoginUrl = {
  wxEncode: 'http%3a%2f%2f47.100.51.191%2fsihaiwei%2f',

  // qqEncode: 'http%3a%2f%2flocalhost%3a8088%2fsihaiwei%2f',
  // qqEncode: 'http%3a%2f%2f192.168.0.118%3a8088%2fsihaiwei%2f',
  qqEncode: 'http%3a%2f%2f47.100.51.191%2fsihaiwei%2f',

  qq: 'http://share.zrpic.com/jnwtv-live-cartoon-h5/test.html'
};

export { URL, thridLoginUrl };

fetch('get', 'config/info', {}, res => {
  handleLocalStorage('set', 'configInfo', JSON.stringify(res));
});
