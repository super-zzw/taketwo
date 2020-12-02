<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			if(!uni.getStorageSync('sessionId')){
				uni.reLaunch({
					url:'/pages/author/index'
				})
			}
		},
		onShow: function() {
			
		},
		
	
		onHide: function() {
			
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	page{
		background: #F5F6F8;
		height: 100%;
	}
</style>
