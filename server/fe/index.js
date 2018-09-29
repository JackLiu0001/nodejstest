
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './src/router';
import App from './src/components/App';
import './src/css/common/base.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import { getCookie } from 'jspath/common/utils';
import store from 'root/store/'
// import ajax from './config/ajax'
// import './style/common'
// import './config/rem'

Vue.use(VueRouter);
Vue.use(iView);
const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	// console.log('state', store);
	// const isLogin = store.state.isLogin;
	// console.log('to', to);
	// console.log('from', from);
	// console.log('isLogin', isLogin);
	// if (!isLogin && to.path != '/login') {
	// 	router.push({
	// 		path: '/login'
	// 	});
	// }
	next();
});

new Vue({
	render(h) { 
		return h(App)
	},
	router,
    store,
}).$mount('#app')