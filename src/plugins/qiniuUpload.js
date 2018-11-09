import { fetch } from '../util/fetch';
import { now_times } from '../util/common';
import { Toast } from 'mint-ui';
import * as qiniu from 'qiniu-js';

export function qiniuUpload(module, event, cb){
  let imgfile = event.target.files[0];
  let key = '';
  let pointIndex = imgfile.name.lastIndexOf(".") ;
  let num = Math.floor(Math.random()*899999999+100000000);
  let suffix = imgfile.name.substring(pointIndex,imgfile.name.length);
  let time = now_times();
  key = module + time + num + suffix;
  console.log(key);
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
      cb(res);
    }
  };
  fetch('get', 'qiniu/token', {},(response)=>{
    let observable = qiniu.upload(imgfile, key, response, putExtra, config);
    let subscription = observable.subscribe(observer); // 上传开始
    //subscription.unsubscribe(); // 上传取消
  });
}

