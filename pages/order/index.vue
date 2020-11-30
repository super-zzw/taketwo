<template>
	<view class="container">
		<view class="bannerBox">
			<view class="tabsBox">
				<text :class="index==i?'tab active':'tab'" v-for="(tab,i) in tabs" :key="i">{{tab}}</text>
			</view>
			<view class="optBox">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: ['分拣接单', '待分拣', '已分拣', '已退单'],
				index: 0
			};
		}
	}
</script>

<style lang="scss" scoped>
	.bannerBox {
		background: #fff;
		padding: 20rpx 0;

		.tabsBox {
			padding-left: 32rpx;
           width: 568rpx;
		   overflow-x: scroll;
		   display: flex;
		   flex-wrap: nowrap;
			.tab {

				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
                white-space: nowrap;
				color: #909399;
				line-height: 44rpx;
				padding: 10rpx 22rpx;
				margin-right: 20rpx;

				background: #F1F2F4;

				border-radius: 10rpx;
			}

			.tab.active {
				color: #181819;
				background: #FFAE18;
			}
		}
	}
</style>
