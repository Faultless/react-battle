import React, {Component} from 'react';
import PropTypes from 'prop-types';

var styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
};

class Loading extends Component {
	constructor (props) {
		super(props);

		this.state = {
			text: props.text,
			speed: props.speed
		};
	}	
	
	render () {
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		)
	}

	componentDidMount () {
		let stopper = this.props.text + '...';
		this.interval = window.setInterval(() => {
			if(this.state.text === stopper) {
				this.setState(() => {
					return {
						text: this.props.text
					}
				})
			}else {
				this.setState(prevState => {
					return { text: prevState.text + '.' }
				})
			}
		}, this.props.speed);
	}

	componentWillUnmount () {
		window.clearInterval(this.interval);
	}
}

Loading.PropTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 300
}

export default Loading;