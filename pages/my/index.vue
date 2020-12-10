<template>
	<view class="wrap">
		<view class="mItem">
			<!-- <view class="mTitle"></view> -->
			<view class="mBox mBox1">
				<image :src="memberInfo.user_info.avatar" class="mPic" mode=""></image>
				<view class="name">
					{{memberInfo.user_info.name}}
					<text class="name2">{{currentRole==1?'分拣员':'配送员'}}</text>
				</view>
				<view class="phone">
					{{memberInfo.user_info.mobile}}
				</view>
				<picker  :range="roleArr"  @change="bindDateChange" class="picker" v-if="roles.length>1">
				       <view class="uni-input">切换身份</view>
					   <image class="team12" src="../../static/image/you1.png" mode="widthFix"></image>
				 </picker>
				<view class="team" data-target="bottomModal" @tap="showModal">
					{{memberInfo.user_info.team_name}}-{{memberInfo.school_name}}
					<image class="team12" src="../../static/image/you1.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="mItem" v-if="currentRole==1">
			<view class="mTitle">接单数据(分拣)</view>
			<view class="mBox mBox2">
				<view class="box1">
					<image src="../../static/image/bin.png" class="boxIcon" mode="widthFix"></image>
					<view class="mTabs">
						<view class="mTab" v-for="(item,index) in tabs" :key="index" :class="activeTab0 == index ? 'active' : ''" @tap="activeTab0=index">{{item}}</view>
					</view>
				</view>
				<view class="box2">
					<view class="box2Item">
						<view class="nms">{{sorterData.waitOrder}}</view>
						<view class="statu">待接单</view>
					</view>
					<view class="box2Item">
						<view class="nms">{{sorterData.endSorter}}</view>
						<view class="statu">已分拣</view>
					</view>
					<view class="box2Item">
						<view class="nms">{{sorterData.endChargeback}}</view>
						<view class="statu">已退单</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mItem" v-if="currentRole==2">
			<view class="mTitle">接单数据(配送)</view>
			<view class="mBox mBox2">
				<view class="box1">
					<image src="../../static/image/bin.png" class="boxIcon" mode="widthFix"></image>
					<view class="mTabs">
						<view class="mTab" v-for="(item,index) in tabs" :key="index" :class="activeTab1 == index ? 'active' : ''" @tap="activeTab1=index">{{item}}</view>
					</view>
				</view>
				<view class="box2">
					<view class="box2Item">
						<view class="nms">{{deliveryData.waitOrder}}</view>
						<view class="statu">待接单</view>
					</view>
					<view class="box2Item">
						<view class="nms">{{deliveryData.waitDelivery}}</view>
						<view class="statu">待配送</view>
					</view>
					<view class="box2Item">
						<view class="nms">{{deliveryData.doneDelivery}}</view>
						<view class="statu">已完成</view>
					</view>
					<view class="box2Item">
						<view class="nms">{{deliveryData.confirmedDelivery}}</view>
						<view class="statu">已确认</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @tap="logout">
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
							<view :class="team_active==i?'mdItem active':'mdItem'" v-for="(item,i) in memberInfo.team_list" :key="i" @tap="changeTeam(i)">
								{{item.name}}
							</view>
						
						</view>
					</view>
					<view class="mdCol mdCol2">
						<view class="mdCol0">
							所在学校
						</view>
						<view class="mdCol1">
							<view class="mdItem" :class="active_school == index ? 'active' : ''" v-for="(item,index) in schoolList" @tap="changeSchool(index)" :key="index">
								{{item.school_name}}
							</view>
						</view>
					</view>
				</view>
				<view class="dBoo">
					<view class="dBtns">
						<view class="dBtn dBtn0" @tap="hideModal">
							取消
						</view>
						<view class="dBtn dBtn1" @tap="bindTeamSchool">
							确定
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				tabs:["全部","今日","近7天","近30日"],
				roleArr:['分拣员','配送员'],
				team_active:-1,  //选中的team
				activeTab0:1,
				activeTab1:1,
				modalName:null,
				sorterData:null,
				deliveryData:null,
				schoolList:[],  //学校列表
				active_school:-1,  //选中的学校
			};
		},
		// onLoad() {
		// 	this.initData();
			
		// },
		onShow() {
			this.initData();
		},
		computed:{
			...mapState(['roles','currentRole','memberInfo','reload'])
		},
		watch:{
			activeTab0(){
				uni.showLoading({
					title:"加载中..."
				})
				this.getSorterData()
				uni.hideLoading()
			},
			activeTab1(){
				uni.showLoading({
					title:"加载中..."
				})
				this.getDeliveryData()
				uni.hideLoading()
			},
				reload(newVal){
					if(newVal){
						this.initData()
						this.$store.commit('setReload',false)
					}
				}
			
		},
		methods:{
			//切换团队
			changeTeam(i){
				if(this.team_active === i){
					return
				}else{
					this.team_active =i;
					this.getSchoolList();
					this.active_school = -1;
				}
			},
			//切换学校
			changeSchool(i){
				if(this.active_school === i){
					return
				}else{
					this.active_school = i;
					
				}
			},
			async bindTeamSchool(){
				uni.showLoading({mask:true})
				await this.bindTeam();
				await this.bindSchool();
				await this.updateInfo();
				await this.getRole();
				this.hideModal();
				uni.hideLoading()
			},
			//更新用户信息
			updateInfo(){
				this.$getMemberInfo().then(res => {
					this.$store.commit('setMemberInfo', res)
				})
			},
			//更新用户角色
			getRole(){
				this.$http({
					apiName:'getRole',
					method:'POST',
					data:{
						tid:this.memberInfo.team_list[this.team_active].tid,
						
					}
				}).then(res=>{
					 this.$store.commit('setRoles',res.data) 
					 this.$store.commit('setRole',res.data[0].roleType) 
				}).catch(err=>{})
			},
			//绑定团队
			bindTeam(){
				this.$http({
					apiName:"bindTeam",
					data:{tid:this.memberInfo.team_list[this.team_active].tid}
				}).then(res => {
					
				}).catch(err => {})
			},
			//绑定学校
			bindSchool(){
				this.$http({
					apiName:"bindSchool",
					data:{
						tid:this.memberInfo.team_list[this.team_active].tid,
						sc_id:this.schoolList[this.active_school].school_id
						}
				}).then(res => {
					
				}).catch(err => {})
			},
			//计算激活的团队
			getTeamIndex(){
				let _team_active_index = this.memberInfo.team_list.findIndex(item => {
					return item.tid == this.memberInfo.user_info.tid;
				})
				this.team_active = _team_active_index;
				this.getSchoolList();
			},
			async initData(){
				uni.showLoading({
					title:'加载中...'
				})
				await this.getTeamIndex()
				if(this.roles.length>1){
					await this.getSorterData()
					this.getDeliveryData()
				}else{
					this.currentRole==1?this.getSorterData():this.getDeliveryData()
				}
				uni.hideLoading()
			},
			//根据团队获取学校列表
			async getSchoolList(){
				uni.showLoading({mask:true})
				await this.$http({
					apiName:'getSchoolList',
					data:{
						tid:this.memberInfo.team_list[this.team_active].tid
					}
				}).then(res=>{
					// this.sorterData=res.data
					this.schoolList = res.list;
					
					let _active_school_index = this.schoolList.findIndex(item => {
						return item.school_id == this.memberInfo.school_id;
					})
					
					this.active_school = _active_school_index;
				}).catch(err=>{})
				uni.hideLoading()
			},
			// 退出登录
			logout(){
				uni.showModal({
					 title: '提示',
					 content: '确认退出登录？',
					   success: res=> {
					         if (res.confirm) {
					           this.$http({
					           	apiName:'deleteToken',
					           	method:'POST',
					           	data:{
					           		re_token:uni.getStorageSync('reToken'),
					           		token:uni.getStorageSync('token')
					           	}
					           	
					           }).then(res=>{
					           	   uni.clearStorage();
								   uni.reLaunch({
								   	url:'../author/index'
								   })
					           })
					         } else if (res.cancel) {
					             console.log('用户点击取消');
					         }
					     }
				})
				
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null
			},
			bindDateChange(e){
				console.log(e)
				let data=e.detail.value==0?1:2
				this.$store.commit('setRole',data) 
			},
			getSorterData(){
				let date=this.activeTab0==0?4:this.activeTab0
				this.$http({
					apiName:'getSorterData',
					method:'POST',
					data:{
						date,
						tid:this.memberInfo.user_info.tid
					}
				}).then(res=>{
					this.sorterData=res.data
				}).catch(err=>{})
			},
			getDeliveryData(){
				let date=this.activeTab1==0?4:this.activeTab1
				this.$http({
					apiName:'getDeliveryData',
					method:'POST',
					data:{
						date,
						tid:this.memberInfo.user_info.tid
					}
				}).then(res=>{
					this.deliveryData=res.data
				}).catch(err=>{})
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
				margin-bottom: 30rpx;
			}
			.picker{
				background-color: #F1F2F4;
				
				border-radius: 10rpx;
				padding: 8rpx 36rpx;
				width: fit-content;
				margin: 0 auto 15rpx;
				view{
					display: inline-block;
				}
				image{
					vertical-align: middle;
					nav-left: 12rpx;
					width: 28rpx;
					height: auto;
				}
			}
			.team{
				margin: auto;
				// margin-top: 36rpx;
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
					flex: 1;
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
		margin-top: 100rpx;
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
						font-size: 24rpx;
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
