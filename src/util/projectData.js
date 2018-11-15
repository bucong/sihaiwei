import { fetch } from "./fetch";

//服务器地址
// const URL = 'http://localhost:3000/api/';
const URL = 'http://47.100.51.191:3000/api/';
//服务器图片地址
// let IMG = 'http://localhost:3000/public/img/';
let IMG = 'http://47.100.51.191:3000/public/img/';
// fetch('get', 'config/info', {}, (res)=>{
//   IMG = res.imgURL;
// });
//三方登录回调地址
const thridLoginUrl = {
  wxEncode: 'http%3a%2f%2f47.100.51.191%2f',

  // qqEncode: 'http%3a%2f%2flocalhost%3a8088%2f',
  qqEncode: 'http%3a%2f%2f47.100.51.191%2f',

  qq: 'http://share.zrpic.com/jnwtv-live-cartoon-h5/test.html'
};

export { URL, IMG, thridLoginUrl };
