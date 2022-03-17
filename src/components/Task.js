import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../redux/actions';

import Checkbox from '@mui/material/Checkbox';

const Task = (props) => {
    const [onEdit, changeEditStatus] = useState(false);
    const title = props.title;
    const completed = props.completed;
    const editRef = useRef();
    const dispatch = useDispatch();
    const dispatchToDo = (title, completed) => {
        dispatch(
            updateTodo({
                id: props.id,
                title: title,
                isCompleted: completed
            })
        );
    };

    useEffect(() => {
        if (onEdit) {
            editRef.current.focus();
        }
    }, [onEdit]);

    return (
        <div className={`task${completed ? ' completed' : ''}`}>
            <Checkbox checked={completed} onChange={() => dispatchToDo(title, !completed)} />

            <label className={onEdit ? 'hidden' : ''} onClick={() => changeEditStatus(!onEdit)}>{title}</label>

            <input className={!onEdit ? 'hidden' : ''}
                type='text'
                ref={editRef}
                value={title}
                onChange={(e) => dispatchToDo(e.target.value, completed)}
                onBlur={() => title && changeEditStatus(!onEdit)}
                onKeyDown={(e) => (e.key === 'Enter' && title) && editRef.current.blur()}
            />
        </div>
    );
};

export default Task;
