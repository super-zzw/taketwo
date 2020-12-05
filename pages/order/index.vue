<template>
	<view class="container">
		<view class="bannerBox">
			<view class="tabsBox">
				<text :class="index==i+1?'tab active':'tab'" v-for="(tab,i) in tabs" :key="i" @click="index=i+1">{{tab}}</text>
			</view>
			<view class="optBox">
				<image src="/static/image/sort.png" mode="" class="icon sort" @click="showFilter"></image>
				<image src="/static/image/search.png" mode="" class="icon" @click="search"></image>
			</view>
		</view>
		<block v-if="orderList.length>0">
			<view class="orderBox">
				<view class="orderItem" v-for="(item,i) in orderList" :key="i" >
					<view class="order-head">
						<view class="left">
							<text class="s1" @click="select(1,i)" v-if="!item.selected"></text>
							<image src="/static/image/select.png" mode="" class="selected" @click="select(-1,i)" v-if="item.selected"></image>
						</view>
						<view class="right">
							<image src="/static/image/time.png" mode="" class="timeIcon" v-if="index!=1&&index!=2"></image>
							<text class="time">{{item.createTime|dateFormat}}</text>
							<block v-if="currentRole==1">
								<text class="status" v-if="item.status==1">待接单</text>
								<text class="status" v-if="item.status==2">待分拣</text>
								<text class="status" v-if="item.status==3">已分拣</text>
								<text class="status" v-if="item.status==4">代配送</text>
								<text class="status" v-if="item.status==5">已退单</text>
							</block>
							<block v-if="currentRole==2">
								<text class="status" v-if="item.status==1">待接单</text>
								<text class="status" v-if="item.status==2">配送中</text>
								<text class="status" v-if="item.status==3">已完成</text>
								<text class="status" v-if="item.status==4">已确认</text>
							</block>
			
						</view>
					</view>
					<view class="order-cont" @click="toDetail">
						<view class="code" v-if="iteem.fetchCode">
							<text class="desc">取件码：</text>
							<view class="num">
								{{item.fetchCode}}
								<image src="/static/image/copy.png" mode="" @click="copy"></image>
							</view>
						</view>
						<view class="stuInfo">
							<image src="/static/image/send.png" mode="" class="sendIcon"></image>
							<view class="main">
								<text class="t1">{{item.receiverAddress}}</text>
								<text class="t2">{{item.receiverName}}&ensp;{{item.receiverPhone}}</text>
							</view>
						</view>
						<view class="orderInfo">
							<text class="con">物流公司：{{item.logisticsName}}</text>
							<text class="con">收货时间：{{item.receivingStartTime|dateFormat}}-{{item.receivingEndTime|dateFormat(8)}}</text>
							<view class="bott">
								<text class="con">类型：{{item.type==1?'定时送':'加急送'}}/{{item.parcelType==1?'大包裹':'小包裹'}}</text>
								<view class="price">
									总价：<text class="num">¥{{item.paymentAmount}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			
			</view>
			<view class="bottom" v-if="index==1||index==2">
				<view class="left" @click="allSelect">
					<text class="s1" v-if="!allSel"></text>
					<image src="/static/image/select.png" mode="" class="selected" v-else></image>
					<text class="all">本页全选</text>
				</view>
				<view class="right" v-if="index==1">接单</view>
				<view class="right" v-if="index==2&&currentRole==1">分拣</view>
				<view class="right" v-if="index==2&&currentRole==2">配送完成</view>
			</view>
		</block>
		<Empty v-else></Empty>
		<chunLei-popups v-model="bool" :popData="data" @tapPopup="tapPopup" :x="344" :y="60" placement="top-end">
		</chunLei-popups>

		<!-- 搜索 -->
		<view class="cu-modal bottom-modal" :class="modalName=='search'?'show':''">
			<view class="cu-dialog dialog dialog1">
				 <icon type="clear" size="26" class="close" @tap="modalName=null"/>
				<text class="title">订单搜索</text>
				<view class="inputBox">
					<input type="text" v-model="searchData.searchValue" placeholder="请输入姓名、电话、订单号" />
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
								{{addressTxt}}
								<image src="/static/image/you1.png" mode="" class="icon"></image>
							</view>
						</view>
					</view>
                    <view class="tt">
                    	<text class="label">下单时间</text>
                    	<view class="cont">
                            <view class="cont1">
								<view class="box" @tap="modalName='date',dateType='ordersBeginTime'" >
									{{ordersBeginTimeTxt}}
									<image src="/static/image/down.png" mode="" class="icon" style="margin-left: 10rpx;"></image>
								</view> <text>至</text>
							</view>
                    		<view class="box" @tap="modalName='date',dateType='ordersEndTime'">
                    			{{ordersEndTimeTxt}}
                    			<image src="/static/image/down.png" mode="" class="icon" style="margin-left: 10rpx;"></image>
                    		</view> 
                    	</view>
                    </view>
					<view class="tt">
						<text class="label">收货时间</text>
						<view class="cont">
					        <!-- <view class="cont1"> -->
								<view class="box" @tap="modalName='date',dateType='receivingTime'">
									{{receivingTxt}}
									<image src="/static/image/down.png" mode="" class="icon" style="margin-left: 10rpx;"></image>
								</view> 
							<!-- </view> -->
							
						</view>
					</view>
					<view class="tt">
						<text class="label">物流公司</text>
						<view class="cont">
					        <view class="cont1">
								<view class="box" v-for="item in config.logisticsList" :key="item.id">
									{{item.logisticsCompany}}
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
								<view class="box" v-for="item in config.parcelType" :key="item.id">
									{{item.title}}
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
							<view :class="selectAddr[0]==i1?'mdItem active':'mdItem'" v-for="(item1,i1) in addressList" :key="i1" @click="change1(i1)">
								{{item1.building_name}}
							</view>
							
						</view>
					</view>
					<view class="mdCol mdCol2">
						<view class="mdCol0">
							层
						</view>
						<view class="mdCol1">
							<view class="mdItem" :class="selectAddr[1]==i2?'mdItem active':'mdItem'" v-for="(item2,i2) in addressList[selectAddr[0]].layers_num" :key="i2" @click="change2(i2)">
								{{item2+1}}层
							</view>
							
						</view>
					</view>
					
				</view>
				<view class="dBoo">
					<view class="dBtns">
						<view class="dBtn dBtn0" @tap="hideModal">
							取消
						</view>
						<view class="dBtn dBtn1" @tap="addressConfirm">
							确定
						</view>
					</view>
				</view>
			</view>
		</view>
		<DatePicker :modalName="modalName" @confirm="selTime" @cancel="hideModal('search')" :type="dateType"/>
	</view>
	
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import utils from '../../utils/method.js'
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	// import addressList from '../../utils/address.js'
	import DatePicker from '../../components/datePicker.vue'
	
	export default {
		components: {
			chunLeiPopups,DatePicker
		},
		computed: {
			...mapState(['currentRole','config','memberInfo'])
		},
		filters:{
			dateFormat(val,type){
				return utils.unixToDatetime(val,type) 
			}
		},
		data() {
			return {
				tabs: [],
				index: 1,
				bool: false,
				data: ['按订单编号升序', '按订单编号降序', '按取件码升序', '按取件码降序'],
				orderList: [],
				allSel: false,
				modalName: null,
				loaded:false,
				tagsList: ['科大宿舍楼10栋', '科大宿舍楼9栋', '科大宿舍楼8栋', '科大宿舍楼7栋'],
				tagIndex: 0,
				addressList:{},
				selectAddr:[0,0],
				addressTxt:'请选择收货地址',
				searchData:{},
				receivingTxt:'请选择收货时间',
				ordersBeginTimeTxt:'下单开始时间',
				ordersEndTimeTxt:'下单结束时间',
				dateType:''
			};
		},
		async onLoad() {
	        await this.$onLaunched;
			
			this.initData()
			
			
		},
		watch: {
			index(i) {
				
				this.getOrderList()
			},
			modalName(val){
				if(val==null){
					uni.showTabBar()
				}
			},
			currentRole(newVal,old){
				this.tabs=newVal ==1  ? ['分拣接单', '待分拣', '已分拣', '待配送', '已退单'] : ['配送接单', '待配送', '已完成', '已确认'],
				this.getOrderList()
				this.index=1
			}
		},
		methods: {
			async initData(){
				uni.showLoading({
					title: '加载中'
				})
				
				await this.$config()
				await this.getRole()
				await this.getOrderList()
				await this.getAreaList()
				
				// await this.getOrderList()
				
				uni.hideLoading()
			},
			getRole(){
				this.$http({
					apiName:'getRole',
					method:'POST',
					data:{
						tid:this.memberInfo.user_info.tid,
						
					}
				}).then(res=>{
					 this.$store.commit('setRoles',res.data) 
					 this.$store.commit('setRole',res.data[0].roleType) 
					 this.tabs = res.data[0].roleType ==1  ? ['分拣接单', '待分拣', '已分拣', '待配送', '已退单'] : ['配送接单', '待配送', '已完成', '已确认']
				}).catch(err=>{})
			},
			addressConfirm(){
				this.addressTxt=this.addressList[this.selectAddr[0]].building_name+(this.selectAddr[1]+1)+'层'
				// this.searchData.block=this.addressList[this.selectAddr[0]].building_name
				this.hideModal('search')
				
			},
			getAreaList(){
				this.$http({
					apiName:'getAreaList',
					data:{
						school_id :1
					}
				}).then(res=>{
					this.addressList=res.buildings
				})
			},
			hideModal(name='null'){
				
				this.modalName = name
			},
			selTime(val){
				console.log(val)
				var date=val.year+'/'+val.month+'/'+parseInt(val.date)
				if(this.dateType=='receivingTime'){
				    var txt1=date+' '+val.time.split('-')[0]
					var txt2=date+' '+val.time.split('-')[1]
					this.receivingTxt=txt1+'-'+val.time.split('-')[1]
					this.searchData.receivingBeginTime=new Date(txt1).getTime()
					this.searchData.receivingEndTime=new Date(txt2).getTime()
				}else if(this.dateType=='ordersBeginTime'){
					let text=date+' '+val.time
					let timeStamp=new Date(text).getTime()
					
					if(this.searchData.ordersEndTime&&timeStamp>=this.searchData.ordersEndTime){
						uni.showToast({
							icon:'none',
							title:'开始时间必须小于结束时间'
						})
					}else{
						this.ordersBeginTimeTxt=text
						this.searchData.ordersBeginTime=timeStamp
					}
				}else if(this.dateType=='ordersEndTime'){
					let text=date+' '+val.time
					let timeStamp=new Date(text).getTime()
					if(this.searchData.ordersBeginTime&&timeStamp<=this.searchData.ordersBeginTime){
						uni.showToast({
							icon:'none',
							title:'结束时间必须大于开始时间'
						})
					}else{
							this.ordersEndTimeTxt=text
						this.searchData.ordersEndTime=timeStamp
					}
					
				}
				
				
				
				
				
				this.modalName = 'search'
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
				let apiName=this.currentRole==1?'getSorterList':'getDeliveryList'
				let data={
						...this.searchData,
		               
						status:this.index,
						
					} 
					console.log(1,JSON.stringify(data))
				this.$http({
					// apiName:apiName,
					url:'/legwork/team/member/sorter/list/'+this.memberInfo.user_info.tid,
					method:'POST',
					// params:this.memberInfo.user_info.tid,
					contentType:'application/json',
					data:data
				}).then(res=>{
					// this.loaded=true
					this.orderList = res.data.records
				})
				
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
					text-align: center;
				}
				.mdCol1{
					overflow-y: scroll;
					height: 500rpx;
					.mdItem{
						line-height: 60rpx;
						color: #909399;
						font-size: 36rpx;
						text-align: center;
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
