<template>
	<view class="wrap">
		<view class="mItem">
			<view class="mTitle"></view>
			<view class="mBox mBox1">
				<image src="https://wx.qlogo.cn/mmhead/PuL96pVthdbAm92VzhJcOA1x8gYkL2fRVibSXnyehCsE/0" class="mPic" mode=""></image>
				<view class="name">
					用户名
					<text class="name2">分拣员</text>
				</view>
				<view class="phone">
					13788888888
				</view>
				<view class="team" data-target="bottomModal" @tap="showModal">
					A团队-广州科技职业技术大学
					<image class="team12" src="../../static/image/you1.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="mItem">
			<view class="mTitle">接单数据(分拣)</view>
			<view class="mBox mBox2">
				<view class="box1">
					<image src="../../static/image/bin.png" class="boxIcon" mode="widthFix"></image>
					<view class="mTabs">
						<view class="mTab" v-for="(item,index) in tabs" :key="index" :class="activeTab0 == index ? 'active' : ''">{{item}}</view>
					</view>
				</view>
				<view class="box2">
					<view class="box2Item">
						<view class="nms">15</view>
						<view class="statu">待接单</view>
					</view>
					<view class="box2Item">
						<view class="nms">15</view>
						<view class="statu">已分拣</view>
					</view>
					<view class="box2Item">
						<view class="nms">8</view>
						<view class="statu">已退单</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mItem">
			<view class="mTitle">接单数据(配送)</view>
			<view class="mBox mBox2">
				<view class="box1">
					<image src="../../static/image/bin.png" class="boxIcon" mode="widthFix"></image>
					<view class="mTabs">
						<view class="mTab" v-for="(item,index) in tabs" :key="index" :class="activeTab0 == index ? 'active' : ''">{{item}}</view>
					</view>
				</view>
				<view class="box2">
					<view class="box2Item">
						<view class="nms">15</view>
						<view class="statu">待接单</view>
					</view>
					<view class="box2Item">
						<view class="nms">15</view>
						<view class="statu">已分拣</view>
					</view>
					<view class="box2Item">
						<view class="nms">8</view>
						<view class="statu">已退单</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			退出登录
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog mDialog">
				<view class="mdTitle">选择团队和学校</view>
				<view class="mdBox">
					<view class="mdCol">
						<view class="mdCol0">
							所在团队
						</view>
						<view class="mdCol1">
							<view class="mdItem active">
								A团队
							</view>
							<view class="mdItem">
								B团队
							</view>
							<view class="mdItem">
								C团队
							</view>
						</view>
					</view>
					<view class="mdCol mdCol2">
						<view class="mdCol0">
							所在学校
						</view>
						<view class="mdCol1">
							<view class="mdItem">
								A学校
							</view>
							<view class="mdItem active">
								B学校
							</view>
							<view class="mdItem">
								C学校
							</view>
						</view>
					</view>
				</view>
				<view class="dBoo">
					<view class="dBtns">
						<view class="dBtn dBtn0" @tap="hideModal">
							取消
						</view>
						<view class="dBtn dBtn1" @tap="hideModal">
							确定
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:["全部","今日","近7天","近30日"],
				activeTab0:1,
				activeTab1:1,
				modalName:null
			};
		},
		methods:{
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style lang="scss" scoped>
.wrap{
	min-height: 100vh;
	box-sizing: border-box;
	padding: 32rpx;
	background-color: #F5F6F8;
	.mItem{
		.mTitle{
			color: #181819;
			font-weight: 500;
			font-size: 36rpx;
			margin-top: 40rpx;
			margin-bottom: 24rpx;
		}
		.mBox{
			background-color: #FFFFFF;
			border-radius: 16rpx;
			padding: 28rpx 34rpx;
		}
		.mBox1{
			padding-top: 38rpx;
			padding-bottom: 38rpx;
			text-align: center;
			.mPic{
				width: 92rpx;
				height: 92rpx;
				border-radius: 50%;
				margin: auto;
				display: block;
			}
			.name{
				margin: auto;
				margin-top: 16rpx;
				display: inline-block;
				position: relative;
				color: #181819;
				font-size: 40rpx;
				font-weight: 500;
				.name2{
					position: absolute;
					width: 82rpx;
					height: 40rpx;
					line-height: 40rpx;
					color: #fff;
					font-size: 22rpx;
					background: #FF0000;
					border-radius: 24px 24px 24px 0px;
					right: -86rpx;
					top: 0;
					text-align: center;
					margin-top: 6rpx;
				}
			}
			.phone{
				color: #606266;
				font-size: 28rpx;
			}
			.team{
				margin: auto;
				margin-top: 36rpx;
				background-color: #F1F2F4;
				border-radius: 10rpx;
				display: flex;
				color: #181819;
				font-size: 28rpx;
				align-items: center;
				width: fit-content;
				padding: 8rpx 36rpx;
				.team12{
					nav-left: 12rpx;
					width: 28rpx;
					height: auto;
				}
			}
		}
		.mBox2{
			.box1{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 26rpx;
				border-bottom: 2rpx solid #EAECF1;
				.boxIcon{
					width: 42rpx;
					height: 42rpx;
				}
				.mTabs{
					display: flex;
					align-items: center;
					font-size: 28rpx;
					margin-left: 30rpx;
					color: #909399;
					.mTab{
						margin-left: 30rpx;
					}
					.mTab.active{
						color: #FFAE18;
						position: relative;
					}
					.mTab.active::after{
						width: 100%;
						position: absolute;
						bottom: -28rpx;
						height: 2rpx;
						content: "";
						background-color: #FFAE18;
						left: 0;
					}
				}
				
			}
			.box2{
				display: flex;
				justify-content: space-between;
				padding-top: 44rpx;
				padding-bottom: 20rpx;
				.box2Item{
					flex: 0 0 33.3%;
					text-align: center;
					.nms{
						color: #181819;
						font-size: 48rpx;
						font-weight: 600;
					}
					.statu{
						margin-top: 8rpx;
						color: #606266;
						font-size: 28rpx;
					}
				}
			}
		}
	}
	.btn{
		margin-top: 40rpx;
		border-radius: 40rpx;
		line-height: 80rpx;
		border: 2rpx solid #909399;
		text-align: center;
		color: #181819;
		font-size: 32rpx;
		font-weight: 500;
	}
	.mDialog{
		height: 740rpx;
		background-color: #fff;
		padding: 56rpx 66rpx 32rpx;
		padding-bottom: 120rpx;
		position: relative;
		
		border-radius: 40rpx 40rpx 0rpx 0rpx;
		.mdTitle{
			color: #181819;
			font-size: 40rpx;
			font-weight: 500;
		}
		.mdBox{
			margin-top: 66rpx;
			display: flex;
			.mdCol{
				.mdCol0{
					line-height: 74rpx;
					border-bottom: 2rpx solid #D8D8D8;
					color: #909399;
					font-size: 28rpx;
				}
				.mdCol1{
					.mdItem{
						line-height: 96rpx;
						color: #909399;
						font-size: 36rpx;
					}
					.mdItem.active{
						color: #FFAE18;
					}
				}
			}
			.mdCol2{
				flex: 1;
				height: 400rpx;
				overflow-y: auto;
				text-align: left;
				.mdCol0{
					padding-left: 20rpx;
				}
				.mdCol1{
					padding-left: 20rpx;
				}
			}
		}
		.dBoo{
			position: absolute;
			width: 100%;
			padding-left: 66rpx;
			padding-right: 66rpx;
			box-sizing: border-box;
			bottom: 32rpx;
			left: 0;
		}
		.dBtns{
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
			.dBtn{
				width: 45%;
				height: 80rpx;
				box-sizing: border-box;
				border-radius: 40rpx;
				color: #181819;
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
				font-weight: 500;
			}
			.dBtn0{
				border: 2rpx solid #909399;
			}
			.dBtn1{
				background: #FFAE18;
				box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(255,174,24,0.3);
			}
		}
	}
}
</style>
