import { Alert, Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { database } from '../firebase';
import './Login.css';

export default function Login() {
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const errorMapping = {
    'Firebase: Error (auth/email-already-in-use).': 'The email address is already in use.',
    'Firebase: Password should be at least 6 characters (auth/weak-password).': 'Password should be at least 6 characters.',
    'Firebase: Error (auth/invalid-login-credentials).': 'Invalid login credentials.',
  };


  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setUser(userCredential.user);

        await setDoc(doc(database, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          todos: [],
        });
      })
      .catch((error) => {
        setErrorMessage(errorMapping[error.message]);
      })
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        setErrorMessage(errorMapping[error.message]);
      });
  }

  return (
    <div className="container mx-auto">
      <h2>Welcome!</h2>

      <form>
        <div
          className="mb-3"
        >
          <TextField
            label="Email"
            placeholder="your@email.com"
            value={email}
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
            className='w-100'
            autoComplete="username"
          />
        </div>

        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
            className='w-100'
            autoComplete="current-password"
          />
        </div>

        {errorMessage && (
          <Alert severity="error" className="my-3">{errorMessage}</Alert>
        )}

        <div className="my-3">
          <Button
            variant="contained"
            onClick={handleSignUp}
            className='w-100 mb-3'
          >
            Sign Up
          </Button>

          <Button
            variant="text"
            onClick={handleSignIn}
            className="w-100"
          >
            or Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}