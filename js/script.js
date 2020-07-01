const tasksFormElement = document.querySelector(".js-form");
const taskInputElement = document.querySelector(".js-taskInput");
const addNewTaskButtonElement = document.querySelector(".js-addTaskButton");
const tasksListElement = document.querySelector(".js-tasksList");
const tasksArray = [];

const addNewTask = (taskText) => {
    if (taskText.trim()) {
        const taskObject = {
            description: taskText.trim(),
            done: false
        }
        tasksArray.push(taskObject);
    }
};

const tasksRender = () => {
    tasksListElement.innerHTML = "";
    tasksArray.forEach(taskObject => {
        const taskElementHtml = `
        <li class="tasksSection__listItem">
            <button class="tasksSection__listItemButton tasksSection__listItemButton--done"></button>
            <p class="tasksSection__listItemText">${taskObject.description}</p>
            <button class="tasksSection__listItemButton tasksSection__listItemButton--delete">🗑</button>
        </li>`;
        tasksListElement.insertAdjacentHTML("beforeend", taskElementHtml);
    })
}

const clearTaskInput = () => {
    taskInputElement.value = "";
    taskInputElement.focus();
}

const handleTasksFormElement = (event) => {
    event.preventDefault();
    addNewTask(taskInputElement.value);
    tasksRender();
    clearTaskInput();
}

tasksFormElement.addEventListener("submit", handleTasksFormElement);