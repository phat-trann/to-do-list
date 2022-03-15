import { useState, useRef } from 'react';
import Task from './components/Task';
import { Button, TextField } from '@mui/material';

import './styles/card.scss';

function App() {
    const [index, updateIndex] = useState(parseInt(localStorage.getItem('nextIndex') ?? 0));
    const [task, updateTask] = useState('');
    const [tasks, updateTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) ?? []);
    const [error, setError] = useState(false);
    const inputRef = useRef();
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

    return (
        <div className='App'>
            <div className='form'>
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
                <Button onClick={addNewTask} variant='contained'>Enter Task</Button>
            </div>
            {
                tasks.map((task) => {
                    return (
                        <div className='task-element' key={task.id}>
                            <Task id={task.id} title={task.title} completed={task.isCompleted} />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default App;
