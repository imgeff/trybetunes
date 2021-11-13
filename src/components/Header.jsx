import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: undefined,
    };

    this.recoverUser = this.recoverUser.bind(this);
  }

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser() {
    getUser()
      .then((data) => this.setState({
        loading: false,
        user: data.name,
      }));
  }

  render() {
    const { loading, user } = this.state;

    const Usuario = (
      <span
        data-testid="header-user-name"
      >
        {`Usuário: ${user}`}
      </span>);

    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        {loading ? <Loading /> : Usuario}
      </header>
    );
  }
}

export default Header;
