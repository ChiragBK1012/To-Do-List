"use strict";

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-all");
const stats = document.getElementById("task-stats");

function toggleAddButton() {
    addBtn.disabled = input.value.trim() === "";
}

toggleAddButton();

input.addEventListener("input", toggleAddButton);

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("check");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;

    checkbox.addEventListener("change", function () {
        taskContent.classList.toggle("completed");
        updateStats();
    });

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(taskContent);

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        taskItem.remove();
        updateStats();
    });

    taskActions.appendChild(deleteBtn);

    taskItem.appendChild(taskLeft);
    taskItem.appendChild(taskActions);

    list.appendChild(taskItem);
    input.value = "";
    input.focus();
    toggleAddButton();
    updateStats();
}

function updateStats() {
    const total = list.querySelectorAll("li").length;
    const completed = list.querySelectorAll(".completed").length;

    stats.textContent = `${completed} Completed / ${total} Total`;
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearBtn.addEventListener("click", function () {
    list.innerHTML = "";
    updateStats();
    input.focus();
    toggleAddButton();
});
