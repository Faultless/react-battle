import Axios from 'axios';

function getProfile(username) {
	return Axios.get("https://api.github.com/users/" + username)
		.then((user, err) => err ? console.log(err) :  user.data);
}

function getRepos(username) {
	return Axios.get("https://api.github.com/users/" + username + "/repos?per_page=100")
		.then((repos, err) => err ? console.log(err) : repos);
}

function getStarCount(repos) {
	return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore(profile, repos) {
	let followers = profile.followers;
	let totalStars = getStarCount(repos);

	return (followers * 3) + totalStars;
}

function getUserData(player) {
	return Axios.all([
		getProfile(player),
		getRepos(player)
	]).then(data => {
		let profile = data[0];
		let repos = data[1];

		return {
			profile: profile,
			score: calculateScore(profile, repos)
		}
	})
}

function sortPlayers (players) {
	return players.sort((a, b) => b.score - a.score);
}

function handleError (error) {
	console.warn(error);
	return null;
}

class Api {

	battle (players) {
		return Axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError)
	}

	fetchPopularRepos (language) {
		var encodedURI = window.encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:" + language + "&sort=stars&order=desc&type=Repositories");

		return Axios.get(encodedURI)
			.then((res, err) => err ? console.log(err) : res.data.items);
	}
}

export default Api;