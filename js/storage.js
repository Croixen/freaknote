import { makingCard, clrBtnpress } from './index.js';

// Initialize session storage if null
if (sessionStorage.getItem('task') === null) {
    sessionStorage.setItem('task', JSON.stringify([
        {
            'title': 'Oalah',
            'date': '2024/12/24',
            'status': 'Done'
        },
        {
            'title': 'Testing on Something',
            'date': '2024/12/24',
            'status': 'On Working'
        },
    ]));
}

//Helper to create an element that i need to use
function createElementWithClass(elementType, className, text = '') {
    const element = document.createElement(elementType);
    element.classList.add(className);
    element.innerText = text;
    return element;
}

//Well this is rendering services, what else do you expect
function renderTaskFromStorage(title, date, status) {
    const detail = taskDetail(title, date);
    const stats = taskStatus(status);
    const card = makingCard(detail, stats);

    const taskList = card.classList.contains('active-task') ? 'active' : 'done';
    document.getElementById(taskList).appendChild(card);

    const clearButton = stats.querySelector('.action-button');
    clearButton.addEventListener('click', () => {
        clrBtnpress(detail, stats);
    });
}

function taskDetail(title, date) {
    const taskTitle = createElementWithClass('span', 'task-title', title);
    const taskDate = createElementWithClass('span', 'date', date);

    const taskDetail = document.createElement('div');
    taskDetail.classList.add('task-detail');
    taskDetail.append(taskTitle, taskDate);

    return taskDetail;
}

function taskStatus(status) {
    const taskStats = document.createElement('div');
    const statusTitle = createElementWithClass('span', 'task-status', status);

    const clearButton = createElementWithClass('button', 'action-button');
    clearButton.textContent = status === 'On Working' ? 'Clear' : 'Delete';

    taskStats.append(statusTitle, clearButton);

    return taskStats;
}

window.addEventListener('DOMContentLoaded', () => {
    try {
        const tasks = JSON.parse(sessionStorage.getItem('task'));
        tasks.forEach(task => {
            renderTaskFromStorage(task.title, task.date, task.status);
        });
    } catch (error) {
        console.error('Error loading tasks from session storage:', error);
    }
});
