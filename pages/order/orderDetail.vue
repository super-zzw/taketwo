<template>
	<view class="container">
		<view class="contentBox">
			<view class="status">
				订单状态：
			<text class="txt">{{status}}</text>
			<!-- <text class="txt" v-if="status=='待配送'">待配送</text> -->
			</view>
			<view class="sec sec1">
				<view class="head">
					<text class="left">物流公司：菜鸟裹裹</text>
					<text class="right" v-if="status=='待配送'||status=='已完成'||status=='已确认'||status=='已分拣'||status=='待接单'">标签：科大宿舍楼10栋</text>
				</view>
				<view class="conts">
					<view class="code" v-if="status!='待接单'">
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
				<view class="txt" v-if="status!='待接单'">订单流水号：2020847383482 <image src="/static/image/copy.png" mode="" @click="copy"></image>
				</view>
				<text class="txt" >订单类型：加急</text>
				<text class="txt">包裹类型：大包裹</text>
				<text class="txt">收货时间：2020/11/24 中午</text>
				<text class="txt" v-if="status!='待接单'">下单时间：2020/11/24 9:28</text>
				<text class="txt">订单备注：易碎物品请轻拿轻放</text>
				<view class="txt">总价：<text class="price">¥20</text></view>
			</view>
			<view class="sec sec3" v-if="status!='待接单'">
				<text class="txt">接单时间：2020/10/24 10:30</text>
				<block v-if="status!='待分拣'">
					<text class="txt">分拣时间：2020/11/24 13:30</text>
					<block v-if="status!='已分拣'&&status!='待接单'">
						<text class="txt" >配送接单时间：2020/11/24 16:30</text>
						<text class="txt" v-if="status!='待配送'">完成配送时间：2020/11/24 16:30</text>
					</block >
					
					<block v-if="status=='已退单'">
						<text class="txt txt1">退单原因：包裹超重，需要增加费用</text>
						<view class="txt">修改后总价：<text style="color:#FF0000">¥30</text></view>
					</block>
				</block>
				
				
			</view>
		</view>
		
        <view class="bottom1" v-if="status=='待接单'">
			<view class="jiedanBtn">接单</view>
		</view>
		<view class="bottom" v-if="status!='已退单'&&status!='待接单'">
			<view class="box">
				<view class="contact">
					<image src="/static/image/contact.png" mode=""></image>
					<text>联系下单人</text>
				</view>
				<block v-if="status=='待分拣'">
					<view class="btn btn1" data-target="tuidan" @tap="showModal">退单</view>
					<view class="btn btn2" data-target="fenjian" @tap="showModal">分拣</view>
					
				</block>
				<block v-if="status=='待配送'">
					<view class="btn btn1" data-target="yanchi" @tap="showModal">延迟配送</view>
					<view class="btn btn2" data-target="fenjian" @tap="showModal">配送完成</view>
				</block>
			</view>
		</view>
		<!-- 退单 -->
		<view class="cu-modal bottom-modal" :class="modalName=='tuidan'?'show':''">
			<view class="cu-dialog dialog dialog1">
				<text class="title">退单</text>
				<view class="content">
					<view class="t1">
						<text class="label">订单原总价：</text>
						<text class="label price">¥20</text>
					</view>
					<view class="t2">
						<text class="label">修改后总价：</text>
						<input type="text" v-model="inputValue" class="input"/>
					</view>
					<view class="t3">
					<text class="label">退单原因：</text>
					<view class="selList">
						
						<view class="tt" v-for="(item,i) in reasons" :key="i" @click="reasonIndex=i">
							
							<image src="/static/image/select.png" mode="" class="sel" v-if="reasonIndex==i"></image>
							<text class="noSel" v-else></text>
							<text class="con">{{item}}</text>
						</view>
						
					</view>
					<view class="btns">
						<view class="btn btn1" @tap="hideModal">确定退单</view>
						<view class="btn btn2" @tap="hideModal">取消</view>
					</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 分拣 -->
		<view class="cu-modal bottom-modal" :class="modalName=='fenjian'?'show':''">
			<view class="cu-dialog dialog dialog2">
				<block v-if="fenjianFlag==1">
					<text class="title">分拣</text>
					<view class="content">
						<text class="label">订单标签：</text>
						<view class="tagBox" @click="fenjianFlag=2">
							<text class="name">{{tagsList[tagIndex]}}</text>
							<image src="/static/image/you1.png" mode=""></image>
						</view>
					</view>
					<view class="btns">
						<view class="btn btn2" @tap="hideModal">取消</view>
						<view class="btn btn1" @tap="hideModal">分拣完成</view>
					</view>
				</block>
				<block v-else>
					<text class="title">选择订单标签</text>
					<view class="tagsList">
						<view v-for="(item,i) in tagsList" :key="i" :class="tagIndex==i?'tag active':'tag'" @click="tagIndex=i">
						{{item}}	
						</view>
					</view>
					<view class="btns btns1">
						<view class="btn btn2" @tap="hideModal">重置</view>
						<view class="btn btn1" @click="fenjianFlag=1">确定</view>
					</view>
				</block>
			
			</view>
		</view>
		<!-- 延迟配送 -->
		<view class="cu-modal bottom-modal" :class="modalName=='yanchi'?'show':''">
			<view class="cu-dialog dialog dialog3">
				<text class="title">延迟配送</text>
				<view class="content">
					<view class="tt">
						<text class="label">延迟配送时间</text>
						<view class="timeBox" @click="modalName='date'">
							<text>2020/10/24 早上</text>
							<image src="/static/image/down.png" mode=""></image>
						</view>
					</view>
					<view class="tt">
						<text class="label">延迟配送原因：</text>
						<view class="selList">
							
							<view class="tt" v-for="(item,i) in delayReasons" :key="i" @click="delayReasonsIndex=i">
								
								<image src="/static/image/select.png" mode="" class="sel" v-if="delayReasonsIndex==i"></image>
								<text class="noSel" v-else></text>
								<text class="con">{{item}}</text>
							</view>
							
						</view>
						
					</view>
					
					
					
					
					</view>
					<view class="btns">
						<view class="btn btn2" @tap="hideModal">取消</view>
						<view class="btn btn1" @tap="hideModal">确定</view>
					</view>
				</view>
			</view>
			<DatePicker :modalName="modalName" @hideModal="hideModal('yanchi')"/>
		<!-- </view> -->
		
	</view>
