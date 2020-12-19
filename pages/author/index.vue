<template>
	<view class="container">
		<text class="t1">跑腿小程序申请使用</text>
		<text class="t2">以下信息：</text>
		<text class="t3">你的账号信息(昵称、头像、手机号)</text>
		(本小程序仅限于Taketwo跑腿业务人员使用，如授权后无法登录，请联系平台管理员在管理后台添加权限后，再尝试授权登录。)
		<button class="btn btn1" hover-class="none" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo()" >同意</button>
		
		<view class="btn btn2">取消</view>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog cDialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">点击确定获取手机号</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="diaCont">
					<button class="pBtn" hover-class="none" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber" >确定</button>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils/method.js'
	export default {
		data() {
			return {
				loginData:null,
				modalName:null
			}
		},
		methods:{
		
		showModal() {
			this.modalName = 'DialogModal1';
		},
		hideModal() {
			this.modalName = null;
		},
		async onGotUserInfo() {
			let _self = this;
			uni.showLoading({
			    title: '授权请求中...'
			});
			let res = await utils.wxLogin();
			if(res){
				this.loginData = res;
				let _data = {
					code:res.jsCode,
					encryptedData:res.encryptedData,
					iv:res.iv
				}
				await this.$http({
					apiName:"login",
					method:"POST",
					data:_data,
				}).then(async res => {
					console.log(res)
					uni.setStorageSync('token',res.token); // 存token
					uni.setStorageSync('reToken',res.reToken); // 存刷新token
					// uni.setStorageSync('userInfo',res.wechat_info); // 存session
				 this.$getMemberInfo().then(res=>{
					 // console.log(res)
					 this.$store.commit('setMemberInfo',res)
				 				if(!res.user_info.tid){
				 						uni.reLaunch({
				 								url:'/pages/select/team'
				 							})
				 						}else{
											this.$isResolve()
				 							uni.reLaunch({
				 								url:'/pages/order/index'
				 							})
											
				 						}
				 })
					
					
					
				}).catch(err => {
					// this.hideModal()
					console.log(212,err)
					if(err.data.ret==11003){
						this.showModal()
					}
					
				})
				
			}
			uni.hideLoading()
		 },
		 async getPhoneNumber(e){
		 	if(e.detail.errMsg == "getPhoneNumber:ok"){
				
				let _data = {
					code:this.loginData.jsCode,
					encryptedData:e.detail.encryptedData,
					iv:e.detail.iv
				}
				await this.$http({
					apiName:"bindPhone",
					method:"POST",
					data:_data,
				}).then(res => {
					console.log('绑定成功')
					uni.setStorageSync('token',res.token); // 存token
										uni.setStorageSync('reToken',res.reToken); // 存刷新token
										// uni.setStorageSync('userInfo',res.wechat_info); // 存session
					this.$getMemberInfo().then(res=>{
										 // console.log(res)
										 this.$store.commit('setMemberInfo',res)
									if(!res.user_info.tid){
											uni.reLaunch({
													url:'/pages/select/team'
												})
											}else{
																this.$isResolve()
												uni.reLaunch({
													url:'/pages/order/index'
												})
																
											}
					})
										
					this.hideModal()
				}).catch(err => {
					this.hideModal()
					uni.showToast({
						title:'授权失败',
						icon:'none'
					})
				})
		 	}else{
				this.hideModal()
				uni.showToast({
					title:'授权失败',
					icon:'none'
				})
		 		
		 	}
		 }
		}
	}
</script>

<style lang="scss" scoped>
  page{
	
  }
  .container{
	  display: flex;
	  flex-direction: column;
	 width: 100vw;
	 height: 100vh;
	    background: #FFFFFF;
		padding:0 44rpx;
	  .t1{
	  	  font-size: 32rpx;
	  	  font-weight: 400;
	  	  color: #181819;
	  	  line-height: 44rpx;
		  margin-top: 64rpx;
	  }
	  .t2{
		  font-size: 44rpx;
		  font-weight: 400;
		  color: #181819;
		  line-height: 60rpx;
		  margin-top: 16rpx;
	  }
	  .t3{
		  margin-top: 48rpx;
		  
		  font-size: 32rpx;
		
		  font-weight: 400;
		  color: #181819;
		  line-height: 44rpx;
		  position: relative;
		  padding-left:22rpx ;
	  }
	  .t3:before{
		  content: '';
		  display: block;
		  position: absolute;
		  left: 0rpx;
		  top: 15rpx;
		  border-radius: 50%;
		  width: 10rpx;
		  height: 10rpx;
		  background: #FFAE18;
	  }
	  .btn{
		  
height: 80rpx;
border-radius: 40rpx;

font-size: 28rpx;
font-weight: 500;
color: #181819;
display: grid;
place-items: center;
	  }
	  .btn1{
		  width: 100%;
		  background: #FFAE18;
		  box-shadow: 0px 4px 20px 0px rgba(255,174,24,0.3);
		  margin-top: 260rpx;
	  }
	  .btn2{
		  
border: 2rpx solid #909399;
background: #fff;
margin-top: 40rpx;
	  }
	  
  }
  .cDialog{
  	.diaCont{
  		padding-top: 40rpx;
  		padding-bottom: 40rpx;
  		.content{
  			color: #181819;
  			font-size: 32rpx;
  			font-weight: 500;
  		}
  		.pBtn{
  			background: #FFAE18;
  			box-shadow: 0 0 20rpx 0rpx rgba(255,174,24,0.3);
  			color: #181819;
  			font-size: 32rpx;
  			font-weight: 500;
  			width: 200rpx;
  			height: 80rpx;
  			line-height: 80rpx;
  			margin: auto;
  			border-radius: 40rpx;
  		}
  	}
  }
</style>
