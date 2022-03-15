import { useState } from 'react';
import Task from './Task';

import '../styles/card.scss';

import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

import { generateNewTask, removeItemByIndex } from '../helpers/toDoHelpers';

const Card = (props) => {
    const id = props.id;
    let [tasks, updateTasks] = useState(props.tasks);
    let [title] = useState(props.title);

    return (
        <div className={`card-element card-${id}`}>
            <div className='card-header'>
                <p>{title}</p>
                <div className='add icon' onClick={() => updateTasks(tasks.concat([generateNewTask()]))}>
                    <IoMdAddCircleOutline />
                </div>
            </div>
            <div className='tasks-container'>
                {
                    tasks.map((task, index) => {
                        return (
                            <div className='task-element' key={task.id}>
                                <div className='remove icon' onClick={() => updateTasks(removeItemByIndex(tasks, index))}>
                                    <IoMdRemoveCircleOutline />
                                </div>
                                <Task id={task.id} title={task.title} completed={task.isCompleted} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Card;
