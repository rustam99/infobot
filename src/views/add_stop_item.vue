<template>
	<div class="add-item">
		<div class="container">
			<div class="add-item__body">
				<div class="add-item__input">
					<input
						v-model="number"
						class="input input_bordered_bottom"
						type="text"
						placeholder="Телеофн">
				</div>
				<button
					@click="addItem"
					class="add-item__button add-item__button_circle button button_circle"/>
			</div>
			<button
				@click="goBack"
				class="add-item__button add-item__button_indent button button_default">
				Назад
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'addStopItem',
	data() {
		return {
			number: '',
		};
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		addItem() {
			this.$store.dispatch('addItem', this.number)
				.then(() => {
					this.$router.replace({
						name: 'stopSheet',
						params: { page: 1 },
					});
				});
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/css/modules/var';
@import '@/assets/css/modules/mixin';

.add-item {
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
