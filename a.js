const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
function getTodos() {
    fetch(apiUrl + '?_limit=5')
        .then(res => res.json())
        .then(data => {
            data.forEach((todo) => addTodoToDom(todo));
        })
}
function createTodo(e) {
    e.preventDefault();
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false,
    };
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json', 
        }
    })
        .then(res => res.json())
        .then(data => addTodoToDom(data));
    
}
function toggleCompleted(e) {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
    }
    updateTodo(e.target.id, e.target.classList.contains('done'));
}
function updateTodo(id, completed) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function addTodoToDom(todo) {
    const div = document.createElement('div');
    div.classList.add('todo');
    if (todo.completed) {
        div.classList.add('done');
    }
    div.setAttribute('id', todo.id);
    div.appendChild(document.createTextNode(todo.title));
    document.getElementById('todo-list').appendChild(div);
}
function deleteTodo(e) {
    if (e.target.classList.contains('todo')) {
        const id = e.target.id;
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => e.target.remove())
    }
}
function init() {
    document.addEventListener('DOMContentLoaded', getTodos);
    document.querySelector('#todo-form').addEventListener('submit', createTodo);
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
    document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo);
}
init();