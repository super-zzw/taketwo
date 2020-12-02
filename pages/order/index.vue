<template>
	<view class="container">
		<view class="bannerBox">
			<view class="tabsBox">
				<text :class="index==i?'tab active':'tab'" v-for="(tab,i) in tabs" :key="i" @click="index=i">{{tab}}</text>
			</view>
			<view class="optBox">
				<image src="/static/image/sort.png" mode="" class="icon sort" @click="showFilter"></image>
				<image src="/static/image/search.png" mode="" class="icon" @click="search"></image>
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
				<text class="s1" v-if="!allSel"></text>
				<image src="/static/image/select.png" mode="" class="selected" v-else></image>
				<text class="all">本页全选</text>
			</view>
			<view class="right" v-if="index==0">接单</view>
			<view class="right" v-if="index==1">分拣</view>
		</view>
		<chunLei-popups v-model="bool" :popData="data" @tapPopup="tapPopup" :x="344" :y="60" placement="top-end">
		</chunLei-popups>

		<!-- 搜索 -->
		<view class="cu-modal bottom-modal" :class="modalName=='search'?'show':''">
			<view class="cu-dialog dialog dialog1">
				 <icon type="clear" size="26" class="close" @tap="modalName=null"/>
				<text class="title">订单搜索</text>
				<view class="inputBox">
					<input type="text" v-model="ipt" placeholder="请输入姓名、电话、订单号" />
					<image src="/static/image/search.png" mode=""></image>
				</view>
				<view class="content">
					<view class="tt">
						<text class="label">订单标签</text>
						<view class="cont">
							<view class="box" @click="modalName='fenjian'">
								{{tagsList[tagIndex]}}
								<image src="/static/image/you1.png" mode="" class="icon"></image>
							</view>
						</view>
					</view>
					<view class="tt">
						<text class="label">收货地址</text>
						<view class="cont">

							<view class="box" @click="modalName='address'">
								10栋
								<image src="/static/image/you1.png" mode="" class="icon"></image>
							</view>
						</view>
					</view>
                    <view class="tt">
                    	<text class="label">下单时间</text>
                    	<view class="cont">
                            <view class="cont1">
								<view class="box" @tap="modalName='date'">
									2020/10/24 9:00
									<image src="/static/image/down.png" mode="" class="icon" style="margin-left: 10rpx;"></image>
								</view> <text>至</text>
							</view>
                    		<view class="box" @tap="modalName='date'">
                    			2020/10/30 9:00
                    			<image src="/static/image/down.png" mode="" class="icon" style="margin-left: 10rpx;"></image>
                    		</view> 
                    	</view>
                    </view>
					<view class="tt">
						<text class="label">收货时间</text>
						<view class="cont">
					        <!-- <view class="cont1"> -->
								<view class="box" @tap="modalName='date'">
									2020/10/24 9:00
									<image src="/static/image/down.png" mode="" class="icon" style="margin-left: 10rpx;"></image>
								</view> 
							<!-- </view> -->
							
						</view>
					</view>
					<view class="tt">
						<text class="label">物流公司</text>
						<view class="cont">
					        <view class="cont1">
								<view class="box">
									菜鸟裹裹
								</view> 
								<view class="box">
									顺丰快递
								</view> 
								<view class="box">
									京东物流
								</view> 
								
							</view>
							
						</view>
					</view>
					<view class="tt">
						<text class="label">订单类型</text>
						<view class="cont">
					        <view class="cont1">
								<view class="box">
									加急
								</view> 
								<view class="box">
									定时送
								</view> 
							
								
							</view>
							
						</view>
					</view>
					<view class="tt">
						<text class="label">包裹类型</text>
						<view class="cont">
					        <view class="cont1">
								<view class="box">
									大包裹
								</view> 
								<view class="box">
									小包裹
								</view> 
							
								
							</view>
							
						</view>
					</view>
				</view>
				<view class="btns">
					<view class="btn btn1" @tap="reset">重置</view>
					<view class="btn btn2" @tap="confirm">确定</view>
				</view>
			</view>
		</view>

		<!-- 选择订单标签 -->
		<view class="cu-modal bottom-modal" :class="modalName=='fenjian'?'show':''">
			<view class="cu-dialog dialog dialog2">
				<text class="title">选择订单标签</text>
				<view class="tagsList">
					<view v-for="(item,i) in tagsList" :key="i" :class="tagIndex==i?'tag active':'tag'" @click="tagIndex=i">
						{{item}}
					</view>
				</view>
				<view class="btns btns1">
					<view class="btn btn2" @tap="hideModal">重置</view>
					<view class="btn btn1" @click="fenjianFlag=1,modalName='search'">确定</view>
				</view>
			</view>
		</view>

		<!-- 选择宿舍楼层 -->
		<view class="cu-modal bottom-modal" :class="modalName=='address'?'show':''">
			<view class="cu-dialog dialog dialog3">
					<view class="mdTitle">选择宿舍楼层</view>
				
				<view class="mdBox">
					<view class="mdCol">
						<view class="mdCol0">
							楼
						</view>
						<view class="mdCol1">
							<view :class="selectAddr[0]==i1?'mdItem active':'mdItem'" v-for="(item1,i1) in addressList.list1" :key="i1" @click="change1(i1)">
								{{item1}}
							</view>
							
						</view>
					</view>
					<view class="mdCol mdCol2">
						<view class="mdCol0">
							层
						</view>
						<view class="mdCol1">
							<view class="mdItem" :class="selectAddr[1]==i2?'mdItem active':'mdItem'" v-for="(item2,i2) in addressList.list2[selectAddr[0]]" :key="i2" @click="change2(i2)">
								{{item2}}
							</view>
							
						</view>
					</view>
					
				</view>
				<view class="dBoo">
					<view class="dBtns">
						<view class="dBtn dBtn0" @tap="hideModal">
							取消
						</view>
						<view class="dBtn dBtn1" @tap="hideModal('search')">
							确定
						</view>
					</view>
				</view>
			</view>
		</view>
		<DatePicker :modalName="modalName" @hideModal="hideModal('search')"/>
	</view>
	
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	import addressList from '../../utils/address.js'
	import DatePicker from '../../components/datePicker.vue'
	
	export default {
		components: {
			chunLeiPopups,DatePicker
		},
		computed: {
			...mapState(['role'])
		},
		
		data() {
			return {
          
				tabs: [],
				index: 0,
				bool: false,
				data: ['按订单编号升序', '按订单编号降序', '按取件码升序', '按取件码降序'],
				orderList: [],
				allSel: false,
				statusTxt: '待接单',
				modalName: null,
				ipt: '',
				tagsList: ['科大宿舍楼10栋', '科大宿舍楼9栋', '科大宿舍楼8栋', '科大宿舍楼7栋'],
				tagIndex: 0,
				addressList:addressList,
				selectAddr:[0,0]
			};
		},
		async created() {
			// console.log(addressList)
			uni.showLoading({
				title: '加载中'
			})
			if(uni.getStorageInfoSync(''))
			this.tabs = this.role == 0 ? ['分拣接单', '待分拣', '已分拣', '待配送', '已退单'] : ['配送接单', '待配送', '已完成', '已确认']
			await this.getOrderList()
			uni.hideLoading()
		},
		watch: {
			index(i) {
				if (i == 0) {
					this.statusTxt = '待接单'
				} else {
					console.log(i)
					this.statusTxt = this.tabs[i]
				}
			}
		},
		watch:{
			modalName(val){
				if(val==null){
					uni.showTabBar()
				}
			}
		},
		methods: {
			hideModal(name='null'){
				this.modalName = name
			},
			search() {
				uni.hideTabBar()
				this.modalName = 'search'
			},
			reset(){
				
			},
			confirm(){
				
			},
			showFilter() {
				this.bool = true
			},
			tapPopup(item) {
				console.log(item)
			},
			select(val, index) {

				if (val == -1) {

					this.$set(this.orderList[index], 'selected', false)

				} else {

					this.$set(this.orderList[index], 'selected', true)


					// this.orderList[index].selected=true
				}
				console.log(val)
			},
			getOrderList() {
				let res = [{}, {}, {}]
				res.forEach(item => {
					item.selected = false
				})
				this.orderList = res
			},
			allSelect() {
				this.allSel = !this.allSel

				this.orderList.forEach(item => {
					if (this.allSel) {
						item.selected = true
					} else {
						item.selected = false
					}

				})

			},
			toDetail() {
				uni.navigateTo({
					url: './orderDetail'
				})
			},
			copy() {
				uni.setClipboardData({
					data: 'hello',
					success: function() {
						console.log('success');
					}
				});
			},
			change1(i){
				this.$set(this.selectAddr,0,i)
				this.$set(this.selectAddr,1,0)
				
				
			},
			change2(i){
				this.$set(this.selectAddr,1,i)
				
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

				.orderInfo {
					margin-top: 40rpx;
					display: flex;
					flex-direction: column;

					.con {

						font-size: 32rpx;

						font-weight: 400;
						color: #606266;
						line-height: 44rpx;
						margin-bottom: 20rpx;
					}

					.bott {
						display: flex;
						justify-content: space-between;

						.con {
							margin-bottom: 0;
						}

						.price {

							font-size: 32rpx;

							font-weight: 400;
							color: #606266;
							line-height: 44rpx;

							.num {
								color: #FF0000;
							}
						}
					}
				}
			}
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 96rpx;
		background: #FFFFFF;
		padding: 0 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			.all {
				font-size: 28rpx;
				font-weight: 400;
				color: #606266;
				line-height: 40rpx;
				margin-left: 6rpx;
			}

			display: flex;
			align-items: center;

		}

		.right {
			width: 220rpx;
			height: 68rpx;
			background: #FFAE18;
			box-shadow: 0px 4px 20px 0px rgba(255, 174, 24, 0.3);
			border-radius: 34rpx;

			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #181819;
			display: grid;
			place-items: center;
			/* display: flex;
			align-items: center;
			justify-content: center; */
		}
	}

	.s1 {
		width: 32rpx;
		height: 32rpx;
		border: 2rpx solid #C0C4CC;
		border-radius: 50%;
	}

	.selected {
		width: 36rpx;
		height: 36rpx;
	}

	.dialog {
		padding: 56rpx 64rpx 40rpx;
		border-radius: 40rpx 40rpx 0rpx 0rpx !important;
         max-height: 1200rpx;
		 overflow: scroll;
		 position: relative;
		 .close{
			 position: absolute;
			 right: 20rpx;
			 top: 20rpx;
		 }
		.title {
			font-size: 40rpx;

			font-weight: 500;
			color: #181819;
			line-height: 56rpx;
		}

		.inputBox {
			box-sizing: border-box;
			margin-top: 40rpx;
			width: 100%;
			height: 88rpx;
			border-radius: 44rpx;
			border: 2rpx solid #C0C4CC;
			padding: 22rpx 90rpx 22rpx 32rpx;
			position: relative;

			input {
				text-align: left;
				font-size: 32rpx;

				font-weight: 400;
				color: #181819;
			}

			image {
				width: 52rpx;
				height: 52rpx;
				position: absolute;
				right: 28rpx;
				top: 18rpx;
			}
		}

		.tt {
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;

			.label {
				text-align: left;
				font-size: 32rpx;

				font-weight: 500;
				color: #181819;
				line-height: 44rpx;
				margin-bottom: 20rpx;
			}

			.cont {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
              .cont1{
				  display: flex;
				  
				
				  text{
					  font-size: 32rpx;
					  				 
					  font-weight: 500;
					  color: #181819;
					  line-height: 44rpx;
				  }
			  }
				.box {
					padding: 10rpx 24rpx;
					border-radius: 10rpx;
                     display: flex;
					background: #F1F2F4;
					display: flex;
					align-items: center;
					margin-right: 32rpx;
                    margin-bottom: 20rpx;
					// display: inline-block;
					.icon {
						width: 32rpx;
						height: 32rpx;
                       
					}
				}



			}
		}
	}

	// 分拣模态框
	.dialog2 {
		.content {
			margin-top: 64rpx;
			display: flex;
			align-items: center;

			.label {

				font-size: 32rpx;

				font-weight: 500;
				color: #181819;
				line-height: 44rpx;
			}

			.tagBox {
				display: flex;
				align-items: center;
				padding: 10rpx 24rpx;
				background: #F1F2F4;

				.name {

					font-size: 32rpx;

					font-weight: 400;
					color: #181819;
					line-height: 44rpx;
				}

				image {
					width: 30rpx;
					height: 28rpx;
					margin-left: 10rpx;
				}
			}
		}

		.btns {
			margin-top: 170rpx;
		}

		.tagsList {
			padding: 0 18rpx;
			margin-top: 88rpx;
			// display: grid;
			// grid-template-columns:274rpx 274rpx;
		  columns: 2;
			// gap:32rpx 24rpx ;

			.tag {

				border-radius: 10rpx;
				background: #F1F2F4;
				border-radius: 10rpx;
				width: 274rpx;
				height: 64rpx;
				display: grid;
				place-items: center;
				font-size: 32rpx;
				font-weight: 400;
				color: #909399;
				line-height: 44rpx;

				&.active {

					background: #FFAE18;
					color: #181819;
				}
			}

			.tag:nth-child(even) {
				margin-right: 0;
			}
		}

		.btns1 {
			margin-top: 50rpx;
		}
	}

	.btns {

		margin-top: 58rpx;
		display: flex;
		justify-content: space-between;

		.btn {
			width: 292rpx;
			height: 80rpx;

			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #181819;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 40rpx;

			&.btn1 {
				background: #FFAE18;
			}

			&.btn2 {

				border: 2rpx solid #909399;
			}
		}
	}
	
	// 选择宿舍楼层
	.dialog3{
		width: 100%;
		
		.mdTitle{
			color: #181819;
			font-size: 40rpx;
			font-weight: 500;
		}
		.mdBox{
			margin-top: 40rpx;
			display: flex;
			.mdCol{
				.mdCol0{
					line-height: 74rpx;
					border-bottom: 2rpx solid #D8D8D8;
					color: #909399;
					font-size: 28rpx;
					text-align: left;
				}
				.mdCol1{
					overflow-y: scroll;
					height: 500rpx;
					.mdItem{
						line-height: 60rpx;
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
				// height: 400rpx;
				
				text-align: left;
				.mdCol0{
					padding-left: 40rpx;
				}
				.mdCol1{
					padding-left: 40rpx;
					overflow-y: scroll;
					height: 500rpx;
					
				}
			}
		
		}
		.dBoo{
			// position: absolute;
			width: 100%;
			
			box-sizing: border-box;
			// bottom: 32rpx;
			// left: 0;
			margin-top: 60rpx;
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
	.box.active{
		
background: #FFAE18;
	}
</style>
