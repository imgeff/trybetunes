import React from 'react';
import Logo from '../images/LOGO.png';
import '../estilo/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page-not-found">
        <img src={ Logo } alt="Logo" />
        <div>
          <h1>Ops!</h1>
          <p>A página que você está procurando não foi encontrada.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
