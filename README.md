# To-Do List

Простое приложение для управления задачами (To-Do List), разработанное на JavaScript, HTML и CSS. Это приложение позволяет добавлять, удалять и изменять статус задач.

[Посмотреть демонстрацию можно здесь](https://makarenkoooooo.github.io/to-do/)

## Функционал

- Добавление новых задач с приоритетом "high".
- Возможность отметить задачу как выполненную.
- Удаление задач из списка.
- Предварительно загруженные задачи отображаются при запуске.

## Структура кода

### Основные файлы

- `index.html`: HTML-файл для структуры страницы, содержащий форму для добавления задач и список задач.
- `style.css`: CSS-файл для стилизации приложения.
- `main.js`: JavaScript-файл, содержащий основную логику для управления задачами.

### Основные функции

1. **loadTasks()**  
   Загружает предварительно заданные задачи из массива `tasks` и отображает их на странице при запуске.

2. **addTask(taskName)**  
   Добавляет новую задачу в список. Проверяет, чтобы длина имени задачи была от 3 до 30 символов. Если условия не выполняются, выбрасывает ошибку.

3. **renderTask(task)**  
   Создает HTML-элементы для новой задачи и добавляет их в список. Добавляет слушатели событий для выполнения и удаления задачи.

4. **changeStatus(task, textElement)**  
   Изменяет статус задачи на "выполнено" или "в процессе" при нажатии на флажок задачи. Визуально выделяет выполненные задачи через CSS-класс.

5. **deleteTask(task, taskElement)**  
   Удаляет задачу из массива `tasks` и удаляет элемент задачи из DOM.

### Основные технологии

- **HTML** — структура страницы, содержит форму и список задач.
- **CSS** — стилизация, создающая визуально приятный интерфейс.
- **JavaScript** — логика приложения: управление задачами, добавление, удаление и изменение статуса.

### Взаимодействие с пользователем

- Кнопка `+` добавляет новую задачу в список при условии, что она соответствует требованиям длины имени.
- Нажатие на чекбокс рядом с задачей меняет её статус на "выполнено" или возвращает в состояние "в процессе".
- Кнопка `✕` удаляет задачу из списка и массива.

## Использование

1. **Добавление задачи**  
   Введите название задачи в поле ввода и нажмите кнопку `+`. Задача будет добавлена в список.

2. **Изменение статуса задачи**  
   Нажмите на чекбокс рядом с задачей, чтобы отметить её как выполненную или вернуть в состояние "в процессе".

3. **Удаление задачи**  
   Нажмите на кнопку `✕`, чтобы удалить задачу из списка.

## Пример кода

```javascript
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

// Функция для добавления новой задачи
function addTask(taskName) {
  if (taskName.length < 3 || taskName.length > 30) {
    throw new Error("Имя задачи должно быть от 3 до 30 символов");
  }

  const task = { name: taskName, status: "to-do", priority: "high" };
  tasks.push(task);
  renderTask(task);
}

// Функция для отображения задачи
function renderTask(task) {
  const newTask = document.createElement("li");
  newTask.classList.add("todo-item");

  newTask.innerHTML = `
    <input type="checkbox" class="checkbox" ${task.status === "done" ? "checked" : ""} />
    <span class="text ${task.status === "done" ? "done" : ""}">${task.name}</span>
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
