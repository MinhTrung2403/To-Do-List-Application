var input = document.querySelector('input')
var button = document.querySelector('button')
var form = document.querySelector('form')
var task = document.querySelector('.task')
let todoList = document.querySelectorAll("li");
/*let tasklist = getTaskFromLocalStorage()

rendertasklist(tasklist)*/

form.addEventListener('submit', function(event){
    event.preventDefault();
    let val = input.value.trim()
    if(val){
        addTodoElement({
        text: val,
    })
    
    saveToDolist()
    }
    input.value= ' '
})


   

function addTodoElement(todo){
    var li = document.createElement('li')
    li.innerHTML = `
        <span>${todo.text}</span>
        <div class="buttons">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-xmark"></i>
        </div>
    `
    if(todo.status === 'task-completed'){
        li.setAttribute('class', 'task-completed')
    }
  

    li.querySelector('span').addEventListener('click', function(){
        li.classList.toggle('task-completed')
        saveToDolist()
    })

    li.querySelector('.fa-pen-to-square').addEventListener('click', function(){
       
     
        saveToDolist()
    })
  
    li.querySelector('.fa-xmark').addEventListener('click', function(){
        li.remove()
        saveToDolist()
    })
    
    
    task.appendChild(li)
}

// Start Local Storage
function saveToDolist(){
    let tasklist = document.querySelectorAll('li')
    let taskstorage = []
    tasklist.forEach(function(item){
        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')
        taskstorage.push({
            text,
            status
        })
    })

      
    localStorage.setItem('tasklist', JSON.stringify(taskstorage))
}

 function init(){
    let data = JSON.parse(localStorage.getItem('tasklist'))
    data.forEach(function(item){
        addTodoElement(item)
    })
 }
//  End Local Storage

 init()
 function editTask(id){
    let tasklist = getTaskFromLocalStorage()

    if(tasklist.length > 0){
        console.log(tasklist[id])
        task.value = tasklist[id].name
        button.setAttribute('id',id)
    }
 }

 function getTaskFromLocalStorage(){
    return localStorage.getItem('tasklist') ? JSON.parse(localStorage.getItem('tasklist')) : []
 }