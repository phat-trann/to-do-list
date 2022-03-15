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

const generateNewTask = () => {
    let newTask = {
        id: generateID(),
        title: 'New task',
        isCompleted: false
    }

    window.data.tasks.push(newTask);

    return newTask;
}

const removeItemByIndex = (arr, index) => {
    let newArr = arr.slice();

    newArr.splice(index, 1);
    return newArr;
}

const getCardData = (id) => {
    let data = window.data.cards;

    return data.find(card => card.id === id);
}

const getTasksData = (id) => {
    let data = window.data.tasks;

    return data.find(task => task.id === id);
}

const getTasksByCardID = (cardID) => {
    let cardData = getCardData(cardID);
    let arr = [];

    cardData.tasks.forEach((task) => {
        arr = arr.concat(task['tasks-id']);
    });

    return arr.map(id => getTasksData(id));
}

export {
    importData,
    generateNewTask,
    removeItemByIndex,
    getTasksData,
    getTasksByCardID
}
