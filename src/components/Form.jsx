import React from 'react';
import PropTypes from 'prop-types';

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
        disabled="true"
      >
        {nameButton}
      </button>);
    return (
      <form>
        <input
          data-testid={ testidInput }
          type="text"
          placeholder={ placeholder }
          onChange={ handleChange }
        />
        {stateLength >= minLength ? enabled : disabled}
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
