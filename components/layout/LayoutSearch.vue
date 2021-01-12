<template>
	<v-text-field
		v-model="searchText"
		filled
		rounded
		prepend-inner-icon="mdi-magnify"
		placeholder="Поиск в Твиттере"
		background-color="#e6ecf0"
	></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	data() {
		return {
			searchText: '',
		};
	},
});
</script>