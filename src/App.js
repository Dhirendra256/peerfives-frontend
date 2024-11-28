import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserView from './components/UserView';
import P5History from './components/P5History';
import CreateTransaction from './components/CreateTransaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/new" element={<UserForm />} />
        <Route path="/:id" element={<UserView />} />
        <Route path="/:id/p5" element={<P5History />} />
        <Route path="/:id/rewards" element={<P5History />} />
        <Route path="/:id/rewards/new" element={<CreateTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
