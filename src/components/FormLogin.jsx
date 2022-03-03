import React from 'react';
import { Redirect } from 'react-router';
import { createUser, getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from '../images/LOGO.png';
import styles from '../estilo/Login.module.css';

class FormLogin extends React.Component {
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

  recoverUser() {
    getUser()
      .then((data) => this.setState({
        description: data.description,
        email: data.email,
        image: data.image,
      }));
  }

  render() {
    const { name, redirect, login, senhaDigitada, loading } = this.state;
    const MINLENGTH = 3;

    const acessoInvalido = (
      <span className="invalid-pass">Senha ou Usuário Inválido</span>);

    const btnDisabled = (
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

    const btnEnabled = (
      <button
        type="button"
        data-testid="login-submit-button"
        onClick={ this.handleClick }
        name="Entrar"
      >
        Entrar
      </button>);
    return (
      <>
        <div className={ styles.box_logo }>
          <img src={ Logo } alt="Logo" className={ styles.login_logo } />
        </div>
        <form className={ styles.form_login }>
          { loading ? <Loading /> : (
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
              {
                name.length >= MINLENGTH
                && senhaDigitada.length >= MINLENGTH ? btnEnabled : btnDisabled
              }
            </>
          )}
          {login === false && acessoInvalido}
          {redirect === true && <Redirect to="/search" />}
        </form>
      </>
    );
  }
}

export default FormLogin;
