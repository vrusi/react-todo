import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import './Login.css';

export default function Login() {
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const handleSignUp = () => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('userCredential', userCredential);
        // Signed up
        setUser(userCredential.user);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="container mx-auto">
      <h2>Welcome!</h2>

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
        />
      </div>

      <div className="my-3">
        <Button
          variant="contained"
          onClick={handleSignUp}
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
    </div>
  );
}