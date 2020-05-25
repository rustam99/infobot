<template>
	<div class="pagination">
		<span @click="beforePage" class="pagination__arrow icon icon_arrow_left"></span>
		<span @click="nextPage" class="pagination__arrow icon icon_arrow_right"></span>
	</div>
</template>

<script>
export default {
	name: 'pagination',
	props: {
		page: Number,
		perPage: Number,
		limit: Number,
	},
	data() {
		return {
			currentPage: this.page,
		};
	},
	methods: {
		beforePage() {
			if (this.currentPage > 1) {
				this.currentPage -= 1;

				this.$emit('change', this.currentPage);
			}
		},
		nextPage() {
			if (this.currentPage !== this.pages) {
				this.currentPage += 1;

				this.$emit('change', this.currentPage);
			}
		},
	},
	computed: {
		pages() {
			return Math.ceil(this.limit / this.perPage);
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/css/modules/var';
@import '@/assets/css/modules/mixin';

.pagination {
	display: flex;
	align-items: center;

	&__arrow {
		cursor: pointer;

		& + & {
			margin-left: 40px;
		}
	}
}

</style>
