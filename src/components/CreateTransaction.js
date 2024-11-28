import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CreateTransaction() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [points, setPoints] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (points > 100 || points <= 0) {
      setError('Points must be between 1 and 100');
      return;
    }

    fetch(`http://localhost:3000/users/${id}/p5`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        points,
        given_to_id: selectedUser,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          navigate(`/${id}`);
        } else {
          setError(data.error || 'Something went wrong');
        }
      });
  };

  return (
    <div>
      <h1>Create New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select User:
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {users
              .filter((user) => user.id !== parseInt(id)) // Exclude self
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          Points:
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            max="100"
            min="1"
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate(`/${id}/p5`)}>
          Cancel
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateTransaction;
