import Vue from 'vue';
import VueRouter from 'vue-router';
import stopSheet from '../views/stop_sheet';
import home from '../views/home';
import addStopItem from '../views/add_stop_item';
import changeStopItem from '../views/change_stop_item';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: home,
	},
	{
		path: '/stopSheet/page/:page',
		name: 'stopSheet',
		component: stopSheet,
	},
	{
		path: '/addStopItem',
		name: 'addStopItem',
		component: addStopItem,
	},
	{
		path: '/changeStopItem/id/:id',
		name: 'changeStopItem',
		component: changeStopItem,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
