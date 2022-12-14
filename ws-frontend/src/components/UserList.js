import React, { Component } from 'react'
import { getUsers } from '../api/apiCalls'

export default class UserList extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    getUsers().then(response => {
      this.setState({
        users: response.data
      })
    })
  }

  render() {
    const { users } = this.state;

    return (
      <div className='card'>
        <h3 className='card-header text-white bg-dark mb-3 text-center'> Users</h3>
        <div className="list-group-flush">
          {users.map(user => (
            <div className="list-group-item list-group-item-action list-group-item-light" key={user.username}>
              {user.username}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
