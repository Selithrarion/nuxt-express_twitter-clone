import colors from 'vuetify/es5/util/colors';

export default {
	head: {
		titleTemplate: '%s - nuxt-twitter',
		title: 'nuxt-twitter',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	css: [],

	plugins: ['@/plugins/axios', '@/plugins/formatDate'],

	components: true,

	buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

	modules: ['@nuxtjs/axios', 'cookie-universal-nuxt'],

	axios: {
		baseURL: process.env.BASE_URL + '/api',
	},

	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			themes: {
				light: {
					primary: '#1DA1F2',
					secondaryBlack: '#14171A',
					secondaryDarkGray: '#657786',
					secondaryLightGray: '#AAB8C2',
					secondaryExtraLightGray: '#E1E8ED',
					secondaryExtraExtraLightGray: '#F5F8FA',
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					errorPink: '#FBDEE7',
					error: colors.red.darken1,
					success: colors.green.accent3,
				},
			},
		},
	},
	build: {},
	serverMiddleware: [
		{
			path: '/api',
			handler: '~/api/index.ts',
		},
	],
	pageTransition: 'fade-transition',
};
