import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
	   role:0,
	   isLogin:false,  //是否登录
	   userInfo:{}    ,//用户信息
	   config:null
	},
	mutations:{
		setConfig(state,val){
			state.config=val
			// console.log(state)
		}
	},
})
export default store