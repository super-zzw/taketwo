<template>
	<view class="container">
		<view class="status">订单状态：<text class="txt">待分拣</text></view>
		<view class="sec sec1">
			<view class="head">
				物流公司：菜鸟裹裹
			</view>
			<view class="conts">
				<view class="code" >
					<text class="desc">取件码：</text>
					<view class="num">
						98765
						<image src="/static/image/copy.png" mode="" @click="copy"></image>
					</view>
				</view>
				<view class="info">
					<image src="../../static/image/send.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			copy(){
				uni.setClipboardData({
				    data: 'hello',
				    success: function () {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding:0 32rpx ;
	}
   .status{
	   margin-top: 38rpx;
	   font-size: 36rpx;
	   font-weight: 500;
	   color: #181819;
	   line-height: 50rpx;
	   .txt{
		   color: #FF0000;
	   }
   }
   .sec{
	   background: #FFFFFF;
	   border-radius: 16rpx;
	   padding: 0 32rpx;
   }
   .sec1{
	   margin-top: 24rpx;
	   .head {
	   	height: 96rpx;
	   	display: flex;
	   	align-items: center;
	   	border-bottom: 2rpx solid #EAECF1;
	   	box-sizing: border-box;
        
        font-size: 28rpx;
       
        font-weight: 400;
        color: #606266;
	   
	   }
	   .conts{
		   .code {
			   
			   margin: 24rpx 0;
		   	display: flex;
		   	align-items: center;
		 
		 font-size: 34rpx;
		
		 font-weight: 400;
		 color: #606266;
		   
		   
		   	.num {
		   		color: #181819;
		   		display: flex;
		   		align-items: center;
		   
		   		image {
		   			width: 36rpx;
		   			height: 36rpx;
		   			margin-left: 10rpx;
		   		}
		   	}
		   }
	   }
   }
</style>
