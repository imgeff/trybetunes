import React from 'react';
import musicNote from '../images/icons8-música.svg';
import musicDisc from '../images/icons8-gravar-música-80.png';
import claveSol from '../images/icons8-clave-de-sol-64.png';
import '../estilo/Background.css';

class Background extends React.Component {
  render() {
    return (
      <>
        <img src={ musicNote } alt="musicNote" id="icon-note1" />
        <img src={ musicNote } alt="musicNote" id="icon-note2" />
        <img src={ musicNote } alt="musicNote" id="icon-note3" />
        <img src={ musicNote } alt="musicNote" id="icon-note4" />
        <img src={ musicDisc } alt="musicDisc" id="icon-disc1" />
        <img src={ musicDisc } alt="musicDisc" id="icon-disc2" />
        <img src={ musicDisc } alt="musicDisc" id="icon-disc3" />
        <img src={ claveSol } alt="claveSol" id="claveSol" />
        <img src={ claveSol } alt="claveSol" id="claveSol1" />
        <img src={ claveSol } alt="claveSol" id="claveSol2" />
        <img src={ musicDisc } alt="musicDisc" id="icon-disc4" />
      </>
    );
  }
}

export default Background;
