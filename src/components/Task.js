import { useState, useRef, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';

/* TODO: Using redux for update completed status to localStorage */

const Task = (props) => {
    const [onEdit, changeEditStatus] = useState(false);
    const [title, changeTitle] = useState(props.title);
    const [completed, changeStatus] = useState(props.completed);
    const editRef = useRef();

    useEffect(() => {
        if (onEdit) {
            editRef.current.focus();
        }
    }, [onEdit]);

    return (
        <div className={`task${completed ? ' completed' : ''}`}>
            <Checkbox checked={completed} onChange={() => changeStatus(!completed)} />

            <label className={onEdit ? 'hidden' : ''}
                onClick={() => {
                    changeEditStatus(!onEdit);
                }}>{title}</label>

            <input className={!onEdit ? 'hidden' : ''}
                type='text'
                ref={editRef}
                value={title}
                onChange={(e) => {
                    changeTitle(e.target.value);
                }} onBlur={() => {
                    title && changeEditStatus(!onEdit);
                }} onKeyDown={(e) => {
                    (e.key === 'Enter' && title) && editRef.current.blur();
                }} />
        </div>
    );
};

export default Task;
