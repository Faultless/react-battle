'esversion: 6';

import React, { Component } from "react";
import PropTypes from "prop-types";
import Api from "../utilities/api";
import Loading from './Loading';
import './Popular.css';

var PopularApi = new Api();

function SelectLanguage(props) {
	var languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
	return (
		<ul className="languages">
			{
				languages.map((lang) => {
					return (
						<li 
							key={lang} 
							onClick={props.onSelect.bind(null, lang)}
							style={ lang === props.selectedLanguage ? {color: "#d0021b"} : null }>
							{lang}
						</li>
					)
				})
			}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

function RepoGrid (props) {
	return (
		<ul className="popularList">
			{
				props.repos.map((repo, rank) => {
					return (
						<li className="popularItem">
							<div className="itemRank">#{rank + 1}</div>
							<ul className="itemInfo">
								<li>
									<img 
										className="itemImage"
										src={repo.owner.avatar_url}
										alt={"Image for " + repo.owner.login} />
								</li>
								<li>
									<a href={repo.html_url} target="_blank">{repo.name}</a>
								</li>
								<li>
									@{repo.owner.login}
								</li>
								<li>
									{repo.stargazers_count} stars
								</li>
							</ul>
						</li>
					)
				})
			}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

class Popular extends Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedLanguage: "All",
			repos: null
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	updateLanguage (language) {
		this.setState(() => {
			return {
				selectedLanguage: language,
				repos: null
			}
		});
		PopularApi.fetchPopularRepos(language)
			.then((repos) => {
				this.setState(() => {
					return {
						repos: repos
					}
				})
			})
	}

	componentDidMount () {
		this.updateLanguage(this.state.selectedLanguage);
	}

	render () {
		return (
			<div>
				<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage} />
				{
					!this.state.repos
						? <Loading />
						: <RepoGrid repos={this.state.repos} />
				}
			</div>
		)
	}
}

export default Popular;