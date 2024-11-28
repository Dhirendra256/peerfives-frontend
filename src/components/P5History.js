import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function P5History() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Use URLSearchParams to extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const headerLabel = type === 'p5' ? 'Given To User' : 'Given By User';

  // Fetch transaction history
  useEffect(() => {
    debugger
    fetch(`http://localhost:3000/users/${id}/p5?type=${type}`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, [id]);

  // Handle transaction deletion
  const handleDelete = (transactionId) => {
    fetch(`http://localhost:3000/users/${id}/p5/${transactionId}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        setTransactions(transactions.filter(tx => tx.id !== transactionId)); // Remove from UI
      });
  };

  return (
    <div>
      <h1>P5 Transaction History</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>P5 Given</th>
            <th>{headerLabel}</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx.id}>
              <td>{index + 1}</td>
              <td>{new Date(tx.created_at).toLocaleString()}</td>
              <td>{tx.points}</td>
              <td>{type === 'p5' ? tx.given_to_name : tx.given_by_name}</td>
              <td>
                <button onClick={() => handleDelete(tx.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(`/${id}/rewards/new`)}>Create New Reward</button>
    </div>
  );
}

export default P5History;
