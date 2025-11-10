const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = []; // stores all tasks

addBtn.addEventListener("click", function() {
  const task = taskInput.value;

  if(task !== "") {
    const li = document.createElement("li");
    li.textContent = task;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px"; // just for spacing

    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(li); // removes the <li> from <ul>
    });

    // Append delete button to li
    li.appendChild(deleteBtn);

    // Add li to the task list
    taskList.appendChild(li);

    // Add task to array and save
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
  }
});

// Load tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if(savedTasks) {
  tasks = savedTasks; // restore array
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Add delete functionality
    deleteBtn.addEventListener("click", function() {
      taskList.removeChild(li);
      tasks = tasks.filter(t => t !== task); // remove from array
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  });
}

