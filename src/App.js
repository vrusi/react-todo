import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { useState } from "react";
import { Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import TaskeeAppBar from './components/AppBar';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const firebaseConfig = {
  apiKey: "AIzaSyCbALzKlJ9D2TAoVvZUCsgRPo_c92rRHIU",
  authDomain: "react-todo-aaef3.firebaseapp.com",
  projectId: "react-todo-aaef3",
  storageBucket: "react-todo-aaef3.appspot.com",
  messagingSenderId: "533985485787",
  appId: "1:533985485787:web:d41c50dd0760c1a1643dfe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    console.log('login');
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('signed out')
    }).catch((error) => {
      console.log(error)
    });

  };

  onAuthStateChanged(auth, (user) => {

    if (user) {
      setUser(user);
    }
  });

  return (
    <div className="App">
      <header>
        <TaskeeAppBar user={user} onLogout={handleLogout} />
      </header>
      <main>
        <Routes>

          <Route path="/" element={
            <ProtectedRoute user={user}>
              <Home user={user} />
            </ProtectedRoute>
          } />


          <Route path="/login" element={<Login user={user} onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
