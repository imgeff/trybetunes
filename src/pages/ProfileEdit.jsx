import React from 'react';
import FormProfile from '../components/FormProfile';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <FormProfile
            valueName={ name }
            valueEmail={ email }
            valueImg={ image }
            valueDesc={ description }
          />
        )}
      </div>
    );
  }
}

export default ProfileEdit;
