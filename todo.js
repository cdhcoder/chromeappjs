const toDoForm = document.querySelector(".jsToDoForm"), 
    toDoInput = toDoForm.querySelector("input"), 
    toDoList = document.querySelector(".jsToDoList");

const TODOS_LS = 'toDos';

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDos(currentValue);
    toDoInput.value = "";
}

const toDos = [];

function paintToDos(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "×";
    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    
    toDos.push(toDoObj);
    saveToDos();
 
    delBtn.addEventListener('click', function handleDelete(event){
        toDoList.removeChild(li);
        
    });
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedTodos = JSON.parse(loadedToDos);
        console.log(parsedTodos);
        parsedTodos.forEach(function(toDo){
            paintToDos(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();