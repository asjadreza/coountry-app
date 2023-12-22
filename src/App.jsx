// eslint-disable-next-line
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Countries} />
          <Route path="/CountryDetails" component={CountryDetails} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
