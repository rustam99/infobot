import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/db';

const dbList = db.collection('list');

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		list: [],
	},
	getters: {
		getItemById: (state) => (id) => state.list.filter((item) => item.id === id)[0],
	},
	mutations: {
		setList(state, list) {
			state.list = list;
		},
		addItem(state, item) {
			state.list.push(item);
		},
		changeItem(state, data) {
			for (let i = 0; i < state.list.length; i++) {
				const item = state.list[i];

				if (item.id === data.id) {
					item.number = data.number;
				}
			}
		},
		removeItem(state, id) {
			let index;

			for (let i = 0; i < state.list.length; i++) {
				if (state.list[i].id === id) {
					index = i;
				}
			}

			state.list.splice(index, 1);
		},
	},
	actions: {
		getList({ commit }) {
			return dbList.get()
				.then((numbers) => {
					const list = numbers.docs.map((item) => item.data());

					for (let i = 0; i < numbers.docs.length; i++) {
						list[i].id = numbers.docs[i].id;
					}

					commit('setList', list);
				});
		},
		addItem({ commit }, number) {
			return dbList.add({ number }).then((item) => {
				commit('addItem', {
					id: item.id,
					number,
				});
			});
		},
		changeItem({ commit }, item) {
			return dbList.doc(item.id).update({
				number: item.number,
			}).then(() => {
				commit('changeItem', item);
			});
		},
		removeItem({ commit }, id) {
			return dbList.doc(id).delete().then(() => {
				commit('removeItem', id);
			});
		},
	},
});
