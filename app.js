let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");

        let taskText = document.createElement("span");
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        let completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.style.marginLeft = "10px";

        completeButton.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.background = "#dc2626";

        deleteButton.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };
        let editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.style.marginLeft = "10px";
editButton.style.background = "#2563eb";

editButton.onclick = function() {
    let newTaskName = prompt("Enter updated task:", task.name);

    if (newTaskName !== null && newTaskName.trim() !== "") {
        tasks[index].name = newTaskName.trim();
        saveTasks();
        displayTasks();
    }
};

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let newTask = {
        name: taskName,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    input.value = "";
}

displayTasks();
