import Api from './api.js'
import utils from "./method.js"
var test = false;
var _baseUrl = '';
if (test) {
	
	_baseUrl = 'http://mgm-api.dev.gzcyou.com/api';  //内网穿透地址
} else {
	// _baseUrl = 'https://api.migmkids.com/api';  //正式地址
	_baseUrl = 'http://192.168.1.25:7600/wechat/team/auth';  //本地地址
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
				"Content-Type":"application/x-www-form-urlencoded",
				"hyjy-SessionId":uni.getStorageSync("session") || "",
			},
			url: baseUrl + Api[opt.apiName],
			method:opt.method || 'GET',
			data:_data,
			success:res => {
				if(res.statusCode == 200){
					if(res.data && res.data.code == 200000){
						resolve(res.data)
					} else if (res.data && res.data.code == 300000) {
				
						uni.hideLoading()
						utils.rmData();
						uni.reLaunch({
							url: "/pages/author/author"
						})
						reject(res)
						
					} else {
						uni.hideLoading();
						if(!opt.hiddenToast){
							uni.showToast({
								icon: 'none',
								title: res.data.message,
								duration: 1500
							});
						}
						setTimeout(_=>{
							reject(res)
						},200)
					}
				} else {
					uni.hideLoading()
					reject('服务器错误')
				}
			},
			fail: err => {
				uni.hideLoading()
				reject('请求错误')
			}
		})
	})
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
