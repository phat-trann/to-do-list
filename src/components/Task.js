import { useState } from 'react';

const Task = (props) => {
    const id = props.id;
    const [onEdit, changeEditStatus] = useState(false);
    const [title, changeTitle] = useState(props.title);
    const [completed, changeStatus] = useState(props.completed);

    return (
        <div className={`task${completed ? ' completed' : ''}`}>
            <input type='checkbox'
                id={id}
                checked={completed}
                onChange={() => {
                    changeStatus(!completed);
                }} />

            <label className={onEdit ? 'hidden' : ''}
                onClick={() => {
                    changeEditStatus(!onEdit);
                }}>{title}</label>

            <input className={!onEdit ? 'hidden' : ''}
                type='text'
                value={title}
                onChange={(e) => {
                    changeTitle(e.target.value);
                }} onBlur={() => {
                    title && changeEditStatus(!onEdit);
                }} />
        </div>
    );
};

export default Task;
