import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', p5_balance: 0, reward_balance: 0 });

  // Fetch user details when component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [id]);

  // Handle form submission to update the user's name
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: user.name }),
    }).then(() => navigate('/'));
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>

      <div>
        <h2>User Balances</h2>
        <p>P5 Balance: {user.p5_balance}</p>
        <p>Reward Balance: {user.reward_balance}</p>
        <button onClick={() => navigate(`/${id}/p5?type=p5`)}>View P5 History</button>
        <button onClick={() => navigate(`/${id}/rewards?type=rewards`)}>View Rewards History</button>
      </div>
    </div>
  );
}

export default UserView;
