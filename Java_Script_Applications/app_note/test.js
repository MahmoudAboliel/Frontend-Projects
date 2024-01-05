let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let tasks = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete-all");

let arrayTasks = [];

if (localStorage.getItem('tasks')) {
    arrayTasks = JSON.parse(localStorage.getItem('tasks'));
}

getFromLocalStorage();

submit.onclick = () => {
    event.preventDefault();
    if (input.value !== '') {
        addValue(input.value);
        input.value = '';
    } else {
        console.log('No value!');
    }

};

tasks.addEventListener('click', (e) => {
    if (e.target.classList.contains('del')) {
        // delete from page
        e.target.parentElement.remove();
        // delete from local storage
        deleteTask(e.target.parentElement.getAttribute('data-id'));
    }

    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done');
        toggleActivate(e.target.getAttribute('data-id'));
    }
});

deleteAll.onclick = () => {
    tasks.innerHTML = '';
    localStorage.clear();
}

function addValue(input) {
    const task = {
        id: Date.now(),
        title: input,
        activate: true,
    };

    arrayTasks.push(task);
    
    addValueToTasks(arrayTasks);
    
    setToLocalStorage(arrayTasks);

    // console.log(arrayTasks);

}

function addValueToTasks(array) {
    tasks.innerHTML = '';
    array.forEach(value => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task';        
        if (value.activate === false) {
            taskDiv.className = 'task done';        
        }
        taskDiv.appendChild(document.createTextNode(value.title));
        taskDiv.setAttribute('data-id', value.id);

        let del = document.createElement('span');
        del.className = 'del';
        del.appendChild(document.createTextNode('delete'));

        taskDiv.appendChild(del);

        tasks.appendChild(taskDiv);
    });
}

function setToLocalStorage(array) {
    window.localStorage.setItem('tasks', JSON.stringify(array));
}

function getFromLocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data) {
        let tasks = JSON.parse(data);
        addValueToTasks(tasks);
    }
}

function deleteTask(taskId) {
    arrayTasks = arrayTasks.filter(task => task.id != taskId);
    setToLocalStorage(arrayTasks);
}

function toggleActivate(taskId) {
    for (let i = 0; i < arrayTasks.length; i++) {
        if (arrayTasks[i].id == taskId) {
            arrayTasks[i].activate == true ? arrayTasks[i].activate = false : arrayTasks[i].activate = true;
        }
    }
    setToLocalStorage(arrayTasks);
}