/**
 * 判断浏览器类型
 */
export function is_weixn_qq(){
  let ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return "wx"; //是微信
  } else if (ua.match(/QQ/i) == "qq") {
    return "qq"; //是QQ
  } else {
    return false; //其他浏览器
  }
}
/**
 * 对LocalStorage 进行 存， 取， 移除 操作
 * method: 'get' , 'set' , 'remove'
 */
export function handleLocalStorage(method, key, value) {
  switch (method) {
    case 'get' : {
      let temp = window.localStorage.getItem(key);
      if (temp) {
        return temp
      } else {
        return false
      }
    }
    case 'set' : {
      window.localStorage.setItem(key, value);
      break
    }
    case 'remove': {
      window.localStorage.removeItem(key);
      break
    }
    default : {
      return false
    }
  }
}
/**
 * 获取url问号后参数
 */
export function getUrlParam(name) {
  let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
  if(reg.test(window.location.href)){
    return unescape(RegExp.$2.replace(/\+/g," "))
  }else{
    return false;
  }
}
/**
 * 解析时间戳
 */
export function transDate(dateStr){
  dateStr=parseInt(dateStr);
  var date = new Date(dateStr);
  var Y = date.getFullYear();
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
  // var H = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
  // var m = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
  return (Y+'-'+M+'-'+D);
}
/**
 * IOS修改浏览器title
 */
export function changeTitle(title) {
  document.title = title;
  let iframe = document.createElement("iframe");
  iframe.style.display="none";
  iframe.setAttribute("src", "http://104.zrpic.com/jnwtv-live-cartoon-h5/static/title.html");
  let d = function() {
    setTimeout(function() {
      iframe.removeEventListener('load', d);
      document.body.removeChild(iframe);
    }, 0);
  };
  iframe.addEventListener('load', d);
  document.body.appendChild(iframe);
}
