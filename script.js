const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(function (li) {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create a task
function createTask(taskText, completed = false) {

    const li = document.createElement("li");
    li.textContent = taskText;

    if (completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });
const editBtn = document.createElement("button");
editBtn.textContent = "Edit";

editBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    const newTask = prompt("Edit your task:", li.firstChild.textContent);

    if (newTask !== null && newTask.trim() !== "") {
        li.firstChild.textContent = newTask.trim();
        saveTasks();
    }

});


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        saveTasks();
    });

   li.appendChild(editBtn);
   li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

clearAllBtn.addEventListener("click", function () {

    const confirmDelete = confirm("Are you sure you want to delete all tasks?");

    if (confirmDelete) {
        taskList.innerHTML = "";
        saveTasks();
    }

});

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {
        createTask(task.text, task.completed);
    });
}

// Add new task
function addTask() {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    createTask(task);

    taskInput.value = "";

    saveTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});