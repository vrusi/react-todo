import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from './firebase';


function App() {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.log(error)
    });

  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }

    console.log(user)
  });

  const isUserLoggedIn = user !== null;

  return (
    <div className="App">
      <header>
        <AppBar user={user} onLogout={handleLogout} />
      </header>

      <main>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isUserLoggedIn}>
              <Home user={user} />
            </ProtectedRoute>
          } />

          <Route path="/login" element={
            user ? <Navigate to="/" /> :
              <Login user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
