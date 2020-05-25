<template>
	<ul class="stop-list">
		<li
			v-for="(el, index) in list"
			:key="index"
			class="stop-list__item">
			<stop-item :id="el.id" :phone="el.number"/>
		</li>
	</ul>
</template>

<script>
import stopItem from './stop_item';

export default {
	name: 'stopList',
	props: {
		list: Array,
	},
	components: {
		stopItem,
	},
};
</script>

<style lang="scss">
.stop-list {
	width: 100%;
	margin: 0;
}
</style>
