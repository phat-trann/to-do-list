export const addTodo = (data) => {
    return {
        type: 'addTodo',
        payload: data,
    };
};

export const updateTodo = (todoId) => {
    return {
        type: 'updateTodo',
        payload: todoId,
    };
};
