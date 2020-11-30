<template>
	<view class="container">
		<view class="bannerBox">
			<view class="tabsBox">
				<text :class="index==i?'tab active':'tab'" v-for="(tab,i) in tabs" :key="i" @click="index=i">{{tab}}</text>
			</view>
			<view class="optBox">
				<image src="/static/image/sort.png" mode="" class="icon sort" @click="showFilter"></image>
				<image src="/static/image/search.png" mode="" class="icon"></image>
			</view>
		</view>
		<view class="orderBox">
			<view class="orderItem" v-for="(item,i) in orderList" :key="i" @click="toDetail">
				<view class="order-head">
					<view class="left">
						<text class="s1" @click="select(1,i)" v-if="!item.selected"></text>
						<image src="/static/image/select.png" mode="" class="selected" @click="select(-1,i)" v-if="item.selected"></image>
					</view>
					<view class="right">
						<image src="/static/image/time.png" mode="" class="timeIcon"></image>
						<text class="time">2020/11/24 9:28</text>
						<text class="status">{{statusTxt}}</text>
						
					</view>
				</view>
				<view class="order-cont">
					<view class="code" v-if="index==2||index==1||index==3">
						<text class="desc">取件码：</text>
						<view class="num">
							98765
							<image src="/static/image/copy.png" mode="" @click="copy"></image>
						</view>
					</view>
					<view class="stuInfo">
						<image src="/static/image/send.png" mode="" class="sendIcon"></image>
						<view class="main">
							<text class="t1">广州科大白云校区10栋12楼1206室</text>
							<text class="t2">周同学&ensp;159****9999</text>
						</view>
					</view>
					<view class="orderInfo">
						<text class="con">物流公司：菜鸟裹裹</text>
						<text class="con">收货时间：2020/10/24 中午</text>
						<view class="bott">
							<text class="con">类型：定时送/大包裹</text>
							<view class="price">
								总价：<text class="num">¥20</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="bottom" v-if="index==0||index==1">
			<view class="left" @click="allSelect">
				<text class="s1"  v-if="!allSel"></text>
				<image src="/static/image/select.png" mode="" class="selected"   v-else></image>
				<text class="all" >本页全选</text>
			</view>
			<view class="right" v-if="index==0">接单</view>
			<view class="right" v-if="index==1">分拣</view>
		</view>
		<chunLei-popups v-model="bool" :popData="data" @tapPopup="tapPopup" :x="344" :y="60" placement="top-end">
		</chunLei-popups>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	export default {
		components: {
			chunLeiPopups
		},
		computed:{
			...mapState(['role'])
		},
		data() {
			return {
				
				tabs:[],
				index: 0,
				bool: false,
				data: ['按订单编号升序', '按订单编号降序', '按取件码升序', '按取件码降序'],
				orderList:[],
				allSel:false,
				statusTxt:'待接单'
			};
		},
		async created() {
			uni.showLoading({
				title:'加载中'
			})
			this.tabs=this.role==0?['分拣接单', '待分拣', '已分拣','待配送', '已退单']:['配送接单', '待配送', '已完成', '已确认']
			await this.getOrderList()
			uni.hideLoading()
		},
		watch:{
			index(i){
				if(i==0){
					this.statusTxt='待接单'
				}else{
					console.log(i)
					this.statusTxt=this.tabs[i]
				}
			}
		},
		methods: {
			showFilter() {
				this.bool = true
			},
			tapPopup(item) {
				console.log(item)
			},
			select(val,index){
				
				if(val==-1){
					
						this.$set(this.orderList[index],'selected',false)
					
				}else{
					
						this.$set(this.orderList[index],'selected',true)
					
					
					// this.orderList[index].selected=true
				}
					console.log(val)
			},
			getOrderList(){
				let res=[{},{},{}]
				res.forEach(item=>{
					item.selected=false
				})
				this.orderList=res
			},
			allSelect(){
				this.allSel=!this.allSel
				
					this.orderList.forEach(item=>{
						if(this.allSel){
							item.selected=true
						}else{
							item.selected=false
						}
						
					})
				
			},
			toDetail(){
				uni.navigateTo({
					url:'./orderDetail'
				})
			},
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
	.bannerBox {
		background: #fff;

		display: flex;

		.tabsBox {
			padding: 20rpx 32rpx;
			// padding-left: 32rpx;
			// padding-: 32rpx;
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

		.optBox {
			background: #fff;
			padding: 0 25rpx;
			display: flex;
			align-items: center;
			// height: 100%;
			box-shadow: -6px 0px 8px 0px rgba(0, 0, 0, 0.1);

			.icon {
				width: 52rpx;
				height: 52rpx;
			}

			.sort {
				margin-right: 26rpx;
			}
		}
	}

	.orderBox {
		margin: 0 32rpx;
		padding: 32rpx 0;
		// height: calc(100vh - 96rpx - 104rpx);
		overflow: scroll;
         background: #F5F6F8;
		.orderItem {
			border-radius: 16rpx;
			background: #FFFFFF;
             margin-bottom: 40rpx;
            padding: 0 34rpx 32rpx;
			.order-head {
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 2rpx solid #EAECF1;
				box-sizing: border-box;

				.left {
					display: flex;

					
				}

				.right {
					display: flex;
					align-items: center;

					.timeIcon {
						width: 28rpx;
						height: 28rpx;
						margin-right: 10rpx;
					}

					.time {

						font-size: 28rpx;
						font-weight: 400;
						color: #606266;
						line-height: 40rpx;
						margin-right: 32rpx;
					}

					.status {

						font-size: 28rpx;
						font-weight: 400;
						color: #FF0000;
						line-height: 40rpx;
					}
				}

			}

			.order-cont {
				margin-top: 28rpx;
				font-size: 34rpx;
				font-weight: 400;
				line-height: 48rpx;

				.code {
					display: flex;
					align-items: center;
					margin-bottom: 38rpx;

					.desc {
						color: #606266;
					}

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

				.stuInfo {
					display: flex;
					align-items: center;

					.sendIcon {
						width: 54rpx;
						height: 54rpx;
						margin-right: 18rpx;
					}

					.main {
						display: flex;
						flex-direction: column;

						.t1 {
							margin-bottom: 4rpx;

							font-size: 34rpx;

							font-weight: 500;
							color: #181819;
							line-height: 48rpx;

							overflow: hidden; //超出的文本隐藏
							text-overflow: ellipsis; //溢出用省略号显示

							white-space: nowrap; //溢出不换行
						}

						.t2 {

							font-size: 32rpx;

							font-weight: 400;
							color: #303133;
							line-height: 44rpx;
						}
					}
				}
				.orderInfo{
					margin-top: 40rpx;
					display: flex;
					flex-direction: column;
					.con{
						
						font-size: 32rpx;
						
						font-weight: 400;
						color: #606266;
						line-height: 44rpx;
						margin-bottom: 20rpx;
					}
					
					.bott{
						display: flex;
						justify-content: space-between;
						.con{
							margin-bottom: 0;
						}
						.price{
							
							font-size: 32rpx;
							
							font-weight: 400;
							color: #606266;
							line-height: 44rpx;
							.num{
								color: #FF0000;
							}
						}
					}
				}
			}
		}
	}
	.bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 96rpx;
		background: #FFFFFF;
		padding:0 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			.all{
				font-size: 28rpx;
				font-weight: 400;
				color: #606266;
				line-height: 40rpx;
				margin-left: 6rpx;
			}
			display: flex;
			align-items: center;
			
		}
		.right{
			width: 220rpx;
			height: 68rpx;
			background: #FFAE18;
			box-shadow: 0px 4px 20px 0px rgba(255,174,24,0.3);
			border-radius: 34rpx;
			
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #181819;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.s1 {
		width: 32rpx;
		height: 32rpx;
		border: 2rpx solid #C0C4CC;
		border-radius: 50%;
	}
	.selected{
		width: 36rpx;
		height: 36rpx;
	}
</style>
