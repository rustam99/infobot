<template>
	<ul class="breadcrumbs__list">
		<li
			v-for="(el, index) in links"
			:key="index"
			class="breadcrumbs__item">
				<router-link
					v-if="index !== links.length - 1"
					:to="{name: el.name}"
					:class="[
						index === links.length - 1 ?
						'active' : 'link',
						'breadcrumbs__link'
					]">
					{{el.label}}
			</router-link>
			<span v-else class="breadcrumbs__active">
				{{el.label}}
			</span>
			<span v-if="index !== links.length - 1" class="separator">/</span>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'breadcrumbs',
	props: {
		links: Array,
	},
};
</script>

<style lang="scss">
	@import '@/assets/css/modules/var';

	.breadcrumbs {
		&__list {
			display: flex;
		}
	}

	.separator {
		display: inline-block;
		margin: 0 10px;
	}

	.active {
		color: $black;
		text-decoration: none;
	}
</style>
