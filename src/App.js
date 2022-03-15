import { useState, useRef } from 'react';
import Task from './components/Task';
import { IoMdAddCircleOutline } from 'react-icons/io';

import './styles/card.scss';

function App() {
    const [index, updateIndex] = useState(0);
    const [task, updateTask] = useState('');
    const [tasks, updateTasks] = useState([]);
    const inputRef = useRef();

    return (
        <div className='App'>
            <div className='form'>
                <input type='text' onChange={(e) => updateTask(e.target.value)} value={task} ref={inputRef}/>
                <div className='button icon' onClick={() => {
                    if (task) {
                        updateTasks((currentTasks) => [...currentTasks, {
                            id: index,
                            title: task,
                            isCompleted: false
                        }])
                        updateIndex(i => i + 1);
                        updateTask('');
                        inputRef.current.focus();
                    }
                }}>
                    <IoMdAddCircleOutline />
                </div>
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
