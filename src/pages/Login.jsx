import React from 'react';
import { Redirect } from 'react-router';
import { createUser, getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Logo from '../images/LOGO.png';
import styles from '../estilo/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      email: '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/991px-Font_Awesome_5_solid_user-circle.svg.png',
      loading: false,
      login: undefined,
      name: '',
      redirect: false,
      senhaDigitada: '',
    };

    this.recoverUser = this.recoverUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  componentDidMount() {
    this.recoverUser();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { email, description, name, image, senhaDigitada } = this.state;
    const password = localStorage.getItem('password');
    const nameUser = localStorage.getItem('nameUser');
    if (senhaDigitada === password && name === nameUser) {
      this.setState({ loading: true, login: true }, () => {
        createUser({ name, image, description, email })
          .then(() => this.setState({ redirect: true }));
      });
    } else {
      this.setState({ login: false });
    }
  }

  validateInput() {
    const { loading } = this.state;
    const inputName = (
      <>
        <input
          data-testid="login-name-input"
          type="text"
          name="name"
          placeholder="Nome de Usuario"
          onChange={ this.handleChange }
        />
        <input
          data-testid="edit-input-password"
          type="password"
          name="senhaDigitada"
          placeholder="Digite sua senha"
          onChange={ this.handleChange }
        />
      </>
    );

    if (loading) {
      return <Loading />;
    }
    return inputName;
  }

  recoverUser() {
    getUser()
      .then((data) => this.setState({
        description: data.description,
        email: data.email,
        image: data.image,
      }));
  }

  render() {
    const MINLENGTH = 3;

    const acessoInvalido = (
      <span className="invalid-pass">Senha ou Usuário Inválido</span>);

    const disabled = (
      <button
        style={ { backgroundColor: '#0039e5a9', border: 'none' } }
        type="button"
        data-testid="login-submit-button"
        click={ this.handleClick }
        name="Entrar"
        disabled
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

    const { name, redirect, login, senhaDigitada } = this.state;
    return (
      <div className={ styles.page_login } data-testid="page-login">
        <div className={ styles.box_logo }>
          <img src={ Logo } alt="Logo" className={ styles.login_logo } />
        </div>
        <form className={ styles.form_login }>
          {this.validateInput()}
          {login === false && acessoInvalido}
          {name.length && senhaDigitada.length >= MINLENGTH ? enabled : disabled}
          {redirect === true && <Redirect to="/search" />}
        </form>
      </div>
    );
  }
}

export default Login;
