<template>
	<view class="container">
		<view class="bannerBox">
			<view class="tabsBox">
				<text :class="index==i?'tab active':'tab'" v-for="(tab,i) in tabs" :key="i" @click="index=i">{{tab}}</text>
			</view>
			<view class="optBox">
				<image src="/static/image/sort.png" mode="" class="icon"></image>
			</view>
		</view>
		<chunLei-popups  :popData="data" @tapPopup="tapPopup" :x="344" :y="20" placement="top-end">
		</chunLei-popups>
	</view>
</template>

<script>
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	export default {
		components:{chunLeiPopups},
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
		
        display: flex;
		.tabsBox {
			padding: 20rpx 0;
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
		.optBox{
			background: #fff;
			padding:0 25rpx;
			display: flex;
			align-items: center;
			height: 100%;
box-shadow: -6px 0px 8px 0px rgba(0,0,0,0.1);
			.icon{
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
</style>
