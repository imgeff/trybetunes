import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
      ok: false,
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
    const { name } = this.state;
    this.setState({ loading: true }, () => {
      createUser({ name })
        .then(() => this.setState({ ok: true }));
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
    const { name, ok } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <fieldset>
            {this.validateInput()}
            {name.length >= minLenght ? enabled : disabled}
            {ok === true && <Redirect to="/search" />}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
