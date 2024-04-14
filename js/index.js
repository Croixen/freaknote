//add task
function taskPart(){
     //get DOM from the text-box
     const task = document.getElementById('tambah-task-box')

    if(task.value.trim() == ''){
        throw "No Value"
    }

     //for task title
     const taskTitle = document.createElement('span')
     taskTitle.classList.add('task-title')
     taskTitle.innerText = task.value

     //for task date
     const taskDate = document.createElement('span')
     taskDate.classList.add('date')
     taskDate.innerText = new Date().toLocaleDateString()

     //making container for the task title and date
     const taskDetail = document.createElement('div')
     taskDetail.classList.add('task-detail')


     taskDetail.append(taskTitle, taskDate)

     task.value = ''

     return taskDetail
}

function taskStatus(){
    const taskStats = document.createElement('div')
    const status = document.createElement('span')
    status.classList.add('task-status')
    status.innerText = 'On Working'
    //clear Button
    const clearButton = document.createElement('button')
    clearButton.classList.add('action-button')
    clearButton.textContent = 'Clear'
    taskStats.append(status, clearButton)

    return taskStats
}

export function makingCard(detail, stats){
    const card = document.createElement('div')
    if(stats.querySelector('.task-status').innerText == 'On Working'){
        card.classList.add('active-task')
    }else if(stats.querySelector('.task-status').innerText == 'Done'){
        card.classList.add('off-task')
    }
    
    card.classList.add('card')
    card.append(detail, stats)
    return card
}

export function clrBtnpress(detail, stats){
    const doneTaskList = document.getElementById('done');
    const status = stats.querySelector('.task-status');
    const taskDate = detail.querySelector('.date');
    const clearButton = stats.querySelector('.action-button');

    // Check whether the card is exist or nott
    const card = detail.closest('.card');
    if (!card) {
        console.error('Card element is not found');
        return;
    }

    // Well, i dont know tbh, i just want 
    const activeTaskList = document.getElementById('active');
    if (!activeTaskList.contains(card)) {
        return;
    }

    // Update task status
    clearButton.textContent = 'Delete';
    status.innerText = "Done";
    taskDate.innerText = new Date().toLocaleDateString();

    // Move card to doneTaskList
    card.classList.remove('active-task');
    card.classList.add('off-task');
    activeTaskList.removeChild(card);
    doneTaskList.appendChild(card);

    // Add event listener to remove the card from doneTaskList
    clearButton.removeEventListener('click', removeCard);
    clearButton.addEventListener('click', removeCard);
}

function removeCard(event) {
    const cardToRemove = event.target.closest('.card');
    if (cardToRemove) {
        cardToRemove.remove();
    } else {
        console.error('Card element not found');
    }
}

function appendToSessionStorage(taskDetail, taskStats){
    let todos = JSON.parse(sessionStorage.getItem('task'))
    const newTask = {
        'title' : taskDetail.querySelector('.task-title').innerText,
        'date' : taskDetail.querySelector('.date').innerText,
        'status' : taskStats.querySelector('.task-status').innerText
    }
    todos.push(newTask)
    sessionStorage.setItem('task', JSON.stringify(todos))
}

const submit = document.getElementById("btn-submit")
submit.addEventListener('click', (e) => {
    try{
        const activeTaskList = document.getElementById('active')
        const taskDetail = taskPart()
        const taskStats = taskStatus()
        const card = makingCard(taskDetail, taskStats)
    
        //append to active task list
        appendToSessionStorage(taskDetail, taskStats)
        activeTaskList.appendChild(card)
        //making an event if the clear button is clicked

        const clearButton = taskStats.querySelector('.action-button');
        clearButton.addEventListener('click', (e) => {
            clrBtnpress(taskDetail, taskStats)
        })
    }catch (err){
        alert(err)
        return
    } 
    
})

