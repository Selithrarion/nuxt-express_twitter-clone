export default function({ $axios, redirect, store }) {
	$axios.interceptors.request.use(request => {
		const token = store.state.token;
		if (token) {
			request.headers.token = token;
		}
		return request;
	});
}
