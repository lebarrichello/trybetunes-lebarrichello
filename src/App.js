import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/album/:id" component={ Album } />
        <Route path="/search" component={ Search } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/profile/edit" component={ ProfileEdit } exact />
        <Route path="/" component={ Login } exact />
        <Route path="/*" component={ NotFound } />
      </Switch>
    );
  }
}
/// iniciando
export default App;
