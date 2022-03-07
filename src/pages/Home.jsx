import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Logo from '../images/LOGO.png';
import Marshmello from '../images/undraw_mello_otq1.svg';
import '../estilo/Home.css';
import Background from '../components/Background';

class Home extends React.Component {
  handleClick = () => {
    const userDefault = {
      description: '',
      email: '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Font_Awesome_5_solid_user-circle.svg/991px-Font_Awesome_5_solid_user-circle.svg.png',
      name: 'Username',
    };
    createUser(userDefault);
  }

  render() {
    return (
      <div className="background-start">
        <Background className="icons-animated" />
        <img src={ Marshmello } alt="Dj Marshmello" className="background-img" />
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
              <button className="btn-cadastro" type="button" onClick={ this.handleClick }>
                Cadastre-se
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
