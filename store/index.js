import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
	   currentRole:1,
	   roles:{},
	   isLogin:false,  //是否登录
	   // userInfo:{}    ,//用户信息
	   config:null,
	   memberInfo:{}   //用户信息
	},
	mutations:{
		setConfig(state,val){
			state.config=val
			// console.log(state)
		},
		setRole(state,val){
			state.currentRole=val
		},
		setRoles(state,val){
			state.roles=val
		},
		setMemberInfo(state,val){
			state.memberInfo=val
			// console.log(state)
		}
	},
})
export default store