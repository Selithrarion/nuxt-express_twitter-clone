<template>
	<div class="main-page">
		<v-row>
			<MainPageLeftSide />
			<MainPageRightSide />
		</v-row>
		<v-footer height="78px"></v-footer>
	</div>
</template>

<script>
export default {
	layout: 'empty',
	middleware: ['isNoAuth'],
	data() {
		return {};
	},
};
</script>
