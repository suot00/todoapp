//input 
var inputText = document.getElementsByClassName('textValue')[0]
// btn add
var addBtn = document.getElementsByClassName('btn-add')[0]

var filters = document.querySelectorAll(".filterTask span")

let localItems =JSON.parse(localStorage.getItem('localItem'))

filters.forEach(btn=>{
  btn.addEventListener("click", () =>{ 
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTaskList(btn.id)
  })
})


function showTaskList(filter){
  let taskItem='';
  let taskListShow=document.querySelector('.listItem')
  let localItems =JSON.parse(localStorage.getItem('localItem'))
  if(localItems ===null){
   taskList=[]
  } else{
   taskList=localItems
  }  
  taskList.forEach((data,id)=>{
    let isComplete = data.status === 'completed' ? 'checked' : '';
    if(filter == data.status || filter=="all"){
      taskItem+=`
      <ul class="taskItem">
          <li class="task">
              <label for="${id}" class="taskLabel">
                  <input onClick="updateStatus(this)" type="checkbox" class="taskIp" id="${id}">
                  <p class="nameTask ${isComplete}">${data.name}</p>
             </label>       
          <div class="menu-task">
              <button class="delete-task" onClick="deleteItem(${id})">Delete</button>
          </div>
          </li>
      </ul>
      `
    }
  
  });
  taskListShow.innerHTML = taskItem;
}
showTaskList("all")


// console.log(localItems)
addBtn.addEventListener('click', () =>{   
  // let userText= inputText.value.trim();
  if(inputText.value !=0 ){
    let localItems =JSON.parse(localStorage.getItem('localItem'))

    if(localItems ===null ){
     taskList=[]
    } else{
     
     taskList=localItems
    }  
    let taskInfo={name:inputText.value , status:'pending'}
    taskList.push(taskInfo)
    localStorage.setItem('localItem',JSON.stringify(taskList))
    inputText.value="";
  }
   showTaskList('all')
})



//delete item
function deleteItem(id){
  taskList.splice(id,1)
  localStorage.setItem('localItem',JSON.stringify(taskList))
  showTaskList()
}
//clear all task
function clearTask(){
  localStorage.clear()
  showTaskList()
}
//update Status
function updateStatus(choiceTask) {
  let nameTask= choiceTask.parentElement.lastElementChild;
  if(choiceTask.checked) {
     nameTask.classList.add('checked')
     taskList[choiceTask.id].status="completed";
  
  }else{
    nameTask.classList.remove('checked')
    taskList[choiceTask.id].status="pending";
  }
  localStorage.setItem('localItem',JSON.stringify(taskList))
}

