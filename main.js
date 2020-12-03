import Vue from 'vue'
import App from './App'
import store from "./store"
import {http,httpAll} from './utils/request.js'
import utils from './utils/method.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$http = http;
Vue.prototype.$httpAll = httpAll;
Vue.prototype.$config = utils.getConfig;
const app = new Vue({
	store,
    ...App
})
app.$mount()

 



