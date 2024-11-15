const form = document.getElementById("form");
const addBtn = document.getElementById("addbnt");
const input = document.getElementById("taskInput");
const hiBlock = document.getElementById("highPriorityList");

const tasks = [
  { name: "Закончить проект", status: "to-do", priority: "high" },
  { name: "Сделать зарядку", status: "done", priority: "high" },
  { name: "Купить продукты", status: "to-do", priority: "high" },
];

function loadTasks() {
  tasks.forEach((task) => renderTask(task));
}

function addTask(taskName) {
  if (taskName.length < 3 || taskName.length > 30) {
    throw new Error("Имя задачи должно быть от 3 до 30 символов");
  }

  const task = { name: taskName, status: "to-do", priority: "high" };
  tasks.push(task);
  renderTask(task);
  console.log(tasks);
}

function renderTask(task) {
  const newTask = document.createElement("li");
  newTask.classList.add("todo-item");

  newTask.innerHTML = `
    <input type="checkbox" class="checkbox" ${
      task.status === "done" ? "checked" : ""
    } />
    <span class="text ${task.status === "done" ? "done" : ""}">${
    task.name
  }</span>
    <button class="delete">✕</button>
  `;

  hiBlock.appendChild(newTask);

  const checkbox = newTask.querySelector(".checkbox");
  const textElement = newTask.querySelector(".text");
  const deleteElement = newTask.querySelector(".delete");

  checkbox.addEventListener("change", function () {
    changeStatus(task, textElement);
  });

  deleteElement.addEventListener("click", function () {
    deleteTask(task, newTask);
  });
}

function changeStatus(task, textElement) {
  task.status = task.status === "to-do" ? "done" : "to-do";

  if (task.status === "done") {
    textElement.classList.add("done");
  } else {
    textElement.classList.remove("done");
  }
  console.log(`Статус задачи "${task.name}" изменен на: ${task.status}`);
}

function deleteTask(task, taskElement) {
  const index = tasks.indexOf(task);
  if (index > -1) {
    tasks.splice(index, 1);
    console.log(`Задача "${task.name}" удалена`);
    taskElement.remove();
  }
}

addBtn.addEventListener("click", function () {
  try {
    const task = input.value.trim();
    if (task) {
      addTask(task);
      input.value = "";
    }
  } catch (error) {
    alert(error.message);
  }
});

form.addEventListener("keydown", function (event) {
  try {
    if (event.key === "Enter") {
      event.preventDefault();
      const task = input.value.trim();
      if (task) {
        addTask(task);
        input.value = "";
      }
    }
  } catch (error) {
    alert(error.message);
  }
});

loadTasks();
