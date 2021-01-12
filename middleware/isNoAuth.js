export default ({ store, redirect }) => {
	const TOKEN = store.state.token;
	if (TOKEN) {
		redirect('/home');
	}
};
