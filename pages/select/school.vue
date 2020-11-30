<template>
	<!-- <view> -->
		<view class="main">
			<h2 class="title">选择您所在学校：</h2>
			<view class="selBox">
				<view class="selItem" v-for="(school,i) in schools" :key="i" @click="selSchool(i)">
					<image src="/static/image/select.png" mode="" class="selected" v-if="index==i"></image>
					<text class="noSelect" v-else></text>
					<text :class="i==index?'name active':'name'">{{school}}</text>
				</view>
			</view>
			
		<view class="confirm">确定</view>
		</view>
	<!-- </view> -->
</template>

<script>
	export default {
		data() {
			return {
               index:0,
			   schools:['广州科技职业技术大学','广东外语外贸大学','广东工业大学']
			};
		},
		methods:{
			selSchool(i){
				this.index=i
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #fff;
		// padding:0 76rpx ;
	}

	.main {
		height: 100%;
		padding-top: 270rpx;
		margin:0 76rpx;
		position: relative;
		.title {
			font-size: 52rpx;
			font-weight: 500;
			color: #181819;
			line-height: 74px;
		}
		.selBox{
			margin-top: 122rpx;
			
			.selItem{
				display: flex;
				align-items: center;
				margin-bottom: 32rpx;
				.selected{
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
				
				}
				.noSelect{
					width: 32rpx;
					height: 32rpx;
					border: 2rpx solid #909399;
					border-radius: 50%;
					box-sizing: border-box;
					margin-right: 10rpx;
				}
				.name{
					
					font-size: 36rpx;
					font-weight: 400;
					color: #909399;
					
				}
				.name.active{
					font-weight: 500;
					color: #181819;
				}
			}
			
			
		}
	}
	.confirm{
		// margin: 0 76rpx;
		width: 100%;
		background:#FFAE18;
		position: absolute;
		bottom: 64rpx;
		left: 0;
		text-align: center;
		box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(255,174,24,0.3);
		border-radius: 40rpx;
		
		font-size: 32rpx;
		font-weight: 500;
		color: #181819;
		padding: 18rpx 0;
line-height: 44rpx;
	}
</style>
