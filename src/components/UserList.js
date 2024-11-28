import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <Link to="/new">Create New User</Link>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.p5_balance}</td>
              <td>{user.reward_balance}</td>
              <td><Link to={`${user.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
