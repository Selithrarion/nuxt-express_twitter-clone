import Vue from 'vue';
import { formatDistance } from 'date-fns';
import ru from 'date-fns/locale/ru';

Vue.mixin({
	methods: {
		formatDate(date) {
			return formatDistance(date, new Date(), { locale: ru });
		},
	},
});
