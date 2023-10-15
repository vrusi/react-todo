import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';

export default function AppBar({ user, onLogout }) {
  const location = useLocation();
  const isNotLoginPath = location.pathname !== '/login';

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h6" component="div">
        <Link to="/" style={{ textDecoration: 'none' }}>
          Todu
        </Link>
      </Typography>

      {isNotLoginPath && (
        user ? (
          <Button onClick={() => onLogout()}>
            Logout
          </Button>
        ) : (
          <Button>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Login
            </Link>
          </Button>
        )
      )}
    </Toolbar>
  );
}