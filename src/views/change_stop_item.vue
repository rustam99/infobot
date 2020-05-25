<template>
	<div class="change-item">
		<loader :isRunning="loader"/>
		<div class="container">
			<div class="change-item__body">
				<div class="change-item__input">
					<input
						v-model="number"
						class="input input_bordered_bottom"
						type="text"
						placeholder="Телеофн">
				</div>
				<button
					@click="changeItem"
					class="change-item__button change-item__button_circle button button_circle"/>
			</div>
			<button
				@click="goBack"
				class="change-item__button change-item__button_indent button button_default">
				Назад
			</button>
		</div>
	</div>
</template>

<script>
import loader from '@/components/loader';

export default {
	name: 'changeStopItem',
	data() {
		return {
			number: '',
			id: '',
			loader: false,
		};
	},
	created() {
		this.id = this.$route.params.id;
		let item;

		if (!this.$store.state.list.length) {
			this.loader = true;

			this.$store.dispatch('getList')
				.then(() => {
					item = this.$store.getters.getItemById(this.id);
					this.number = item.number;
				});
		} else {
			item = this.$store.getters.getItemById(this.id);
			this.number = item.number;
		}
	},
	updated() {
		this.loader = false;
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		changeItem() {
			this.$store.dispatch('changeItem', {
				id: this.id,
				number: this.number,
			}).then(() => {
				this.$router.replace({
					name: 'stopSheet',
					params: { page: 1 },
				});
			});
		},
	},
	components: {
		loader,
	},
};
</script>

<style lang="scss">
@import '@/assets/css/modules/var';
@import '@/assets/css/modules/mixin';

.change-item {
	background-color: whitesmoke;
	padding: 20px 0;

	&__body {
		width: 60%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__input {
		width: 90%;
	}

	&__button {
		height: 35px;

		&_circle {
			background-color: $blue;
			width: 35px;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -75%) rotate(-45deg);
				width: 25%;
				height: 12.5%;
				border: 2px solid transparent;
				border-bottom-color: $white;
				border-left-color: $white;
			}
		}

		&_indent {
			margin-top: 20px;
		}
	}

	@include phone {
		&__body {
			width: 100%;
		}

		&__button {
			height: 25px;

			&_circle {
				width: 25px;

				.button__text {
					padding: .5em;
				}
			}
		}
	}
}
</style>
