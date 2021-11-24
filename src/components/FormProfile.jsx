import React from 'react';
import { Redirect } from 'react-router';
import { updateUser } from '../services/userAPI';
import Loading from './Loading';

class FormProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      redirect: false,
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  handleChange({ target }) {
    this.disabledButton();
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  handleClick() {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true }, () => {
      updateUser({ name, email, image, description })
        .then(() => this.setState({ redirect: true, loading: false }));
    });
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
    const { redirect, disabled, loading } = this.state;
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
        { redirect === true && <Redirect to="/profile" />}
        <label htmlFor="edit-input-name">
          Nome:
          <input
            data-testid="edit-input-name"
            type="text"
            id="edit-input-name"
            name="name"
            // value={ name }
            onChange={ this.handleChange }
            minLength="1"
          />
        </label>
        <label htmlFor="edit-input-email">
          Email:
          <input
            data-testid="edit-input-email"
            type="email"
            name="email"
            id="edit-input-email"
            // value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="edit-input-description">
          Descrição:
          <textarea
            data-testid="edit-input-description"
            id="edit-input-description"
            name="description"
            // value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="edit-input-image">
          Foto de perfil:
          <input
            data-testid="edit-input-image"
            type="text"
            id="edit-input-image"
            name="image"
            // value={ image }
            onChange={ this.handleChange }
          />
        </label>
        { disabled ? disabledButton : enabledButton }
      </form>
    );
  }
}

export default FormProfile;
