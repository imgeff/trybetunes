import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Logo from '../images/LOGO.png';
import '../estilo/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      senhaDigitada: '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/991px-Font_Awesome_5_solid_user-circle.svg.png',
      loading: false,
      redirect: false,
      login: undefined,
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      name: target.value,
    });
  }

  handleChangePassword({ target }) {
    this.setState({
      senhaDigitada: target.value,
    });
  }

  handleClick() {
    const { name, image, senhaDigitada } = this.state;
    const password = localStorage.getItem('password');
    if (senhaDigitada === password) {
      this.setState({ loading: true, login: true }, () => {
        createUser({ name, image })
          .then(() => this.setState({ redirect: true }));
      });
    } else {
      this.setState({ login: false });
    }
  }

  validateInput() {
    const { loading } = this.state;
    const inputName = (
      <input
        data-testid="login-name-input"
        type="text"
        placeholder="Nome de Usuario"
        onChange={ this.handleChange }
      />
    );

    if (loading) {
      return <Loading />;
    }
    return inputName;
  }

  render() {
    const MINLENGTH = 3;
    const senhaInvalida = <span className="invalid-pass">Senha Inválida</span>;
    const disabled = (
      <button
        type="button"
        data-testid="login-submit-button"
        click={ this.handleClick }
        name="Entrar"
        disabled="true"
      >
        Entrar
      </button>);
    const enabled = (
      <button
        type="button"
        data-testid="login-submit-button"
        onClick={ this.handleClick }
        name="Entrar"
      >
        Entrar
      </button>);
    const { name, redirect, login } = this.state;
    return (
      <div className="page-login" data-testid="page-login">
        <img src={ Logo } alt="Logo" />
        <form className="form-login">
          {this.validateInput()}
          <input
            data-testid="edit-input-password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={ this.handleChangePassword }
          />
          {login === false && senhaInvalida}
          {name.length >= MINLENGTH ? enabled : disabled}
          {redirect === true && <Redirect to="/search" />}
          <Link to="/profile/edit">Cadastre-se</Link>
        </form>
      </div>
    );
  }
}

export default Login;
