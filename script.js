const inputTodo = document.getElementById('input')
const todoList = document.getElementById('todoList')
const todos = []

const noTodos = () => {
    if (!todos.length) {
        todoList.innerHTML = `<h1 class="no-todos">Задач нет</h1>`
    }
}
noTodos()

addNewTodo()

function addBtn() {
    if (!inputTodo.value) return
    console.log(todos)
    todos.push(inputTodo.value)
    localStorage.setItem('TODO', JSON.stringify(todos))
    inputTodo.value = ''
    addNewTodo()
}

function addNewTodo() {
    todoList.innerHTML = ''
    const todos = JSON.parse(localStorage.getItem('TODO'))
    todos.map((item, i) => {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')
        todoItem.innerHTML = `
            <input type="text" 
                   readonly 
                   value="${item}" 
                   class="todo-item__input"
                   />
            <div class="todo-icons">
                <img src="./assets/icons/pencil-icon.svg"
                    alt="Изменить"
                    title="Изменить задачу"
                    class="change-todo"
                >
                <img src="./assets/icons/trash-icon.svg" 
                     alt="Удалить" 
                     title="Удалить задачу"
                     class="remove-todo"
                >
            </div>
        `
        todoItem.addEventListener('click', e => {
            e.target.classList.contains('remove-todo') && removeTodo(i)
            e.target.classList.contains('change-todo') && changeTodo(i)
        })
        todoList.append(todoItem)
    })
}

function removeTodo(i) {
    todos.splice(i, 1)
    localStorage.setItem('TODO', JSON.stringify(todos))
    addNewTodo()
}

function changeTodo(index) {
    const input = document.querySelector('.todo-item__input')
    input.focus()
    input.removeAttribute('readonly')
    input.selectionStart = input.value.length
    input.addEventListener('change', () => {
        todos[index] = input.value
        input.setAttribute('readonly', '')
        localStorage.setItem('TODO', JSON.stringify(todos))
        addNewTodo()
    })
}