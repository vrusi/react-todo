import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function TaskeeAppBar({ user, onLogout }) {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Taskee
          </Link>
        </Typography>

        {user ? (
          <Button color="inherit" onClick={() => onLogout()}>
            Logout
          </Button>
        ) : (
          <Button color="inherit">
            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
              Login
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>

  );
}