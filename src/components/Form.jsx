import React from 'react';
import PropTypes from 'prop-types';
import lupa from '../images/search.svg';
import '../estilo/Form.css';

class Form extends React.Component {
  render() {
    const {
      testidInput,
      testidButton,
      placeholder,
      nameButton,
      handleChange,
      handleClick,
      stateLength,
      minLength } = this.props;

    const enabled = (
      <button
        data-testid={ testidButton }
        type="button"
        onClick={ handleClick }
      >
        {nameButton}
      </button>);

    const disabled = (
      <button
        data-testid={ testidButton }
        type="button"
        disabled
      >
        {nameButton}
      </button>);
    return (
      <form className="form-search">
        <div>
          <img src={ lupa } alt="lupa" />
          <input
            data-testid={ testidInput }
            type="text"
            placeholder={ placeholder }
            onChange={ handleChange }
          />
          {stateLength >= minLength ? enabled : disabled}
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  testidInput: PropTypes.string.isRequired,
  testidButton: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  nameButton: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  stateLength: PropTypes.number.isRequired,
  minLength: PropTypes.number.isRequired,
};

export default Form;
