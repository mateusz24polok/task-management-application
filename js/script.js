const tasksFormElement = document.querySelector(".js-form");
const taskInputElement = document.querySelector(".js-taskInput");
const addNewTaskButtonElement = document.querySelector(".js-addTaskButton");
const tasksSectionElement = document.querySelector(".js-tasksSection");
let tasksArray = [];
let isDoneTasksHidden = false;

const addNewTask = (taskText) => {
    if (taskText.trim()) {
        tasksArray = [...tasksArray,
        {
            description: taskText.trim(),
            done: false
        }];
    }
    if (!isDoneTasksHidden) {
        tasksSectionRender();
    } else if (isDoneTasksHidden) {
        hideDoneTasks();
    }
};

const removeTask = (taskIndex) => {
    tasksArray = [...tasksArray.slice(0, taskIndex), ...tasksArray.slice(taskIndex + 1)]
    tasksSectionRender();
};

const toggleTaskDone = (taskIndex) => {
    tasksArray[taskIndex].done = !tasksArray[taskIndex].done;
    tasksSectionRender();
};

const toggleAllTasksDone = () => {
    tasksArray.map((task) => {
        task.done = true;
    })
    if (!isDoneTasksHidden) {
        tasksListRender(tasksArray);
    } else if (isDoneTasksHidden) {
        hideDoneTasks();
    }
};

const hideDoneTasks = () => {
    isDoneTasksHidden = true;
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    hideDoneTasksButton.textContent = "Pokaż ukończone";
    const undoneTasks = tasksArray.filter(task => !task.done);
    tasksListRender(undoneTasks);
}

const showDoneTasks = () => {
    isDoneTasksHidden = false;
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    hideDoneTasksButton.textContent = "Ukryj ukończone";
    tasksListRender(tasksArray);
}

const handleHideDoneTasksButton = () => {
    if (!isDoneTasksHidden) {
        hideDoneTasks();
    } else {
        showDoneTasks();
    }
}

const bindTaskButtons = () => {
    const taskElementsArray = document.querySelectorAll(".js-taskElement");
    taskElementsArray.forEach((taskElement, taskIndex) => {
        const taskRemoveButton = taskElement.querySelector(".js-taskRemove");
        const taskDoneButton = taskElement.querySelector(".js-taskDone");
        taskRemoveButton.addEventListener("click", removeTask.bind(null, taskIndex));
        taskDoneButton.addEventListener("click", toggleTaskDone.bind(null, taskIndex));
    });
}

const tasksPanelRender = () => {
    if (tasksArray.length) {
        tasksSectionElement.innerHTML = `<h2 class="tasksSection__title">Tasks list</h2>
        <button class="tasksSection__button tasksSection__button--hide js-hideDoneTasks">Ukryj ukończone</button>
        <button class="tasksSection__button tasksSection__button--toggleDone js-toggleAllTasks">Ukończ wszystkie</button>
        <ul class="tasksSection__list js-tasksList"></ul>`;
    } else {
        tasksSectionElement.innerHTML = `<h2 class="tasksSection__title">Tasks list</h2>
        <ul class="tasksSection__list js-tasksList"></ul>`;
    };

    const toggleAllTasksDoneButton = document.querySelector(".js-toggleAllTasks");
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
    if (toggleAllTasksDoneButton) { toggleAllTasksDoneButton.addEventListener("click", toggleAllTasksDone); }
    if (hideDoneTasksButton) { hideDoneTasksButton.addEventListener("click", handleHideDoneTasksButton); }
}

const tasksListRender = (list) => {
    const tasksListElement = document.querySelector(".js-tasksList");
    tasksListElement.innerHTML = "";
    list.forEach(taskObject => {
        const taskElementHtml = `
        <li class="tasksSection__listItem js-taskElement">
            <button class="tasksSection__listItemButton tasksSection__listItemButton--done js-taskDone">${taskObject.done ? "✔" : ""}</button>
            <p class="tasksSection__listItemText" style="text-decoration:${taskObject.done ? "line-through" : ""} ">${taskObject.description}</p>
            <button class="tasksSection__listItemButton tasksSection__listItemButton--delete js-taskRemove">🗑</button>
        </li>`;
        tasksListElement.insertAdjacentHTML("beforeend", taskElementHtml);
    })

    bindTaskButtons();
}

const tasksSectionRender = () => {
    tasksPanelRender();
    tasksListRender(tasksArray);
}

const clearTaskInput = () => {
    taskInputElement.value = "";
    taskInputElement.focus();
}

const handleTasksFormSubmit = (event) => {
    event.preventDefault();
    addNewTask(taskInputElement.value);
    clearTaskInput();
}

tasksFormElement.addEventListener("submit", handleTasksFormSubmit);