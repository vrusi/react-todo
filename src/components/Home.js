import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { useState } from "react";
import { database } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function Home({ user, db }) {
  const [newTodo, setNewTodo] = useState(null);

  const handleAddNewTodo = () => {
    setNewTodo({
      title: '',
      description: '',
      isCompleted: false,
      userId: user.uid,
    })
  };

  const handleCreateTodo = async () => {
    const coll = collection(database, "todos");
    console.log(coll);
    try {

      const docRef = await addDoc(collection(database, "todos"), {
        todo: newTodo
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCancelTodo = () => {
    setNewTodo(null);
  }

  return (
    <div className="container">
      <h2>Hello, {user.email}</h2>
      <div>
        You have no TODOs waiting for you.
      </div>

      <Button onClick={handleAddNewTodo} variant="text" className="w-100">
        <AddTaskOutlinedIcon className="mr-2" />
        Add a new TODO
      </Button>

      {newTodo && (
        <Card className="my-3">
          <CardContent>
            <TextField
              label="Title"
              placeholder="What's the TODO about?"
              value={newTodo.title}
              onChange={(event) => setNewTodo({ ...newTodo, title: event.target.value })}
              className="w-100 my-3"
            />

            <TextField
              label="Description"
              placeholder="Describe your TODO"
              value={newTodo.description}
              onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })}
              multiline
              minRows={4}
              className="w-100 my-3"
            />
          </CardContent>

          <CardActions>
            <Button onClick={handleCreateTodo}>Create</Button>
            <Button onClick={handleCancelTodo}>Cancel</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}