import { fetch } from '../util/fetch';
import { now_times } from '../util/common';
import { Toast } from 'mint-ui';
import * as qiniu from 'qiniu-js';

export function qiniuUpload(module, event, cb){
  let putExtra = {
    fname: "",
    params: {},
    mimeType: [] || null
  };
  let config = {
    useCdnDomain: true,
    region: null
  };
  let observer = {
    next(res){
      //console.log(res);
    },
    error(err){
      console.log(err);
      Toast('上传失败，请重新上传');
    },
    complete(res){
      console.log(res);
      cb(res);
    }
  };
  let imgfile = event.target.files;
  fetch('get', 'qiniu/token', {},(response)=>{
    for(let item of imgfile){
      let key = '';
      let pointIndex = item.name.lastIndexOf(".") ;
      let num = Math.floor(Math.random()*899999999+100000000);
      let suffix = item.name.substring(pointIndex,item.name.length);
      let time = now_times();
      key = module + time + num + suffix;
      console.log(key);
      let observable = qiniu.upload(item, key, response, putExtra, config);
      let subscription = observable.subscribe(observer); // 上传开始
      //subscription.unsubscribe(); // 上传取消
    }
  });
}

