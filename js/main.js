// localStorage.setItem("oquvchi", "Otabek ");
// localStorage.setItem("talaba", "oxunjon ");
// localStorage.setItem("student", "jahongir");
// localStorage.removeItem("talaba");
// console.log(localStorage.getItem("talaba")); // null
// localStorage.clear();
// JSON --- javascript objejt noteytion

// localStorage.setItem("talaba", JSON.stringify(["Otabek"]));

// console.log(JSON.parse(localStorage.getItem("talaba")));

const taskForm = document.getElementById("task-form"),
  taskInput = document.getElementById("task"),
  btn = document.querySelector(".btn"),
  filter = document.getElementById("filter"),
  taskList = document.querySelector(".collection"),
  clearBtn = document.querySelector(".clear-tasks");

loadEventListeners();

function loadEventListeners() {
  taskForm.addEventListener("submit", addTask);
  taskList.addEventListener("dblclick", editTask);
  taskList.addEventListener("click", removeTask);
  filter.addEventListener("input", filterTask);
  clearBtn.addEventListener("click", clearTasks);
  taskList.addEventListener("click", drawList);

  document.addEventListener("DOMContentLoaded", getTasks); //! localStorage
}

function getTasks() {
  let tasks = readFromStorage(); //! localStorage
  tasks.forEach(function (task) {
    addTaskForList(task);
  });
}

function addTask(e) {
  e.preventDefault();
  let taskValue = taskInput.value.trim();
  if (taskValue != "") {
    let added = addTaskForList(taskValue);
    if (!added) aler("Error");
    else storeTaskToStorage(taskValue); //! localStorage
    taskInput.value = "";
  } else {
    alert("Write a task");
  }
}

function editTask(e) {
  // console.log(e.target);
  if (e.target.classList.contains("collection-item")) {
    taskInput.value = e.target.textContent;
    e.target.remove();
    taskInput.focus();
  }
}

function filterTask() {
  let filterText = filter.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (taskItem) {
    let taskText = taskItem.textContent.toLowerCase();

    if (taskText.indexOf(filterText) !== -1) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
}

function removeTask(e) {
  // console.log(e.target);
  if (e.target.classList.contains("fa-remove")) {
    //! effeck babling
    e.target.parentElement.parentElement.remove();
  }
}

function clearTasks(e) {
  e.preventDefault();
  document.querySelectorAll(".collection-item").forEach(function (taskItem) {
    taskItem.remove();
  });
}

function addTaskForList(taskValue) {
  try {
    let listItem = document.createElement("li");
    listItem.className = "collection-item";
    listItem.textContent = taskValue;

    let removeLinkHtml = `<a href="#" class="delete-item secondary-content"><i class="fa fa-remove"></i></a>`;
    listItem.insertAdjacentHTML("beforeend", removeLinkHtml);

    taskList.appendChild(listItem);

    return true;
  } catch (error) {
    return false;
  }
}

// ! localStorage
function readFromStorage() {
  if (localStorage.getItem("tasks")) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
}

function writeTaskToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function storeTaskToStorage(task) {
  let tasks = readFromStorage();

  tasks.push(task);

  writeTaskToStorage(tasks);
}

function drawList(e) {
  if (e.target.classList.contains("collection-item")) {
    e.target.classList.toggle("draw");
  } else {
  }
}
