let input = document.querySelector('.input');
let addTask = document.querySelector('.add');
let tasks = document.querySelector('.tasks');
let deleteAll = document.querySelector('.delete-all');

let arrayTasks = [];

deleteAll.onclick = () => {
    tasks.innerHTML = '';
    window.localStorage.removeItem('tasks');
    arrayTasks = [];
}

console.log();
if (localStorage.getItem('tasks')) {

    JSON.parse(localStorage.getItem('tasks')).forEach(ele => {
        arrayTasks.push(ele);
        // console.log(ele);
    });

    addToPage(arrayTasks);
    addToLocalStorage(arrayTasks);
}

addTask.onclick = () => {
    event.preventDefault();
    if (input.value !== '') {
        addTasks(input.value);
        input.value = '';
    } else {
        console.log('No Value');
    }
};

tasks.addEventListener('click', e => {
    if (e.target.classList.contains('del')) {
        deleteTask(e.target.parentElement.getAttribute('data-id'));
    }
    if (e.target.classList.contains('task')) {
        changeActivate(e.target.getAttribute('data-id'));
        // e.target.classList.toggle('done');
    }
});

function addTasks(value) {
    const task = {
        id: Date.now(),
        title: value,
        activate: true,
    };

    arrayTasks.push(task);
    addToPage(arrayTasks);
    addToLocalStorage(arrayTasks);
}

function addToPage(values) {
    tasks.innerHTML = '';
    values.forEach(value => {

        let taskDiv = document.createElement('div');
        if (value.activate) {
            taskDiv.className = 'task';
        } else {
            taskDiv.className = 'task done';
        }
        taskDiv.appendChild(document.createTextNode(value.title));
        taskDiv.setAttribute('data-id', value.id);
        let del = document.createElement('span');
        del.className = 'del';
        del.appendChild(document.createTextNode('Delete'));

        taskDiv.appendChild(del);
        tasks.appendChild(taskDiv);
    });
}

function addToLocalStorage(values) {
    window.localStorage.setItem('tasks', JSON.stringify(values));
}

function deleteTask(elementId) {
    arrayTasks = arrayTasks.filter(del => del.id != elementId);
    addToPage(arrayTasks);
    addToLocalStorage(arrayTasks);
}

function changeActivate(elementId) {
    for (let i = 0; i < arrayTasks.length; i++) {
        if (arrayTasks[i].id == elementId) {
            arrayTasks[i].activate == true ? arrayTasks[i].activate = false : arrayTasks[i].activate = true;
        }
    }
    addToPage(arrayTasks);
    addToLocalStorage(arrayTasks);
}