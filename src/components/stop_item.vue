<template>
	<div class="stop-item">
		<div class="stop-item__phone">{{phone}}</div>
		<div class="stop-item__actions">
			<router-link
				:to="{ name: 'changeStopItem', params: { id, } }"
				class="stop-item__icon icon icon_create"/>
			<span
				@click="removeItem"
				class="stop-item__icon icon icon_delete"></span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'stopItem',
	props: {
		id: String,
		phone: String,
	},
	methods: {
		removeItem() {
			this.$store.dispatch('removeItem', this.id);
		},
	},
};
</script>

<style lang="scss">
.stop-item {
	@import '@/assets/css/modules/var';
	@import '@/assets/css/modules/mixin';

	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	border-bottom: 1px solid $gray;

	&__text {
		font-size: rem(12px);
		color: $gray;

		&_bold {
			font-weight: bold;
		}
	}

	&__phone {
		font-size: rem(14px);
		color: $gray;
	}

	&__actions {
		display: flex;
	}

	&__icon {
		cursor: pointer;

		& + & {
			margin-left: 20px;
		}
	}
}
</style>
