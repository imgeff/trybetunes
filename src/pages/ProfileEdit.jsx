import React from 'react';
import PropTypes from 'prop-types';
import FormProfile from '../components/FormProfile';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../estilo/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
    };
    this.requestLog = this.requestLog.bind(this);
  }

  componentDidMount() {
    this.requestLog();
  }

  requestLog() {
    this.setState({ loading: true }, () => {
      getUser()
        .then((data) => this.setState({
          name: data.name,
          email: data.email,
          image: data.image,
          description: data.description,
          loading: false,
        }));
    });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    const { location: { state: { cadastro } } } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <div className="form-edit">
            <img className="photo-profile" src={ image } alt={ name } />
            <FormProfile
              valueName={ name }
              valueEmail={ email }
              valueImg={ image }
              valueDesc={ description }
              cadastro={ cadastro }
            />
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      cadastro: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default ProfileEdit;
