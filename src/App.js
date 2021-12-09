import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Home from './pages/Home';
import Header from './components/Header';
import Nav from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/album/:id" component={ Album } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route
            path="/profile"
            render={ (props) => (
              <>
                <Header />
                <Nav />
                <Profile { ...props } />
              </>
            ) }
          />
          <Route
            path="/search"
            render={ (props) => (
              <>
                <Header />
                <Nav />
                <Search { ...props } />
              </>
            ) }
          />
          <Route
            path="/favorites"
            render={ (props) => (
              <>
                <Header />
                <Nav />
                <Favorites { ...props } />
              </>
            ) }
          />
          <Route path="/Login" component={ Login } />
          <Route exact path="/" component={ Home } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
