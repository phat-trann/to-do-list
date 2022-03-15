const importData = () => {
    if (!window.data) {
        window.data = require('../sample/data.json');
    }
}

const generateID = () => {
    if (window.data && window.data.currentTaskID) {
        return window.data.currentTaskID += 1;
    }

    return 0;
}

const generateNewTask = (cardID) => {
    let newID = generateID();
    let newTask = {
        id: newID,
        title: 'New task',
        isCompleted: false
    }

    window.data.tasks.push(newTask);
    getCardData(cardID).tasks.push(newID);

    return newTask;
}

const removeItemByIndex = (cardID, arr, index) => {
    let newArr = arr.slice();

    newArr.splice(index, 1);
    getCardData(cardID).tasks.splice(index, 1);
    return newArr;
}

const getCardData = (id) => {
    let data = window.data.cards;

    return data.find(card => card.id === id);
}

const getTaskData = (id) => {
    let data = window.data.tasks;

    return data.find(task => task.id === id);
}

const getTasksByCardID = (cardID) => {
    return getCardData(cardID).tasks.map(id => getTaskData(id));
}

export {
    importData,
    generateNewTask,
    removeItemByIndex,
    getTaskData as getTasksData,
    getTasksByCardID
}
