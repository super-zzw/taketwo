<template>
	<view class="container">
		<view class="contentBox">
			<view class="status">订单状态：<text class="txt">待分拣</text></view>
			<view class="sec sec1">
				<view class="head">
					物流公司：菜鸟裹裹
				</view>
				<view class="conts">
					<view class="code">
						<text class="desc">取件码：</text>
						<view class="num">
							98765
							<image src="/static/image/copy.png" mode="" @click="copy"></image>
						</view>
					</view>
					<view class="infoBox">
						<image src="../../static/image/send.png" mode="" class="icon"></image>
						<view class="info">
							<text class="t1">广州科大白云校区10栋12楼1206室</text>
							<text class="t2">周同学&ensp;159****9999</text>
						</view>
					</view>
					<view class="infoBox mt40">
						<image src="../../static/image/receive.png" mode="" class="icon"></image>
						<view class="info">
							<text class="t1">广州科大白云校区 旧图书馆1楼102商铺</text>
			
						</view>
					</view>
				</view>
			</view>
			<view class="sec sec2">
				<view class="txt">订单流水号：2020847383482 <image src="/static/image/copy.png" mode="" @click="copy"></image>
				</view>
				<text class="txt">订单类型：加急</text>
				<text class="txt">包裹类型：大包裹</text>
				<text class="txt">收货时间：2020/11/24 中午</text>
				<text class="txt">下单时间：2020/11/24 9:28</text>
				<text class="txt">订单备注：易碎物品请轻拿轻放</text>
				<view class="txt">总价：<text class="price">¥20</text></view>
			</view>
			<view class="sec sec3">
				接单时间：2020/10/24 10:30
			</view>
		</view>
		

		<view class="bottom">
			<view class="box">
				<view class="contact">
					<image src="/static/image/contact.png" mode=""></image>
					<text>联系下单人</text>
				</view>
				<view class="btn btn1" @click="showModal=true">退单</view>
				<view class="btn btn2">分拣</view>
			</view>
		</view>
		
		<Modal :showModal="showModal"
		></Modal>
	</view>
</template>

<script>
	import Modal from '../../components/modal.vue'
	export default {
		components:{Modal},
		data() {
			return {
               showModal:false
			};
		},
		methods: {
			copy() {
				uni.setClipboardData({
					data: 'hello',
					success: function() {
						console.log('success');
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 32rpx;
	}
	.contentBox{
		height: calc(100vh - 128rpx);
		overflow: scroll;
		padding-bottom: 40rpx;
		box-sizing: border-box;
	}

	.status {
		margin-top: 38rpx;
		font-size: 36rpx;
		font-weight: 500;
		color: #181819;
		line-height: 50rpx;

		.txt {
			color: #FF0000;
		}
	}

	.sec {
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 0 32rpx;
		display: flex;
		flex-direction: column;
	}

	.sec1 {
		margin-top: 24rpx;
		padding-bottom: 36rpx;

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

		.conts {
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

			.infoBox {
				display: flex;
				align-items: center;

				&.mt40 {
					margin-top: 40rpx;
				}

				.icon {
					width: 54rpx;
					height: 54rpx;
					margin-right: 18rpx;
				}

				.info {
					display: flex;
					flex-direction: column;

					.t1 {

						font-size: 34rpx;

						font-weight: 500;
						color: #181819;
						line-height: 48rpx;

					}

					.t2 {
						margin-top: 4rpx;
						font-size: 32rpx;

						font-weight: 400;
						color: #303133;
						line-height: 44rpx;
					}
				}
			}
		}
	}

	.sec2 {
		padding: 40rpx 34rpx;
		margin-top: 40rpx;

		.txt {
			margin-bottom: 20rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #606266;

			display: flex;
			align-items: center;

			image {
				width: 26rpx;
				height: 30rpx;
				margin-left: 16rpx;
			}

			.price {
				color: #FF0000;
			}
		}
	}

	.sec3 {
		margin-top: 40rpx;
		padding: 26rpx 34rpx;

		font-size: 32rpx;

		font-weight: 400;
		color: #606266;
		line-height: 44rpx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 128rpx;
		width: 100%;
		border-top: 2rpx solid #DBDFE6;
		background: #FFFFFF;
		display: flex;
		align-items: center;

		.box {
			padding-left: 66rpx;
			display: flex;
			align-items: center;

			.contact {
				margin-right: 62rpx;

				image {
					width: 64rpx;
					height: 64rpx;
					display: block;
					margin: 0 auto;
				}

				text {

					font-size: 24rpx;

					font-weight: 400;
					color: #909399;
					line-height: 34rpx;
				}
			}

			.btn {

				border-radius: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 220rpx;
				height: 80rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #181819;
				box-sizing: border-box;

				&.btn1 {

					border: 2rpx solid #909399;
					margin-right: 30rpx;
				}

				&.btn2 {

					background: #FFAE18;
					box-shadow: 0px 4px 20px 0px rgba(255, 174, 24, 0.3);
				}
			}
		}
	}
</style>
