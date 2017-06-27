"esversion: 6";

import React, { Component } from 'react';
import * as ReactRouter from 'react-router-dom';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Popular from './Popular';

var Switch = ReactRouter.Switch;
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App container">
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/battle" component={Battle} />
						<Route path='/popular' component={Popular} />
						<Route render={() => {return <p>Not Found</p>}} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