</template>

<script>
	import DatePicker from '../../components/datePicker.vue'
	export default {
		components:{DatePicker},
		data() {
			return {
             status:'待分拣',
			   modalName:null,
			   reasons:['包裹大小选择错误','有违禁品','送货地址超出送达范围','其他原因'],
			   tagsList:['科大宿舍楼10栋','科大宿舍楼9栋','科大宿舍楼8栋','科大宿舍楼7栋'],
			   reasonIndex:0,
			   inputValue:'',
			   fenjianFlag:1,
			   tagIndex:0,
			   delayReasons:['原配送时间不方便收货','客户要求的延迟时间'],
			   delayReasonsIndex:0
			};
		},
		methods: {
			showModal(e){
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(name='null') {
				this.modalName = name
			},
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
		
	}
	.contentBox{
		padding: 0 32rpx;
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
			margin-bottom: 24rpx;
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid #EAECF1;
			box-sizing: border-box;

			
			.left{
				font-size: 28rpx;
				
				font-weight: 400;
				color: #606266;
			}
			.right{
				
				font-size: 28rpx;
				
				font-weight: 400;
				color: #181819;
			}

		}

		.conts {
			.code {

				margin-bottom: 24rpx;
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
         .txt{
			 display: block;
			 margin-bottom: 20rpx;
			 font-size: 32rpx;
			 
			 font-weight: 400;
			 color: #606266;
			 line-height: 44rpx;
		 }
		 .txt:last-child{
			 margin-bottom: 0
		 }
		 .txt1{
			 
color: #181819;
		 }
		 
		
	}
     .bottom1{
		 padding: 24rpx 32rpx;
		 width: 100%;
		 background: #fff;
		 .jiedanBtn{
			 display: flex;
			 justify-content: center;
			 align-items: center;
			 width: 100%;
			 
height: 80rpx;
			 background: #FFAE18;
			 box-shadow: 0px 4rpx 20rpx 0rpx rgba(255,174,24,0.3);
			 border-radius: 40rpx;
			 
			 font-size: 32rpx;
			 
			 font-weight: 500;
			 color: #181819;
		 }
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
			padding:0 34rpx;
			display: flex;
			align-items: center;
          justify-content: center;
		  width: 100%;
			.contact {
				

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
margin-left: 62rpx;
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
	// 退单模态框
	.dialog{
		padding: 56rpx 64rpx 40rpx;
		border-radius: 40rpx 40rpx 0rpx 0rpx !important;
		
		.title{
			font-size: 40rpx;
			
			font-weight: 500;
			color: #181819;
			line-height: 56rpx;
		}
		.btns{
						
						margin-top: 58rpx;
						display: flex;
						justify-content: space-between;
						.btn{
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
							&.btn1{
								background: #FFAE18;
							}
							&.btn2{
								
		border: 2rpx solid #909399;
							}
						}
					}
				
	}
	.dialog1{
		.content{
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-top: 60rpx;
			.label{
				font-size: 32rpx;
			
				font-weight: 500;
				color: #181819;
				line-height: 44rpx;
				&.price{
					color: #FF0000;
				}
			}
			.t2{
				display: flex;
				align-items: center;
				margin-top: 24rpx;
				.input{
					width: 250rpx;
					padding-left: 50rpx;
border: 2rpx solid #C0C4CC;
height: 64rpx;
font-size: 32rpx;
text-align: left;
position: relative;
				}
				.input:after{
					content: '¥';
					display: block;
					font-size: 32rpx;
					font-weight: 400;
					color: #606266;
					line-height: 44px;
					position: absolute;
					left: 24rpx;
					top: -15rpx;
				
			}
			
			}
			.t3{
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: 34rpx;
				.label{
					text-align: left;
				}
				
			}
		
		}
	}
	.selList{
		margin-top: 20rpx;
		.tt{
			display: flex;
			margin-bottom: 24rpx;
			.noSel{
				width: 32rpx;
				height: 32rpx;
				border: 2rpx solid #909399;
				border-radius: 50%;
				
			}
			.sel{
				width: 36rpx;
				height: 36rpx;
			}
			.con{
				
				font-size: 28rpx;
				
				font-weight: 400;
				color: #909399;
				line-height: 40rpx;
				margin-left: 16rpx;
			}
		}
	}
	// 分拣模态框
	.dialog2{
		.content{
			margin-top: 64rpx;
			display: flex;
			align-items: center;
			.label{
				
				font-size: 32rpx;
			
				font-weight: 500;
				color: #181819;
				line-height: 44rpx;
			}
			.tagBox{
				display: flex;
				align-items: center;
				padding: 10rpx 24rpx;
				background: #F1F2F4;
				.name{
					
					font-size: 32rpx;
					
					font-weight: 400;
					color: #181819;
					line-height: 44rpx;
				}
				image{
					width: 30rpx;
					height: 28rpx;
					margin-left: 10rpx;
				}
			}
		}
		.btns{
			margin-top: 170rpx;
		}
		.tagsList{
			padding: 0 18rpx;
			margin-top: 88rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.tag{
				
border-radius: 10rpx;
background: #F1F2F4;
border-radius: 10rpx;
width: 274rpx;
height: 64rpx;
display: flex;
justify-content: center;
align-items: center;
font-size: 32rpx;

font-weight: 400;
color: #909399;
line-height: 44rpx;
margin-right: 32rpx;
margin-bottom: 24rpx;
&.active{
	
background: #FFAE18;
color: #181819;
}
			}
			.tag:nth-child(even){
				margin-right: 0;
			}
		}
		.btns1{
			margin-top: 50rpx;
		}
	}
	 // 延迟配送
	 .dialog3{
		 .content{
			 margin-top: 88rpx;
			 .label{
			 	font-size: 32rpx;		
			 	font-weight: 500;
			 	color: #181819;
			 	line-height: 44rpx; 
				display: block;
				margin-bottom: 20rpx;
			 }
			 .tt{
				text-align: left;
				margin-bottom: 40rpx;
			 }
			 .timeBox{
				 padding: 10rpx 24rpx;
				   display:inline-block;
				 background: #F1F2F4;
				 border-radius: 10rpx;
				 font-size: 32rpx;
				
				 font-weight: 400;
				 color: #181819;
				 line-height: 44rpx;
				 image{
					 width: 32rpx;
					 height: 32rpx;
					 margin-left: 14rpx;
				 }
			 }
		 }
	 }
</style>
