<template>
	<div id="app" class="app">
		<div class="container">
			<h1 class="app__title">Стоп лист</h1>
			<breadcrumbs :links="breadcrumbsLinks"/>
		</div>
		<router-view/>
	</div>
</template>

<script>
import breadcrumbs from '@/components/breadcrumbs';

export default {
	name: 'app',
	data() {
		return {
			links: {
				stopSheet: [{
					name: 'home',
					label: 'Главная',
				}, {
					name: 'stopSheet',
					label: 'стоп-лист',
				}],
				home: [{
					name: 'home',
					label: 'Главная',
				}],
				addStopItem: [{
					name: 'home',
					label: 'Главная',
				}, {
					name: 'stopSheet',
					label: 'стоп-лист',
				}],
				changeStopItem: [{
					name: 'home',
					label: 'Главная',
				}, {
					name: 'stopSheet',
					label: 'стоп-лист',
				}],
			},
		};
	},
	computed: {
		breadcrumbsLinks() {
			return this.links[this.$route.name];
		},
	},
	components: {
		breadcrumbs,
	},
};
</script>

<style lang="scss">
.app {
	padding: 20px 0;

	&__title {
		margin-top: 0;
	}
}
</style>
