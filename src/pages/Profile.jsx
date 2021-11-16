import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
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
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div className="profile">
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit">Editar perfil</Link>
            <p>{name}</p>
            <p>{email}</p>
            <p>{description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
