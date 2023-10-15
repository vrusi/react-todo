import { Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { useState } from "react";

export default function Home({ user }) {
  const [newTask, setNewTask] = useState(null);
  
  const handleAddNewTask = () => {
    setNewTask({
      title: '',
      description: '',
      isCompleted: false,
      userId: user.uid,
    })
  };

  const handleCreateTask = () => {
    console.log('creating...');
    console.log(newTask);
  };

  const handleCancelTask = () => {
    setNewTask(null);
  }

  return (
    <div className="container">
      <h2>Hello, {user.email}</h2>
      <div>
        You have no tasks waiting for you.
      </div>

      <Button onClick={handleAddNewTask} variant="text" className="w-100">
        <AddTaskOutlinedIcon className="mr-2" />
        Add New Task
      </Button>

      {newTask && (
        <Card className="my-3">
          <CardContent>
            <TextField
              label="Title"
              placeholder="What's the task about?"
              value={newTask.title}
              onChange={(event) => setNewTask({ ...newTask, title: event.target.value })}
              className="w-100 my-3"
            />

            <TextField
              label="Description"
              placeholder="Describe your task"
              value={newTask.description}
              onChange={(event) => setNewTask({ ...newTask, description: event.target.value })}
              multiline
              minRows={4}
              className="w-100 my-3"
            />
          </CardContent>

          <CardActions>
            <Button onClick={handleCreateTask}>Create</Button>
            <Button onClick={handleCancelTask}>Cancel</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}