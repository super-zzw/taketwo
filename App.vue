<script>
	import Vue from 'vue'
	export default {
		async onLaunch() {

			if (uni.getStorageSync('token')) {

				this.$getMemberInfo().then(res => {
					this.$store.commit('setMemberInfo', res)
					if (!res.user_info.tid) {
						
						uni.reLaunch({
							url: '/pages/select/team'
						})
					} 
					else {
						// uni.reLaunch({
						// 	url: '/pages/order/index'
						// })
						this.$isResolve()
					}
					// this.$isResolve()
				})

			} else {
				uni.reLaunch({
					url: '/pages/author/index'
				})
				// this.$isResolve();
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

	page {
		background: #F5F6F8;
		height: 100%;
	}
</style>
