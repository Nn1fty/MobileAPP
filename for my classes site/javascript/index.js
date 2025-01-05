// Function to add tasks to respective lists (urgent, due, upcoming)
function addTask(type) {
  let taskInput = document.getElementById(type + '-task');
  let taskValue = taskInput.value.trim();

  if (taskValue) {
      let list = document.getElementById(type + '-list');
      let newListItem = document.createElement('li');
      newListItem.innerHTML = `<input type="checkbox" onclick="checkTask(this)"> <label>${taskValue}</label>`;
      list.appendChild(newListItem);
      
      saveTasks();  // Save tasks to localStorage after adding a new one
      
      taskInput.value = ''; // Clear the input field
  }
}

// Function to mark a task as checked or unchecked
function checkTask(checkbox) {
  let listItem = checkbox.parentElement;
  if (checkbox.checked) {
      listItem.style.textDecoration = "line-through"; // Strike-through completed tasks
  } else {
      listItem.style.textDecoration = "none"; // Remove strike-through when unchecked
  }
  saveTasks();  // Save tasks after checking/unchecking a task
}

// Function to clear finished (checked) tasks from a list
function clearFinishedTasks(type) {
  let list = document.getElementById(type + '-list');
  let tasks = list.getElementsByTagName('li');
  
  for (let i = tasks.length - 1; i >= 0; i--) {
      let task = tasks[i];
      let checkbox = task.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
          list.removeChild(task); // Remove the task if it is checked
      }
  }
  
  saveTasks();  // Save tasks after clearing finished ones
}

// Function to save tasks in localStorage
function saveTasks() {
  let tasks = {
      urgent: getTasks('urgent'),
      due: getTasks('due'),
      upcoming: getTasks('upcoming')
  };
  localStorage.setItem('tasks', JSON.stringify(tasks));  // Save the tasks object to localStorage
}

// Function to get tasks from the list
function getTasks(type) {
  let list = document.getElementById(type + '-list');
  let tasks = [];
  let listItems = list.getElementsByTagName('li');
  for (let item of listItems) {
      let taskText = item.querySelector('label').innerText;
      let isChecked = item.querySelector('input[type="checkbox"]').checked;
      tasks.push({ taskText, isChecked });
  }
  return tasks;
}

// Function to load tasks from localStorage when the page is loaded
function loadTasks() {
  let savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
      for (let type in savedTasks) {
          let list = document.getElementById(type + '-list');
          savedTasks[type].forEach(task => {
              let newListItem = document.createElement('li');
              newListItem.innerHTML = `<input type="checkbox" ${task.isChecked ? 'checked' : ''} onclick="checkTask(this)"> <label>${task.taskText}</label>`;
              list.appendChild(newListItem);
              if (task.isChecked) {
                  newListItem.style.textDecoration = "line-through"; // Strike-through completed tasks
              }
          });
      }
  }
}

// Load tasks when the page is loaded
window.onload = loadTasks;