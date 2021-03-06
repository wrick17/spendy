import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import Dashboard from './components/Dashboard.jsx';
import Expenses from './components/Expenses.jsx';
import TagPage from './components/TagPage.jsx';
import ContributorPage from './components/ContributorPage.jsx';

var history = createHistory({
  queryKey: false
});

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="expenses" component={Expenses} />
      <Route path="tag" component={TagPage} />
      <Route path="contributor" component={ContributorPage} />
    </Route>
  </Router>,
  document.getElementById('app')
);