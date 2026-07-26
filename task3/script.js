const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#taskCounter");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addTask();
    }
});

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";

    checkbox.addEventListener("change", function(){

        if(checkbox.checked){
            li.classList.add("completed");
        }else{
            li.classList.remove("completed");
        }

        updateCounter();
        applyFilter();
    });

    deleteBtn.addEventListener("click", function(){
        li.remove();
        updateCounter();
    });

    updateCounter();
    applyFilter();
}

function updateCounter(){

    const tasks = document.querySelectorAll("#taskList li");

    let remaining = 0;

    tasks.forEach(function(task){

        if(!task.classList.contains("completed")){
            remaining++;
        }

    });

    counter.textContent = remaining + " tasks remaining";
}

filterButtons.forEach(function(button){

    button.addEventListener("click", function(){

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        applyFilter();

    });

});

function applyFilter(){

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(function(task){

        if(currentFilter === "all"){

            task.style.display = "flex";

        }

        else if(currentFilter === "active"){

            if(task.classList.contains("completed")){
                task.style.display = "none";
            }else{
                task.style.display = "flex";
            }

        }

        else if(currentFilter === "completed"){

            if(task.classList.contains("completed")){
                task.style.display = "flex";
            }else{
                task.style.display = "none";
            }

        }

    });

}