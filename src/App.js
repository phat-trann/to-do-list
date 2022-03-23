import { useState, useRef } from 'react';
import { Button, TextField, Grid, Paper, Snackbar, Alert, Dialog, DialogContent } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from './redux/actions';

import Task from './components/Task';

import './styles/card.scss';

function App() {
  const [task, updateTask] = useState('');
  const [error, setError] = useState(false);
  const tasks = useSelector((tasks) => tasks);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const containerStyle = {
    maxWidth: '500px',
    minWidth: '380px',
    margin: '10px auto',
    padding: '20px 50px'
  };
  const addNewTask = () => {
    if (!task) {
      setError(true);
      inputRef.current.focus();
      return;
    };

    dispatch(
      addTodo({
        id: uuid(),
        title: task,
        isCompleted: false
      })
    );
    updateTask('');
    setError(false);
    inputRef.current.focus();
  }
  const handleClose = (_e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };
  const vertical = 'top';
  const horizontal = 'left';
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open
      </Button>
      <Dialog open={open} TransitionProps={{ onEntering: () => inputRef.current.focus() }} onClose={handleCloseDialog}>
        <DialogContent>
          <Grid>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Please input task name!
              </Alert>
            </Snackbar>
            <Paper elevation={0} className='App' style={containerStyle}>
              <Grid className='form' container style={{ marginBottom: '2rem' }}>
                <Grid item xs={8}>
                  <TextField id='outlined-basic'
                    label='Task'
                    variant='outlined'
                    size='small'
                    error={error}
                    value={task}
                    inputRef={inputRef}
                    onChange={(e) => updateTask(e.target.value)}
                    onKeyDown={(e) => {
                      (e.key === 'Enter') && addNewTask();
                    }} />
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={addNewTask} variant='contained'>Enter Task</Button>
                </Grid>
              </Grid>
              {
                tasks.map((task) => {
                  return (
                    <div className='task-element' key={task.id}>
                      <Task id={task.id} title={task.title} completed={task.isCompleted} />
                    </div>
                  )
                })
              }
            </Paper>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
