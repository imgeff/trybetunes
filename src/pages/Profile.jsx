import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../estilo/Profile.css';

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
        {loading ? <Loading /> : (
          <div className="profile">
            <div className="edit">
              <img data-testid="profile-image" src={ image } alt={ name } />
              <Link
                to={ {
                  pathname: '/profile/edit',
                  state: image,
                } }
              >
                Editar perfil
              </Link>
            </div>
            <div className="info-profile">
              <span>Nome</span>
              <p id="name">{name}</p>
              <span>Email</span>
              <p id="email">{email}</p>
              <span>Descrição</span>
              <p id="description">{description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
