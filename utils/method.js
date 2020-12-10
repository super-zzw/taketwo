import store from '../store'
import {http,httpAll} from './request.js'
import { upLoadImg } from './request.js';
export default{
	wxLogin(){
		// console.log(1515)
		return new Promise((resolve,reject) => {
			uni.login({
			  provider: 'weixin',
			  success: function (res) {
				  // console.log(res.code)
				if (res.code) {
				    uni.getUserInfo({
				    	provider: 'weixin',
				    	success: function(infoRes) {
							let result = {}
							Object.assign(result,infoRes,{jsCode:res.code})
							
							
							resolve(result);
				    	},
				    	fail(res) {
							resolve(false)
						}
				    });
				}else{
					resolve(false)
				}
			  },
			  fail:function(res){resolve(false)}
			})
		})
	},
	copy(data){
		uni.setClipboardData({
			data: data,
			success() {
				uni.showToast({
					title: "复制成功",
				})
			},
			
		});
	},
	//登录成功设置
	setSesion(session){ 
		uni.setStorageSync('session',session)
	},
	//退出登录
	rmData(){
		uni.removeStorageSync('session');  
		store.commit('isLoginSet',false);
	},
	//数据校验
	judgeData(arr) {
		let res = true;
		for (let item of arr) {
			if (item.data.length == 0) {
				res = false;
				uni.hideLoading();
				setTimeout(_=>{
					uni.showToast({
						icon: 'none',
						title: item.info,
						duration: 2000
					});
				})
				break
			}
		}
		return res
	},
	//将时间戳转化为格式化日期和时间
	unixToDatetime(unix,x=1){
		var unix=Number(unix)
		  var date = null;
		  if(unix){
		    date = new Date(unix);
		  }else {
		    date = new Date;
		  }
		  let Y = date.getFullYear();
		  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
		  let D = date.getDate() < 10 ? '0' + date.getDate(): date.getDate();
		  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		  if(x === 1){return (Y+'/'+M+'/'+D+' '+h+':'+m);}//2017-09-29 21:00
		  if(x === 2){return (Y+M+'-'+D+':'+"00"+":"+"00");}//2019-09-29 00:00
		  if(x === 3){return (Y+M+'-'+D);}//2019-09-29
		  if(x === 5){return (Y+M+'-'+"01");}//2019-09-01
		  if(x === 6){return (Y+M);}//2019-09
		  if(x === 7){return (Y+M+'-'+D+h+m+':'+s);}//精确到秒
		  if(x === 8){return (h+':'+m);}//21+':':30
		   if(x==9){return (date.getFullYear()+'.'+M+'.'+D)}
		  if(x === 0){//取上一个月
		    var Y2 = date.getFullYear(); //获取当前日期的年份
		    var M2 = parseInt(date.getMonth());
		    if (M2 === 1) {//如果是1月份，则取上一年的12月份
		      Y2 = parseInt(Y2) - 1;
		      month2 = 12;
		    }
		    return (Y2+'-'+M2);
		  }
		  
	},
    transToDate(data) {
    	var days = parseInt(data / (1000 * 60 * 60 * 24));
    	var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    	var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
    	var seconds = (data % (1000 * 60)) / 1000;
    	return {
    		d:days,
    		h:hours,
    		m:minutes,
    		s:seconds
    	};
    },
	phoneFormat(phone){
		let result=''
		 phone.split('').forEach((item,i)=>{
			if(i>=3&&i<7){
				item='*'
			}
			result+=item
		})
		return result
	},
	//处理拒绝的跳转
	dealRejectPage(){
		console.log(store.state.jumpPage);
		if(!store.state.jumpPage.rejectPath){
			uni.switchTab({
				url:"/pages/index/index"
			})
		}else{
			if(store.state.jumpPage.isTab){
				uni.switchTab({
					url:store.state.jumpPage.rejectPath
				})
			}else{
				uni.redirectTo({
					url:store.state.jumpPage.rejectPath
				})
			}
		}
	},
	//处理登陆成功的跳转
	dealResolvePage(){
		if(!store.state.jumpPage.path){
			uni.reLaunch({
				url:"/pages/index/index"
			})
		}else{
			if(store.state.jumpPage.isTab){
				uni.reLaunch({
					url:store.state.jumpPage.path
				})
			}else{
				uni.reLaunch({
					url:store.state.jumpPage.path
				})
			}
		}
	},
	//图片上传
	uploadFile(){
		return new Promise((resolve, reject)=>{
			uni.chooseImage({
			    count: 1, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album','camera'], //从相册选择
			    success: function (res) {
					upLoadImg({
						apiName:"upLoadFile",
						filePath:res.tempFilePaths[0],
						name:"file"
					}).then(ret => {
						resolve(ret.data)
					}).catch(_ => {
						reject(false)
					})
			    },
				fail(err) {
					reject(false);
					console.log(err)
				}
			});
		})
	},
	getConfig(){
		
		http({
			apiName:'config'
		}).then(res=>{
			// console.log(123,res)
			store.commit('setConfig',res.data)
		}).catch(err=>{
			// console.log(456,err)
		})
	},
	getMemberInfo(){
		return new Promise((resolve,reject)=>{
			http({
					apiName:'getMemberInfo'
				}).then(res=>{
					resolve(res)

				}).catch(err=>{
					reject(err)
				})
		})
	},
	
}