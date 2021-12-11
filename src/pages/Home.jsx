import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/LOGO.png';
// import '../estilo/Login.css';
import '../estilo/Home.css';

class Start extends React.Component {
  render() {
    return (
      <div className="background-start">
        <div className="page-start">
          <div className="logo-start">
            <img src={ Logo } alt="Logo" />
          </div>
          <div className="text-start">
            <h1>A vida pode ser mais simples com um click, dê um play em sua vida! </h1>
            <p>
              Simplifique momentos, escolha seus artistas,
              favorite suas músicas e sinta a vibe que liberta!
            </p>
          </div>
          <div className="start-buttons">
            <Link to="/login">Login</Link>
            <Link
              to={ {
                pathname: '/profile/edit',
                state: { cadastro: true },
              } }
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Start;
