let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

//Empty Array To Stor Tasks
let arrayOfTasks = [];

if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
  showTasks();
}

// Add Task To Tasks Div
function addTask() {
  let task = {
    title: input.value,
    completed: false,
    id: Date.now(),
  };
  arrayOfTasks.push(task);
  input.value = "";
  showTasks();
}

//Add Tasks To Page
function showTasks() {
  tasks.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.classList.toggle("task");
    //Add Task Title
    let taskTitle = document.createElement("p");
    taskTitle.textContent = task.title;
    div.appendChild(taskTitle);
    //Creat Done & Delete Btns
    let btns = document.createElement("div");
    btns.className = "btns";
    //Done
    let done = document.createElement("span");
    done.className = "done";
    done.textContent = "Done";
    btns.appendChild(done);
    //Delete
    let del = document.createElement("span");
    del.className = "del";
    del.textContent = "Delete";
    btns.appendChild(del);
    div.appendChild(btns);

    div.setAttribute("data-id", task.id);

    if (task.completed) {
      div.className = "task done-tasks";
      done.textContent = "✓";
    }

    tasks.appendChild(div);
  });
  //Show Claer All btn
  if (tasks.innerHTML != "") {
    document.querySelector(".delet-all").style.display = "block";
  }else{
    // Remove Clear All btn
    document.querySelector(".delet-all").style.display = "none";

  }
  
  localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

submit.addEventListener("click", () => {
  if (input.value != "") {
    addTask();
  } else {
    input.focus();
  }
});
input.addEventListener("keyup", (e) => {
  if (input.value != "" && e.key == "Enter") {
    addTask();
  }
});

// Done & Delet btns
tasks.addEventListener("click", (e) => {
  if (e.target.className == "del") {
    deletTask(e.target.parentElement.parentElement.getAttribute("data-id"));
  }

  // Toggle Done Tasks
  if (e.target.value == "Done") {
    taskState(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.classList.toggle("done-tasks");
    e.target.value = "✓";
    showTasks();
  } else {
    taskState(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.classList.remove("done-tasks");
    showTasks();
  }
  window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
});

//Delete Task With Task Id
function deletTask(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

// Toggle Done Tasks With Task Id
function taskState(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

//Delet All Tasks
document.querySelector(".delet-all").onclick = () => {
  tasks.innerHTML = "";
  document.querySelector(".delet-all").style.display = "none";
  arrayOfTasks = [];
  localStorage.clear();
};
