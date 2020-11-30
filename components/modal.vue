<template>
	<view class="container" v-if="showModal">
		<view class="box" :class="showModal?'active':''">
			155
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showModal:{
				default:false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
   .container{
	   position: fixed;
	   left: 0;
	   top: 0;
	   width: 100vw;
	   height: 100vh;
       background: rgba(0, 0, 0, 0.7);
	         .box{
				 overflow: hidden;
				 width: 100%;
				 position: fixed;
				 bottom: 0;
				 left: 0;
				 height: 0;
				 padding-top: 56rpx;
				 background: #FFFFFF;
				 border-radius: 40rpx 40rpx 0px 0px;
				
				 transition:height 1s;
	   }
	   .box.active{
		   height: 500rpx;
		   transition:height 1s;
	   }
   }
</style>
