import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { Button, Card, CardActions, CardContent, Grow, TextField } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from '../firebase';

export default function Home({ user }) {
  const [newTodo, setNewTodo] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userRef = doc(database, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const userTodos = userSnap.data().todos;
        setTodos(userTodos);

      } catch (error) {
        console.log(error);
      }
    }

    fetchTodos();
  }, [user]);

  const handleAddNewTodo = () => {
    if (!!newTodo) {
      cancelNewTodo();
    }

    setNewTodo({
      title: '',
      description: '',
      isCompleted: false,
    });
  };

  const handleCreateTodo = async () => {
    // get users collection, select item where uid === user.uid, get todos array, push newTodo to todos array, update todos array
    console.log(newTodo);
  };
  const cancelNewTodo = () => {
    setNewTodo(null);
  }

  const handleCancelNewTodo = () => {
    cancelNewTodo();
  }

  return (
    <div className="container">
      <h2>Hello, {user.email}</h2>

      {todos.length === 0 ? (
        <div>
          You have no TODOs waiting for you.
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <div key={todo.title}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>{todo.isCompleted ? 'Completed' : 'Not Completed'}</p>
            </div>
          ))}
        </div>
      )}

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
          </CardContent>

          <CardActions>
            <Button onClick={handleCreateTodo}>Create</Button>
            <Button onClick={handleCancelNewTodo}>Cancel</Button>
          </CardActions>
        </Card>
      </Grow>

    </div>
  );
}