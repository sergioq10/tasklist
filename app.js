//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEvenListeners(); 
//load all even listeners
function loadEvenListeners (){

    //dom load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);

    //clear task even
    clearBtn.addEventListener('click', clearTask);

    //filter through the tasks
    filter.addEventListener('keyup', filterTasks);
}
//get tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
            // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    ///create text node and append to li
    li.appendChild(document.createTextNode(task)); 
    //create new linkn element
    const link = document.createElement('a');
    //add clss
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    })
}
//add task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task')
    }

    // create li element
    const li = document.createElement('li')
    //add class
    li.className = 'collection-item';
    ///create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new linkn element
    const link = document.createElement('a');
    //add clss
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    console.log(li);


    e.preventDefault(); 
}

//store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
}



//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //remove from ls 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}
}


function removeTaskFromLocalStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        if(taskItem.textContent === text){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}
//clear task
function clearTask(){
    //one way slower
    //taskList.innerHTML = '';
    if(confirm('Are you sure to remove all tasks?')){
    //next is a while loop to delete all of them
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild); 
    }
}
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();  
}

//filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase(); 
    //query selector returns node list
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
    
        } else {
            task.style.display = 'none';
        }
    }); 
}