import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import About from './components/About';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import history from './config/history';

let store = configureStore()

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path='/:gender/:temperature_scale/:location' component={App} />
                <Route exact path="/about" component={About} />
            </Switch>
        </BrowserRouter>
    </Provider>
    ),
    document.getElementById('root')
);
