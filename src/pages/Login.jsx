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
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/991px-Font_Awesome_5_solid_user-circle.svg.png',
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      name: target.value,
    });
  }

  handleClick() {
    const { name, image } = this.state;
    this.setState({ loading: true }, () => {
      createUser({ name, image })
        .then(() => this.setState({ redirect: true }));
    });
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
    const minLenght = 3;
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
    const { name, redirect } = this.state;
    return (
      <div className="page-login" data-testid="page-login">
        <img src={ Logo } alt="Logo" />
        <form className="form-login">
          {this.validateInput()}
          {name.length >= minLenght ? enabled : disabled}
          {redirect === true && <Redirect to="/search" />}
          <Link to="/profile/edit">Cadastre-se</Link>
        </form>
      </div>
    );
  }
}

export default Login;
