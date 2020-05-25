<template>
	<div class="stop-sheet">
		<loader :isRunning="loader"/>
		<div class="container">
			<div class="stop-sheet__body">
				<div class="stop-sheet__controls">
					<div class="stop-sheet__search">
						<label class="stop-sheet__label">
							<span class="icon icon_search"></span>
							<input
								@input="searchItem"
								:value="search"
								class="stop-sheet__input input input_bordered_bottom"
								type="text"
								placeholder="Искать">
						</label>
						<button
							@click="getSearchItem"
							class="stop-sheet__button button button_primary">
							Найти
						</button>
						<button
							@click="cleanSearch"
							:class="[
								'stop-sheet__button',
								'stop-sheet__button_circle',
								'button',
								'button_circle',
								'button_danger']">
							<span class="button__text">x</span>
						</button>
					</div>
					<div class="stop-sheet__add">
						<router-link
							:to="{ name: 'addStopItem' }"
							tag="button"
							class="stop-sheet__button button button_success">
							Добавить
						</router-link>
						<button :class="[
							'stop-sheet__button',
							'stop-sheet__button_blue',
							'stop-sheet__button_circle',
							'button',
							'button_circle']">
							<span class="icon icon_file"></span>
						</button>
						<button :class="[
							'stop-sheet__button',
							'stop-sheet__button_purpule',
							'stop-sheet__button_circle',
							'button',
							'button_circle']">
							<span class="icon icon_file"></span>
						</button>
					</div>
				</div>
				<div class="stop-sheet__content">
					<div class="stop-sheet__head">
						<div class="stop-sheet__text">Телефон</div>
						<div class="stop-sheet__text">Действия</div>
					</div>
					<stop-list :list="slicedList"/>
					<div class="stop-sheet__foot">
						<div class="stop-sheet__views">
							<div class="stop-sheet__text">Строк на странице:</div>
							<div class="stop-sheet__text stop-sheet__select">
								<div
									@click="toggleList"
									:class="['stop-sheet__current', disabled]">
									{{currentPerPage}}
								</div>
								<ul v-if="listOpen" class="stop-sheet__list">
									<li
										v-for="(el, index) in limiPerPage"
										:key="index"
										@click="changePerPage(index + 1)"
										class="stop-sheet__item">
										{{index + 1}}
									</li>
								</ul>
							</div>
						</div>
						<div class="stop-sheet__text stop-sheet__perpages">
							{{currentPerPage}}-{{limiPerPage}} из {{list.length}}
						</div>
						<pagination
							@change="changePage"
							:page="page"
							:key="page"
							:perPage="currentPerPage"
							:limit="paginationList"
							class="stop-sheet__pagination"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import pagination from '@/components/pagination';
import stopList from '@/components/stop_list';
import loader from '@/components/loader';

export default {
	name: 'stopSheet',
	data() {
		return {
			list: [],
			filteredList: [],
			phone: '',
			listOpen: false,
			page: parseInt(this.$route.params.page, 10),
			limiPerPage: 25,
			currentPerPage: 1,
			loader: true,
			search: '',
		};
	},
	created() {
		this.$store.dispatch('getList')
			.then(() => {
				this.list = this.$store.state.list;
			});
	},
	updated() {
		this.loader = false;
	},
	methods: {
		toggleList() {
			this.listOpen = !this.listOpen;
		},
		changePerPage(current) {
			this.currentPerPage = current;
			this.listOpen = !this.listOpen;

			if (this.page !== 1) {
				this.page = 1;

				this.$router.push({
					name: 'stopSheet',
					params: { page: this.page },
				});
			}
		},
		changePage(currentPage) {
			this.page = currentPage;

			this.$router.push({
				name: 'stopSheet',
				params: { page: this.page },
			});
		},
		searchItem(e) {
			const val = e.target.value;

			this.search = val;
		},
		cleanSearch() {
			this.search = '';

			this.filteredList.splice(0, this.filteredList.length);
		},
		getSearchItem() {
			this.filteredList = this.list
				.filter((item) => item.number.match(this.search));

			this.currentPerPage = this.filteredList.length;

			if (this.page !== 1) {
				this.page = 1;

				this.$router.push({
					name: 'stopSheet',
					params: { page: this.page },
				});
			}
		},
	},
	computed: {
		paginationList() {
			return this.filteredList.length ? this.filteredList.length : this.list.length;
		},
		slicedList() {
			const from = (this.page - 1) * this.currentPerPage;
			const to = from + this.currentPerPage;

			return this.filteredList.length ? this.filteredList : this.list.slice(from, to);
		},
		disabled() {
			return this.filteredList.length ? 'stop-sheet__current_disabled' : '';
		},
	},
	components: {
		stopList,
		pagination,
		loader,
	},
};
</script>

<style lang="scss">
@import '@/assets/css/modules/var';
@import '@/assets/css/modules/mixin';

.stop-sheet {
	padding: 20px 0;

	&__body {
		padding: 30px 20px;
		background-color: whitesmoke;
	}

	&__controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 60%;
	}

	&__add {
		display: flex;
		justify-content: flex-end;
	}

	&__button {
		height: 35px;

		& + & {
			margin-left: 20px;
		}

		&_circle {
			width: 35px;
		}

		&_blue {
			background-color: $blue;
		}

		&_purpule {
			background-color: $deep-purpule;
		}
	}

	&__label {
		display: flex;
		align-items: center;
		width: 70%;
	}

	&__input {
		margin-left: 5px;
	}

	&__content {
		background-color: white;
		box-shadow: 0 3px 5px 1px $gray;
		margin: 20px 0;
	}

	&__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		border-bottom: 2px solid $gray;
	}

	&__foot {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 20px;
	}

	&__views {
		display: flex;
		align-items: center;
	}

	&__select {
		margin-left: 20px;
		position: relative;
	}

	&__current {
		padding: 5px 30px 5px 0;
		border-bottom: 1px solid $gray;
		position: relative;
		cursor: pointer;

		&:after {
			content: '';
			position: absolute;
			right: 5px;
			top: 50%;
			margin-top: 1px;
			transform: translateY(-50%);
			border: 4px solid transparent;
		}

		&:after {
			border-top-color: $black;
		}

		&_disabled {
			padding-right: 0;
			pointer-events: none;

			&:after {
				display: none;
			}
		}

		&_disabled + .stop-sheet__list {
			display: none;
		}
	}

	&__list {
		position: absolute;
		left: 50%;
		top: 100%;
		margin: 0;
		transform: translateX(-50%);
		background-color: white;
		max-height: 200px;
		overflow: auto;
	}

	&__item {
		padding: 10px;
		text-align: center;
		cursor: pointer;

		& + & {
			border-top: 1px solid $gray;
		}
	}

	&__perpages {
		margin-left: 40px;
	}

	&__pagination {
		margin-left: 40px;
	}

	&__text {
		font-size: rem(12px);
		color: $gray;
		font-weight: bold;
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

	@include tablet {
		&__controls {
			flex-direction: column;
			align-items: flex-start;
		}

		&__add {
			margin-top: 20px;
		}

		&__search {
			width: 100%;
			justify-content: flex-start;
		}

		&__label {
			width: 50%;
			margin-right: 20px;
		}
	}

	@include phone {
		&__foot {
			flex-direction: column;
		}

		&__perpages,
		&__pagination {
			margin-left: 0;
			margin-top: 20px;
		}

		&__search {
			justify-content: space-between;

			.stop-sheet__button {
				margin-left: 0;
			}
		}

		&__label {
			margin-right: 0;
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
