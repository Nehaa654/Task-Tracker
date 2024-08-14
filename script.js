document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Local storage key
    const STORAGE_KEY = 'taskTrackerTasks';

    // Task array
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = createTaskListItem(task, index);
            taskList.appendChild(listItem);
        });
        saveTasks();
    }

    // Create a list item for a task
    function createTaskListItem(task, index) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const spanEl = document.createElement('span');
        const buttonsDiv = document.createElement('div');
        const editBtn = createButton('Edit', 'edit-btn', () => editTask(index));
        const deleteBtn = createButton('Delete', 'delete-btn', () => deleteTask(index));

        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));

        spanEl.textContent = task.text;
        if (task.completed) {
            spanEl.classList.add('completed');
        }

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(spanEl);
        li.appendChild(buttonsDiv);

        return li;
    }

    // Create a button element
    function createButton(text, className, onClickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.addEventListener('click', onClickHandler);
        return button;
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    // Add new task
    function addTask(event) {
        event.preventDefault();
        const newTaskText = taskInput.value.trim();
        if (newTaskText) {
            tasks.push({ text: newTaskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    // Edit task
    function editTask(index) {
        const currentTask = tasks[index];
        const newTaskText = prompt('Edit task:', currentTask.text);
        if (newTaskText !== null) {
            const trimmedTask = newTaskText.trim();
            if (trimmedTask && trimmedTask !== currentTask.text) {
                tasks[index].text = trimmedTask;
                renderTasks();
            }
        }
    }

    // Delete task
    function deleteTask(index) {
        const confirmDelete = confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            tasks.splice(index, 1);
            renderTasks();
        }
    }

    // Toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Event listeners
    taskForm.addEventListener('submit', addTask);

    // Initial render
    renderTasks();
});