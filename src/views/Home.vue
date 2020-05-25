<template>
<!-- Это страница создана для правильной работы компонента breadcrumbs -->
	<div class="home">
		<div class="container">
			<h1 class="home__titile">Главная страница</h1>
			<router-link
				:to="{ name: 'stopSheet', params: { page: 1 } }">
				К стоп листам
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
};
</script>
