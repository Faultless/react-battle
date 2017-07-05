import React, {Component} from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Api from '../utilities/api';
import PropTypes from 'prop-types';

import { PlayerPreview } from './PlayerPreview';
import Loading from './Loading';

let playersApi = new Api();

function Profile (props) {
	let info = props.info;
	return (
		<PlayerPreview
			username={info.login}
			avatar={info.avatar_url}>
			<ul className="space-list-items">
				{info.name && <li>{info.name}</li>}
				{info.location && <li>{info.location}</li>}
				{info.company && <li>{info.company}</li>}
				<li>Followers: {info.followers}</li>
				<li>Following: {info.following}</li>
				<li>Public Repos: {info.public_repos}</li>
				{info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
			</ul>
		</PlayerPreview>
	)
}

Profile.PropTypes = {
	info: PropTypes.object.isRequired
}

function Player (props) {
	return (
		<div>
			<h1 className="header">{props.label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
			<Profile 
				info={props.profile}/>
		</div>
	)
}

Player.PropTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Result extends Component {
	constructor (props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		};
	}

	componentDidMount () {
		let players = queryString.parse(this.props.location.search);
		playersApi.battle([
			players.playerOneName,
			players.playerTwoName
		]).then(sortedPlayers => {
			if(sortedPlayers === null) {
				this.setState(() => {
					return {
						error: "Error! Check both users are on Github.",
						loading: false
					}
				});
			}
			else {
				this.setState(() => {
					return {
						error: null,
						winner: sortedPlayers[0],
						loser: sortedPlayers[1],
						loading: false
					}
				})
			}
		});
	}

	render () {
		let error = this.state.error;
		let loading = this.state.loading;
		let winner = this.state.winner;
		let loser = this.state.loser;
		if(loading === true) {
			return <Loading />
		}
		if(error) {
			return (
				<div>
					<p>{error}</p>
					<Link className="button" to="/battle">Reset</Link>
				</div>
			)
		}
		else {
			return (
				<div className="row">
					<Player 
						label="Winner"
						score={winner.score}
						profile={winner.profile}
					/>
					<Player
						label="Loser"
						score={loser.score}
						profile={loser.profile}
					/>
				</div>
			)
		}
	}
}

export default Result;