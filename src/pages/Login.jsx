import React from 'react';
import FormLogin from '../components/FormLogin';
import styles from '../estilo/Login.module.css';

class Login extends React.Component {
  render() {
    return (
      <div className={ styles.page_login } data-testid="page-login">
        <FormLogin />
      </div>
    );
  }
}

export default Login;
