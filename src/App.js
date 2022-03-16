import { useState, useRef } from 'react';
import Task from './components/Task';
import { Button, TextField, Grid, Paper, Snackbar, Alert } from '@mui/material';

import './styles/card.scss';

function App() {
    const [index, updateIndex] = useState(parseInt(localStorage.getItem('nextIndex') ?? 0));
    const [task, updateTask] = useState('');
    const [tasks, updateTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) ?? []);
    const [error, setError] = useState(false);
    const inputRef = useRef();
    const containerStyle = {
        maxWidth: '400px',
        margin: '10px auto',
        padding: '20px 50px'
    };
    const addNewTask = () => {
        if (!task) {
            setError(true);
            return;
        };

        updateTasks(currentTasks => {
            const newTasks = [...currentTasks, {
                id: index,
                title: task,
                isCompleted: false
            }];

            localStorage.setItem('tasks', JSON.stringify(newTasks));

            return newTasks;
        })
        updateIndex(index + 1);
        updateTask('');
        setError(false);
        inputRef.current.focus();
        localStorage.setItem('nextIndex', index + 2);
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    };
    const vertical = 'top';
    const horizontal = 'left';

    return (
        <Grid>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Please input task name!
                </Alert>
            </Snackbar>
            <Paper elevation={20} className='App' style={containerStyle}>
                <Grid className='form' container style={{ marginBottom: '20px' }}>
                    <Grid xs={8}>
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
                    <Grid xs={4}>
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
    );
}

export default App;
