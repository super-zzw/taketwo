<template>
	<view class="emptyPage" :style="{height:height}">
		<image class="imgp" src="../static/image/empty.png" mode="widthFix"></image>
		<view class="eText">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			text:{
				default:"暂无数据"
			},
			height:{
				default:"100vh"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.emptyPage{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.imgp{
			width: 184rpx;
			height: auto;
		}
		.eText{
			color: #909399;
			font-size: 28rpx;
			margin-top: 26rpx;
		}
	}
</style>
