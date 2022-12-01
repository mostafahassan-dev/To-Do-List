let input = document.querySelector(".input"),
  submit = document.querySelector(".add"),
  tasks = document.querySelector(".tasks"),
  //Empty Array To Stor Tasks
  arrayOfTasks = [];

// progress Variables
let progressBar = document.querySelector(".progress-bar"),
  progressValue = document.querySelector(".progress-value");
let startValue = 0,
  endValue = 0;
// Empty Array To Stor Done Tasks
let counter = [];
//Check On LosalStorage To Show Stored Data
if (localStorage.getItem("task") || localStorage.getItem("completed")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
  counter = JSON.parse(localStorage.getItem("completed"));
  showTasks();
  progress();
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
  //Call Progress Function To Update Progress While Adding Tasks
  progress();

  //Show Claer All btn
  if (tasks.innerHTML != "") {
    document.querySelector(".delet-all").style.display = "block";
  } else {
    // Remove Clear All btn
    document.querySelector(".delet-all").style.display = "none";
    localStorage.clear();
  }
  //Add Tasks To LocalStorage
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
  if (e.target.className === "del") {
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
  //window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
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

  startValue = 0;
  display();
  arrayOfTasks = [];
  localStorage.clear();
};

//Progress Functions
function display() {
  progressValue.textContent = `${startValue}%`;
  progressBar.style.background = `conic-gradient(
    #ff4800 ${startValue * 3.6}deg,
    #ff48001c ${startValue * 3.6}deg
    )`;
}

function progress() {
  counter = [];
  //Add Done Tasks To Counter
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].completed) {
      counter.push(arrayOfTasks[i]);
    }
  }
  //Display ProgressBar
  if (arrayOfTasks.length != "") {
    endValue = Math.round((100 * counter.length) / arrayOfTasks.length);
    startValue = endValue;
    display();
    //Add To LocalStorage
    localStorage.setItem("completed", JSON.stringify(counter));

  } else {
    //If All Tasks Was Deleted
    startValue = 0;
    display();
  }
}
