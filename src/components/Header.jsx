import React from 'react';
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
        {loading ? <Loading /> : Usuario}
      </header>
    );
  }
}

export default Header;
