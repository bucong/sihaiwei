import {is_weixn_qq} from './common';
import {thridLoginUrl} from './projectData';
export function thirdLogin(){
  if(is_weixn_qq() === 'wx'){
    // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeb904482e11189cf&redirect_uri="+thridLoginUrl.wxEncode+"&response_type=code&scope=snsapi_userinfo&state=wx#wechat_redirect";
    //微信测试通道
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeb904482e11189cf&redirect_uri=http%3a%2f%2fshare.zrpic.com%2fjnwtv-live-cartoon-h5%2ftest.html&response_type=code&scope=snsapi_userinfo&state="+thridLoginUrl.qqEncode+"#wechat_redirect";
  }else{
    // 其他浏览器使用QQ
    // window.location.href="https://graph.qq.com/oauth2.0/authorize?client_id=101479867&redirect_uri="+thridLoginUrl.qqEncode+"&response_type=code&scope=get_user_info&state=qq&display=mobile";
    // QQ测试通道
    // window.location.href="https://graph.qq.com/oauth2.0/authorize?client_id=101479867&redirect_uri=http%3a%2f%2fshare.zrpic.com%2fjnwtv-live-cartoon-h5%2ftest.html&response_type=code&scope=get_user_info&state="+thridLoginUrl.qqEncode+"&display=mobile";
    window.location.href="https://graph.qq.com/oauth2.0/authorize?client_id=101479867&redirect_uri=http%3a%2f%2fshare.zrpic.com%2fjnwtv-live-cartoon-h5%2ftest.html&response_type=code&scope=get_user_info&state="+thridLoginUrl.qqEncode;
  }
}
