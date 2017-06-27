import Axios from 'axios';

class Api {
	fetchPopularRepos (language) {
		var encodedURI = window.encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:" + language + "&sort=stars&order=desc&type=Repositories");

		return Axios.get(encodedURI)
			.then((res, err) => {
				if(err) return console.log(err);
				return res.data.items;
			})
	}
}

export default Api;