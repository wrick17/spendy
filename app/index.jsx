import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Dashboard from './components/Dashboard.jsx';
import createHistory from 'history/lib/createBrowserHistory';

// Opt-out of persistent state, not recommended.
var history = createHistory({
  queryKey: false
});

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="dashboard" component={Dashboard} />
    </Route>
  </Router>,
  document.getElementById('app')
);