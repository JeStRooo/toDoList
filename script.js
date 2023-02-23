const inputTodo = document.getElementById('input')
const todoList = document.getElementById('todoList')
const inputError = document.querySelector('.new-todo__input__error')
const todos = []

function noTodos() {
    const todos = JSON.parse(localStorage.getItem('TODO'))
    if (!todos.length) {
        todoList.innerHTML = `<h1 class="no-todos">Задач нет</h1>`
    } else {
        addNewTodo()
    }
}
noTodos()


function addBtn() {
    if (!inputTodo.value) {
        inputError.innerHTML = `<div>Поле не должно быть пустым</div>`
        return
    } else {
        inputError.innerHTML = ``
    }
    console.log(todos)
    todos.push(inputTodo.value)
    localStorage.setItem('TODO', JSON.stringify(todos))
    inputTodo.value = ''
    addNewTodo()
}

function addNewTodo() {
    todoList.innerHTML = ''
    const todos = JSON.parse(localStorage.getItem('TODO'))
    todos.map((todo, i) => {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')
        todoItem.innerHTML = `
            <input type="text" 
                   readonly 
                   value="${todo}" 
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
            e.target.classList.contains('change-todo') && changeTodo(e.currentTarget, i)
        })
        todoList.append(todoItem)
    })
}

function removeTodo(i) {
    todos.splice(i, 1)
    localStorage.setItem('TODO', JSON.stringify(todos))
    noTodos()
}

function changeTodo(el, i) {
    console.log(el)
    const input = el.querySelector('.todo-item__input')
    input.focus()
    input.removeAttribute('readonly')
    input.selectionStart = input.value.length
    input.addEventListener('change', () => {
        todos[i] = input.value
        input.setAttribute('readonly', '')
        localStorage.setItem('TODO', JSON.stringify(todos))
        addNewTodo()
    })
}