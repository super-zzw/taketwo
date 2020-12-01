<template>
	<view class="cu-modal bottom-modal" :class="modalName=='date'?'show':''">
		<view class="cu-dialog dialog">
			<text class="title">选择时间</text>
			<view class="content">
				<view class="dayBox">
					<text :class="date==i?'dayItem active':'dayItem'" v-for="(item,i) in dayList" :key="i" @tap="date=i">{{item}}</text>
				</view>
				<view class="timeBox">
					<view :class="time==i?'timeItem active':'timeItem'" v-for="(item,i) in timeList" :key="i" @tap="time=i">
						{{item}}
					</view>
				</view>
				
				
				
			</view>
				<view class="btns">
					<view class="btn btn2" @tap="hideModal">取消</view>
					<view class="btn btn1" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		props:{
			modalName:{
				default:null,
				type:String,
				
			}
		},
		data() {
			return {
				dayList:[],
				timeList:['9:00','10:00','11:00','12:00','13:00','14:00','15:00'],
				date:0,
				time:0,
				
			};
		},
		created() {
			console.log(11111)
			this.getDayList()
			console.log(this.dayList)
		},
		methods:{
			hideModal(e) {
				this.$emit('hideModal')
				// this.modalName = null
			},
			getDayList(){
				var myDate = new Date()  //获取当前日期
				for(var i=0;i<5;i++){
					var milliseconds=myDate.getTime()+1000*60*60*24*i; 
					var newMyDate = new Date(milliseconds).getDate()+'日';
					if(newMyDate<10){
						newMyDate='0'+newMyDate
					}
					this.dayList.push(newMyDate)
				}
				this.dayList[0]=this.dayList[0]+'(今天)'
				
				  
			}
		}
	}
</script>

<style lang="scss" scoped>
   .dialog{
	   padding-top: 56rpx;
	   border-radius: 40rpx 40rpx 0rpx 0rpx !important;
	   .title{
		   font-size: 40rpx;
		   
		   font-weight: 500;
		   color: #181819;
		   line-height: 56rpx;
	   }
	  .content{
		  margin-top: 40rpx;
		  display: flex;
		  // height: 440rpx;
		  .dayBox{
			  width:296rpx;
			 
			  .dayItem{
				   background:#D8D8D8;
				  height: 88rpx;
				  display: flex;
				  align-items: center;
				  justify-content: center;
			  
			  font-size: 32rpx;
			  
			  font-weight: 400;
			  color: #606266;
			
			  }
			  .dayItem.active{

background: #FFFFFF;
				  color: #FFAE18;
			  }
		  }
		  .timeBox{
			  height: 440rpx;
			  overflow: scroll;
			  flex: 1;
			   background: #fff;
			   // display: flex;
			   // flex-direction: column;
			   // justify-content: center;
			  .timeItem{
				 justify-content: center;
				 height: 88rpx;
				 font-size: 32rpx;
				 display: flex;
				 align-items: center;
				 font-weight: 400;
				 color: #606266;
				 // line-height: 88rpx;
			  }
			  .timeItem.active{
				  color: #FFAE18;
			  }
		  }
		  
	  }
	  .btns{
	  				padding: 0 66rpx;
	  				margin-top: 84rpx;
					margin-bottom: 34rpx;
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
</style>
