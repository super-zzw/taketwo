<template>
	<view class="cu-modal bottom-modal" :class="modalName=='date'?'show':''">
		<view class="cu-dialog dialog">
			<text class="title">选择时间</text>
			<view class="content">
				<view class="dayBox">
					<text :class="dateI==i?'dayItem active':'dayItem'" v-for="(item,i) in dayList" :key="i" @tap="change1(i)">{{item.date}}</text>
				</view>
				<view class="timeBox">
					<view :class="timeI==i?'timeItem active':'timeItem'" v-for="(item,i) in timeList" :key="i" @tap="change2(i)">
						{{item}}
					</view>
				</view>
				
				
				
			</view>
				<view class="btns">
					<view class="btn btn2" @tap="hideModal">取消</view>
					<view class="btn btn1" @tap="confirm">确定</view>
				</view>
			</view>
		</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		props:{
			modalName:{
				default:null,
				type:String,
				
			},
			type:{
				
			}
		},
		computed:{
			...mapState(['config'])
		},
		data() {
			return {
				dayList:[],
				timeList:['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00'],
				dateI:0,
				timeI:0,
				text:''
			};
		},
		created() {
			this.getDayList()
		},
		watch:{
			type(val){
				this.dateI=0
				this.timeI=0
				if(this.type=='receivingTime'){
					
					this.timeList=this.config.receivingTime.map(item=>{
						return item.startTime+'-'+item.endTime
					})
				}else if(this.type=="ordersBeginTime"||this.type=="ordersEndTime"){
					this.timeList=['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00']
				}
				else{
					this.timeList=['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00']
				}
				
			}
		},
		methods:{
			hideModal(e) {
				this.$emit('hideModal')
			},
			confirm(){
			  
				this.$emit('confirm',{...this.dayList[this.dateI],time:this.timeList[this.timeI]})
			},
			getDayList(){
				var myDate = new Date()  //获取当前日期
				for(var i=0;i<5;i++){
					var milliseconds=myDate.getTime()+1000*60*60*24*i; 
					
					var date = new Date(milliseconds).getDate()+'日';
					if(i==0){
						date=date+'(今天)'
					}
					var year=new Date(milliseconds).getFullYear()
					var month=new Date(milliseconds).getMonth()+1
					var result={year,month,date}
					this.dayList.push(result)
				}
				
				  
			},
			change1(i){
				this.dateI=i
			},
			change2(i){
				this.timeI=i
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
