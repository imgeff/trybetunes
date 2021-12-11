import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import '../estilo/Loading.css';
import Loader from 'react-loader-spinner';

class Loading extends React.Component {
  render() {
    return (
      <Loader
        className="loader"
        type="ThreeDots"
        color="#023031"
        height={ 60 }
        width={ 60 }
      />
    );
  }
}

export default Loading;
