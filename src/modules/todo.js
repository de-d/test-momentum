import { UI } from "./constants.js";
import data from "./../../task.json" assert { type: "json" };

const tasks = [];

const createTaskForm = (task) => {
    const form = document.createElement("form");
    form.classList.add("task");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.className = "input-checkbox";
    checkboxInput.checked = task.status === "done";
    checkboxInput.addEventListener("change", () => {
        if (checkboxInput.checked) {
            form.classList.add("completed");
            task.status = "done";
        } else {
            form.classList.remove("completed");
            task.status = "todo";
        }
    });

    const newInput = document.createElement("p");
    newInput.textContent = task.text;
    newInput.className = "text-task";

    const newButton = document.createElement("button");
    newButton.type = "button";
    newButton.className = "delete-task";
    newButton.classList.add("delete-task");

    form.appendChild(checkboxInput);
    form.appendChild(newInput);
    form.appendChild(newButton);

    UI.TODO_LIST.appendChild(form);

    newButton.addEventListener("click", () => {
        form.remove();
        removeTaskFromArray(task);
    });

    task.checkboxInput = checkboxInput;

    return form;
};

const removeTaskFromArray = (task) => {
    const index = tasks.findIndex((item) => item.text === task.text && item.priority === task.priority);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
};

let isDataLoaded = false;
export async function loadFormData() {
    try {
        if (!isDataLoaded) {
            data.forEach((item) => {
                const task = {
                    text: item.text,
                    status: item.status,
                };
                tasks.push(task);
                createTaskForm(task);
            });
            isDataLoaded = true;
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных из JSON:", error);
    }
}

UI.TODO_INPUT.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const inputValue = UI.TODO_INPUT.value;
        const task = {
            text: inputValue,
            status: "todo",
        };
        if (inputValue) {
            tasks.push(task);
            createTaskForm(task);
            UI.TODO_INPUT.value = "";
        } else {
            alert("Задача не может быть пустой");
        }
    }
});

UI.REMOVE_COMPLETED.addEventListener("click", () => {
    const completedTasks = tasks.filter((task) => task.status === "done" && task.checkboxInput.checked);
    completedTasks.forEach((task) => {
        const index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
    });
    UI.TODO_LIST.innerHTML = "";
    tasks.forEach((task) => {
        createTaskForm(task);
    });
});