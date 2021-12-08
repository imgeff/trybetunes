import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from '../images/LogoWhite.png';
import '../estilo/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: undefined,
      image: undefined,
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
        image: data.image,
      }));
  }

  render() {
    const { loading, user, image } = this.state;

    const Usuario = (
      <span
        data-testid="header-user-name"
      >
        <img src={ image } alt="foto de perfil" />
        {user}
      </span>);

    return (
      <header data-testid="header-component">
        <img src={ Logo } alt="logo" />
        {loading ? <Loading /> : Usuario}
      </header>
    );
  }
}

export default Header;
