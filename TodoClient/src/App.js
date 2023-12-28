import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';
import Layout from './components/Layout';
import Login from './components/Login';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App;
