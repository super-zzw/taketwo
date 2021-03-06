import Api from './api.js'
import store from '../store/index.js'
import utils from "./method.js"
import qs from 'querystring'
var test = true;
var _baseUrl = '';
if (test) {
	 // _baseUrl = 'http://legwork-wechatgateway.dev.gzcyou.com'; 
	 _baseUrl = 'https://webapp2.test.together-link.com/wechat-gateway'; 
	// _baseUrl = 'http://mgm-api.dev.gzcyou.com/api';  //内网穿透地址
} else {
	// _baseUrl = 'https://api.migmkids.com/api';  //正式地址
	_baseUrl = 'http://192.168.1.17:7600';  //本地地址
	// _baseUrl = 'http://lin-mng.dev.gzcyou.com';  //本地地址
}
var baseUrl = _baseUrl;
// 请求loading交给页面处理
// 页面中第一个需要使用登录的请求需要加await,若同一个页面多个请求需要避免多次loading

// 单次请求
export function http(opt) {
	let _data = Object.assign({}, opt.data || {})
	return new Promise((resolve, reject) => {
		uni.request({
			header:{
				"Content-Type":opt.contentType||"application/x-www-form-urlencoded",
				"Authorization":uni.getStorageSync("token") || "",
				
			},
			url: baseUrl +(opt.apiName?Api[opt.apiName]:opt.url),
			method:opt.method || 'GET',
			params:opt.params,
			data:_data ,
			success:res => {
				if(res.statusCode == 200){
					
					if(res.data.ret === 0){
					      resolve(res.data)
					     }else{
					      uni.showToast({
					       icon: 'none',
					       title: res.data.msg,
					       duration: 1500
					      });
					      setTimeout(_=>{
					       reject(res)
					      },1500)
					     }
				} else {
					if(res.statusCode === 401){
						checkStatus(opt)
					}else{
						reject('服务器错误')
					}
					uni.hideLoading()
					
				}
			},
			fail: err => {
				uni.hideLoading()
				reject('请求错误')
			}
		})
	})
}




// 默认纸条
let isRefreshing = true
function checkStatus(opt) {
  
    // 刷新token的函数,这需要添加一个开关，防止重复请求
    if(isRefreshing){
        refreshTokenRequst()
    }
    isRefreshing = false;
    // 将当前的请求保存在观察者数组中
      const retryOriginalRequest = new Promise((resolve) => {
                addSubscriber(()=> {
                    resolve(http(opt))
                })
            });
            return retryOriginalRequest;
  }



function refreshTokenRequst(){
    let data;
    const refreshToken = uni.getStorageSync('reToken');
    data={
        token:refreshToken,
    }
    http({
       apiName:'refreshToken',
        method: 'POST',
        data,
    }).then((res)=>{
        // 刷新完成后,将刷新token和refreshToken存储到本地
     uni.setStorageSync('token',res.token); // 存token
     uni.setStorageSync('reToken',res.reToken); // 存刷新token
        // 并且将所有存储到观察者数组中的请求重新执行。
        onAccessTokenFetched();
		store.commit('setReload',true)
        // 纸条撕掉
        isRefreshing = true;
    });
}
// 观察者
let subscribers = [];
function onAccessTokenFetched() {
    subscribers.forEach((callback)=>{
        callback();
    })
	
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

export function httpAll(opts) {
	let promiseList = [];
	for (let i = 0; i < opts.length; i++) {
		let opt = opts[i];
		promiseList.push(http(opt, true))
	}
	var ret = Promise.all(promiseList);
	return ret;
}

export function upLoadImg(opt) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + Api[opt.apiName],
			filePath: opt.filePath,
			name: opt.name,
			formData: {
				'type': 1
			},
			header: {
				"hyjy-SessionId": uni.getStorageSync("session") || "",
			},
			success: (res) => {
				let _res = JSON.parse(res.data);
				console.log(_res);
				if (_res.code == 200000) {
					resolve(_res)
				} else {
					uni.showToast({
						title: '上传失败',
						icon: 'none'
					})
					reject("上传图片失败02")
				}
			},
			fail: () => {
				uni.showToast({
					title: '上传失败',
					icon: 'none'
				})
				reject("上传图片失败01")
			}
		})
	})
}
