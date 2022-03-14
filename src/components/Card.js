import React, { useState } from 'react';
import Task from './Task';

import '../styles/card.scss';

import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

const removeItemByIndex = (arr, element) => {
    let newArr = [];
    if (!(element.classList && element.classList.contains('remove'))) element = element.closest('.remove');
    let index = parseInt(element.dataset.id);

    if (!Number.isInteger(index)) return arr;

    arr.forEach((item, i) => {
        if (i !== index) {
            newArr.push(item);
        }
    });

    console.log(arr);
    console.log(newArr);

    return newArr;
}

const Card = (props) => {
    const id = props.id;
    let [tasks, updateTasks] = useState(props.tasks);
    let taskNextId = tasks.length;
    let [title] = useState(props.title);

    return (
        <div className={`card-element card-${id}`}>
            <div className='card-header'>
                <p>{title}</p>
                <div className='add icon' onClick={() => {
                    updateTasks(tasks.concat([{
                        id: taskNextId,
                        title: 'New task ' + taskNextId,
                        isCompleted: false
                    }]))
                    taskNextId++;
                }}>
                    <IoMdAddCircleOutline />
                </div>
            </div>
            <div className='tasks-container'>
                {
                    tasks.map((task, index) => {
                        return (
                            <div className='task-element' key={task.id}>
                                <div className='remove icon' data-id={index} onClick={(e) => { updateTasks(removeItemByIndex(tasks, e.target)) }}>
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
