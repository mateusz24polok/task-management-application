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

const deleteTask = (taskIndex) => {
    tasksArray.splice(taskIndex, 1);
    tasksRender();
}

const doneTask = (taskIndex) => {
    tasksArray[taskIndex].done = !tasksArray[taskIndex].done;
    tasksRender();
}

const tasksRender = () => {
    tasksListElement.innerHTML = "";
    tasksArray.forEach(taskObject => {
        const taskElementHtml = `
        <li class="tasksSection__listItem js-taskElement">
            <button class="tasksSection__listItemButton tasksSection__listItemButton--done js-taskDone"></button>
            <p class="tasksSection__listItemText" style="text-decoration:${taskObject.done ? "line-through" : ""} ">${taskObject.description}</p>
            <button class="tasksSection__listItemButton tasksSection__listItemButton--delete js-taskDelete">🗑</button>
        </li>`;
        tasksListElement.insertAdjacentHTML("beforeend", taskElementHtml);
    })

    const taskElementsArray = document.querySelectorAll(".js-taskElement");
    taskElementsArray.forEach((taskElement, taskIndex) => {
        const taskDeleteButton = taskElement.querySelector(".js-taskDelete");
        const taskDoneButton = taskElement.querySelector(".js-taskDone");
        taskDeleteButton.addEventListener("click", deleteTask.bind(null, taskIndex))
        taskDoneButton.addEventListener("click", doneTask.bind(null, taskIndex))
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