import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { Alert, Box, Button, Grid, Card, CardActions, CardContent, Checkbox, Grow, List, ListItem, ListItemButton, ListItemText, Modal, TextField, Typography } from "@mui/material";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from '../firebase';
import './Home.css';

export default function Home({ user }) {
  const [newTodo, setNewTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openDetailID, setOpenDetailID] = useState(null);

  useEffect(() => {
    const userRef = doc(database, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const userTodos = doc.data().todos;
      setTodos(userTodos);
    });

    return () => unsubscribe();

  }, []);


  const handleAddNewTodo = () => {
    if (!!newTodo) {
      cancelNewTodo();
      return;
    }

    setNewTodo({
      title: '',
      description: '',
      isCompleted: false,
      timestamp: Date.now(),
    });
  };

  const handleCreateTodo = async () => {
    if (!newTodo.title) {
      setErrorMessage('Title is required.');
      return;
    }

    const userRef = doc(database, 'users', user.uid);

    await updateDoc(userRef, {
      todos: [...todos, newTodo],
    });

    cancelNewTodo();
  };

  const cancelNewTodo = () => {
    setNewTodo(null);
  }

  const handleCancelNewTodo = () => {
    cancelNewTodo();
  }

  const handleToggleTodo = (todoTimestamp) => {
    return async () => {
      const userRef = doc(database, 'users', user.uid);

      const updatedTodos = todos.map((t) => {
        if (t.timestamp === todoTimestamp) {
          return {
            ...t,
            isCompleted: !t.isCompleted,
          }
        }

        return t;
      });

      await updateDoc(userRef, {
        todos: updatedTodos,
      });
    }
  }

  const handleOpenTodoDetail = (timestamp) => {
    return (event) => {
      // Check if the clicked element is not the checkbox
      if (event.target.tagName !== 'INPUT') {
        setOpenDetailID(timestamp);
      }
    }
  }

  const handleCloseTodoDetail = () => {
    setOpenDetailID(null);
  }

  const getTodoByID = (timestamp) => {
    return todos.find((todo) => todo.timestamp === timestamp);
  }

  const handleDeleteTodo = (timestamp) => {

  }

  return (
    <div className="container">
      <h2>Hello, {user.email}</h2>

      <Button onClick={handleAddNewTodo} variant="text" className="w-100 my-2">
        <AddTaskOutlinedIcon className="mr-2" />
        Add a new TODO
      </Button>

      <Grow
        in={!!newTodo}
        style={{ transformOrigin: '0 0 0' }}
      >
        <Card className="my-3">
          <CardContent>
            <TextField
              label="Title"
              required
              placeholder="What's the TODO about?"
              value={newTodo ? newTodo.title : ''}
              onChange={(event) => setNewTodo({ ...newTodo, title: event.target.value })}
              className="w-100 my-3"
              autoComplete="off"
            />

            <TextField
              label="Description"
              placeholder="Describe your TODO"
              value={newTodo ? newTodo.description : ''}
              onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })}
              multiline
              minRows={4}
              className="w-100 my-3"
              autoComplete="off"
            />

            {errorMessage && (
              <Alert severity="error" className="my-3">{errorMessage}</Alert>
            )}
          </CardContent>

          <CardActions>
            <Button onClick={handleCreateTodo}>Create</Button>
            <Button onClick={handleCancelNewTodo}>Cancel</Button>
          </CardActions>
        </Card>
      </Grow>

      <div className={!!newTodo ? 'transitioned-todo-list' : 'transitioned-todo-list todo-list'}>

        {todos.length === 0 ? (
          <div>
            You have no TODOs waiting for you.
          </div>
        ) : (
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.timestamp} onClick={handleOpenTodoDetail(todo.timestamp)}>
                <ListItemButton>
                  <ListItemText primary={todo.title} />
                  <Checkbox edge="end" checked={todo.isCompleted} onChange={handleToggleTodo(todo.timestamp)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </div>

      <Modal
        open={!!openDetailID}
        onClose={handleCloseTodoDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className='card-modal'>
          <CardContent>

            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {getTodoByID(openDetailID)?.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.secondary">
                  {getTodoByID(openDetailID)?.description}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Checkbox edge="end" checked={getTodoByID(openDetailID)?.isCompleted} onChange={handleToggleTodo(openDetailID)} />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button onClick={handleCloseTodoDetail}>Close</Button>
            <Button onClick={handleCloseTodoDetail}>Edit</Button>
            <Button onClick={handleDeleteTodo}>Delete</Button>
          </CardActions>
        </Card>

      </Modal>
    </div>
  );
}