import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Mock from '../mock'
Mock.start();

Vue.use(ElementUI);

new Vue({
	el:'#app',
    router,
	store,
	template:'<App/>',
	components:{App}
});
