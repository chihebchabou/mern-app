import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import { loadUser } from './actions/authActions';
import PrivateRoutes from './components/routing/PrivateRoutes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
  }, []);
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Alerts />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
