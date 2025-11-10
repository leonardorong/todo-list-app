const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = []; // stores all tasks

// Load tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem("tasks"));
if(savedTasks) {
  tasks = savedTasks; // restore array
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "180px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    editBtn.addEventListener("click", function() {
      // create an input so user can type new text
      const newInput = document.createElement("input");
      newInput.value = task; // current text
      li.textContent = ""; // clear li

      li.appendChild(newInput);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.style.marginLeft = "10px";
      li.appendChild(saveBtn);

      saveBtn.addEventListener("click", function() {
        const newValue = newInput.value;

        // update on screen
        li.textContent = newValue;

        // update in array
        const index = tasks.indexOf(task);
        tasks[index] = newValue;

        // save to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // rebuild delete and edit buttons again after saving
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
      });
    });

    // Add delete functionality
    deleteBtn.addEventListener("click", function() {
      taskList.removeChild(li);
      tasks = tasks.filter(t => t !== task); // remove from array
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  });
}

addBtn.addEventListener("click", function() {
  const task = taskInput.value;

  if(task !== "") {
    const li = document.createElement("li");
    li.textContent = task;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "180px"

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px"; // just for spacing

    editBtn.addEventListener("click", function() {
      // create an input so user can type new text
      const newInput = document.createElement("input");
      newInput.value = task; // current text
      li.textContent = ""; // clear li

      li.appendChild(newInput);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.style.marginLeft = "10px";
      li.appendChild(saveBtn);

      saveBtn.addEventListener("click", function() {
        const newValue = newInput.value;

        // update on screen
        li.textContent = newValue;

        // update in array
        const index = tasks.indexOf(task);
        tasks[index] = newValue;

        // save to localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // rebuild delete and edit buttons again after saving
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
      });
    });

    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(li); // removes the <li> from <ul>
    });

    // Append delete button to li
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Add li to the task list
    taskList.appendChild(li);

    // Add task to array and save
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
  }
});