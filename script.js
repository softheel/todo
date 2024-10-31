let div = document.getElementById('app');

let heading = document.createElement('h1');
heading.textContent = 'Создайте свой список задач';
heading.classList.add('text-center', 'display-3');
div.appendChild(heading);

let todoInput = document.createElement('input');
todoInput.type = 'text';
todoInput.id = 'new-todo';
todoInput.classList.add('form-control', 'my-4', 'text-center');
todoInput.placeholder = 'Введите новую задачу';
div.appendChild(todoInput);

let todoButton = document.createElement('button');
todoButton.id = 'add-todo';
todoButton.classList.add('btn', 'btn-outline-success', 'mb-5');
todoButton.textContent = 'Добавить';
div.appendChild(todoButton);

let todoList = document.createElement('ul');
todoList.id = 'todo-list';
todoList.classList.add('list-group');
div.appendChild(todoList);

let todos = [];

let clearAllButton = document.createElement('button');
clearAllButton.id = 'clear-all';
clearAllButton.classList.add('btn', 'btn-outline-danger', 'mt-3', 'd-none');
clearAllButton.textContent = 'Удалить все';
clearAllButton.addEventListener('click', clearAllTodos);
div.appendChild(clearAllButton);

todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        let todoText = todoInput.value.trim();
        if (todoText !== '') {
            todos.push({
                text: todoText,
                completed: false,
            });
            renderTodoList();
            todoInput.value = ''; // Очищаем поле ввода
        }
    }
});

todoButton.addEventListener('click', () => {
    let todoText = todoInput.value.trim();
    if (todoText !== '') {
        todos.push({
            text: todoText,
            completed: false,
        });
        renderTodoList();
        todoInput.value = '';
    }
});

function renderTodoList() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        // checkbox.classList.add('');
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodo(index));
        listItem.appendChild(checkbox);

        let todoText = document.createElement('span');
        todoText.textContent = todo.text;
        if (todo.completed) {
            todoText.classList.add('text-decoration-line-through');
            listItem.classList.add('bg-success-subtle');
        }
        listItem.appendChild(todoText);

        let removeButton = document.createElement('button');
        removeButton.classList.add('btn', 'btn-outline-danger');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => removeTodo(index));
        listItem.appendChild(removeButton);

        todoList.appendChild(listItem);
    });

    // Show/hide clear button based on task count
    if (todos.length > 0) {
        clearAllButton.classList.remove('d-none'); // Show the button
    } else {
        clearAllButton.classList.add('d-none'); // Hide the button
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodoList();
}

function removeTodo(index) {
    todos.splice(index, 1);
    renderTodoList();
}

function clearAllTodos() {
    todos = []; // Очищаем массив задач
    renderTodoList(); // Перерисовываем список
}