import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { updateUser } from '../services/userAPI';
import Loading from './Loading';

class FormProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      redirectLogin: false,
      redirectProfile: false,
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  componentDidUpdate() {
    const { password, name } = this.state;
    localStorage.setItem('password', password);
    localStorage.setItem('nameUser', name);
  }

  handleChange({ target }) {
    this.disabledButton();
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  handleClick() {
    const { cadastro } = this.props;
    if (cadastro === true) {
      const { name, email, image, description } = this.state;
      this.setState({ loading: true }, () => {
        updateUser({ name, email, image, description })
          .then(() => this.setState({ redirectLogin: true, loading: false }));
      });
    } else {
      const { name, email, image, description } = this.state;
      this.setState({ loading: true }, () => {
        updateUser({ name, email, image, description })
          .then(() => this.setState({ redirectProfile: true, loading: false }));
      });
    }
  }

  disabledButton() {
    const { name, email, image, description } = this.state;
    const nameLength = name.length;
    const emailLength = email.length;
    const imageLength = image.length;
    const descriptionLength = description.length;
    if (nameLength < 1 || emailLength < 1 || imageLength < 1 || descriptionLength < 1) {
      this.setState({ disabled: true });
    }
    if (nameLength > 0 && emailLength > 0 && imageLength > 0 && descriptionLength > 0) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { redirectLogin, redirectProfile, disabled, loading, image } = this.state;
    console.log(image);
    const disabledButton = (
      <button
        type="button"
        data-testid="edit-button-save"
        onClick={ this.handleClick }
        disabled
      >
        Salvar
      </button>);
    const enabledButton = (
      <button
        type="button"
        data-testid="edit-button-save"
        onClick={ this.handleClick }
      >
        Salvar
      </button>);
    return (
      <form>
        { loading === true && <Loading /> }
        { redirectLogin === true && <Redirect to="/login" />}
        { redirectProfile === true && <Redirect to="/profile" />}
        <span>
          Nome
          <p>Fique à vontade para usar seu nome social</p>
          <input
            data-testid="edit-input-name"
            type="text"
            id="edit-input-name"
            name="name"
            placeholder="Usuário"
            onChange={ this.handleChange }
            minLength="1"
          />
        </span>
        <span>
          Email
          <p>Escolha um e-mail que consulte diariamente</p>
          <input
            data-testid="edit-input-email"
            type="email"
            name="email"
            id="edit-input-email"
            placeholder="usuario@usuario.com.br"
            onChange={ this.handleChange }
          />
        </span>
        <span>
          Descrição
          <p>Fale um pouco sobre você</p>
          <textarea
            data-testid="edit-input-description"
            id="edit-input-description"
            name="description"
            placeholder="Sobre mim"
            onChange={ this.handleChange }
          />
        </span>
        <span>
          Foto de perfil
          <p>Escolha uma foto que te represente!</p>
          <input
            data-testid="edit-input-image"
            type="text"
            id="edit-input-image"
            name="image"
            placeholder="Insira um link"
            onChange={ this.handleChange }
          />
        </span>
        <span>
          Senha
          <p>Escolha uma senha que você se lembre com facilidade</p>
          <input
            data-testid="edit-input-password"
            type="password"
            name="password"
            onChange={ this.handleChange }
          />
        </span>
        { disabled ? disabledButton : enabledButton }
      </form>
    );
  }
}

FormProfile.propTypes = {
  cadastro: PropTypes.bool.isRequired,
};

export default FormProfile;
