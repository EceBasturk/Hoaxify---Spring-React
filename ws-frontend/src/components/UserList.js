import React, { Component } from 'react'
import { getUsers } from '../api/apiCalls'
import UserListItem from './UserListItem';

export default class UserList extends Component {

  state = {
    page: {
      content: [],
      size: 3,
      number: 0
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  onClickNext = () => {
    const nextPage = this.state.page.number + 1;
    this.loadUsers(nextPage);
  };

  onClickPrevious = () => {
    const previousPage = this.state.page.number - 1;
    this.loadUsers(previousPage);
  };

  loadUsers = page => {
    getUsers(page).then(response => {
      this.setState({
        page: response.data
      });
    });
  };

  render() {
    const { content: users, last, first } = this.state.page;

    return (
      <div className='card'>
        <h3 className='card-header text-white bg-dark mb-3 text-center'> Users</h3>
        <div className="list-group-flush" >
          {users.map(user => (
            <UserListItem key={user.username} user={user} />
          ))}
        </div>
        <div>
          {first === false && (
            <button className="btn btn-sm btn-light" onClick={this.onClickPrevious}>
              {('Previous')}
            </button>
          )}
          {last === false && (
            <button className="btn btn-sm btn-light float-end" onClick={this.onClickNext}>
              {('Next')}
            </button>
          )}
        </div>
      </div>
    );
  }
}
