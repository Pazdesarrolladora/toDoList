import React, { useState } from "react";
import {
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        text: inputValue,
        isActive: true,
        completed: false,
        date: new Date(),
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}
    >
      <Grid
        container
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          border: "2px solid white",
          borderRadius: "15px",
          maxWidth: "40%",
          margin: "0 auto",
          padding: "50px",
        }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <ThemeProvider theme={theme}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Lista de Tareas
            </Typography>
          </Grid>
        </ThemeProvider>
        <Grid item>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <TextField
                label="Add Task"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addTask();
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <List>
                {tasks.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No hay tareas, añadir tareas" />
                  </ListItem>
                ) : (
                  tasks.map((task, index) => (
                    <ListItem
                      key={index}
                      style={{
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                    >
                      <ListItemText
                        primary={task.text}
                        secondary={task.date.toDateString()}
                      />
                      {task.isActive && (
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => toggleComplete(index)}>
                            <TaskAltIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              editTask(index, prompt("Edit Task", task.text))
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteTask(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  ))
                )}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
