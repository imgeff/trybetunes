import React from 'react';
import '../estilo/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <span>Carregando...</span>
      </div>
    );
  }
}

export default Loading;
