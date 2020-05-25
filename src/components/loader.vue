<template>
	<div
		v-if="isRunning"
		class="loader" :style="position">
		<span
			v-for="(el, index) in 3"
			:key="index"
			:class="['loader__item', running]">
		</span>
	</div>
</template>

<script>
export default {
	name: 'loader',
	props: {
		isRunning: Boolean,
	},
	created() {
		window.addEventListener('resize', () => {
			this.left = document.body.clientWidth / 2;
			this.top = document.body.clientHeight / 2;
		});
	},
	data() {
		return {
			left: document.body.clientWidth / 2,
			top: document.body.clientHeight / 2,
		};
	},
	computed: {
		position() {
			return {
				left: `${this.left}px`,
				top: `${this.top}px`,
				transform: 'translateX(-50%)',
			};
		},
		running() {
			return this.isRunning ? 'loader__item_run' : '';
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/css/modules/var';

.loader {
	position: absolute;
	display: flex;

	&__item {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: $deep-purpule;

		&:nth-child(2) {
			animation-delay: .2s;
		}

		&:nth-child(3) {
			animation-delay: .3s;
		}

		&_run {
			animation: loader 0.5s linear alternate infinite;
		}
	}
}

@keyframes loader {
	0% {
		transform: scaleX(1) scaleY(1)
	}

	100% {
		transform: scaleX(0) scaleY(0)
	}
}
</style>
