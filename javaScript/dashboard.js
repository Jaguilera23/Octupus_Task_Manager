//Clase para crear el objeto de cada tarea 
class Task{
    constructor(taskName, startDate, endDate, description){
        this.taskName = taskName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        // this.taskOwner = .taskOwner; 
        // this.status = document.getElementById().value;
    }
}

// Array que almacena las tareas

const tareas = JSON.parse(localStorage.getItem('tareas')) || [];;
let id = 1;

let taskCreator = () => {
    let taskName = document.getElementById('title-task').value;
    let startDate = new Date(document.getElementById('datepicker-start').value).toLocaleDateString();
    let endDate = new Date(document.getElementById('datepicker-end').value).toLocaleDateString();
    let description = document.getElementById('floatingTextarea2').value;

    let task = new Task (taskName,startDate,endDate,description);
    task.id = id;
    id++;
    tareas.push(task)
    localStorage.setItem('tareas', JSON.stringify(tareas))
    document.getElementById('title-task').value='';
    document.getElementById('datepicker-start').value='';
    document.getElementById('datepicker-end').value='';
    document.getElementById('floatingTextarea2').value='';
    crearAcordeonTarea(task);
}


let buttonSave = document.getElementById('guardar');

buttonSave.addEventListener('click', taskCreator);


// Funcion crear card de tareas

let crearAcordeonTarea = (task) =>{
    let asignarTarea = document.getElementById('contenedor-acordeon')
    
    let collapseId = `collapse-${task.id}`

    let acordeonContent = `
    <div class="row">
        <div class="col" id="asignarTarea">
            <div class="accordion" id="accordionExample">
                <div class="accordion-item mb-4">
                    <h2 class="accordion-header ">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${task.id}" aria-expanded="true" aria-controls="collapse-${task.id}">
                        ${task.taskName}
                        </button>
                    </h2>
                    <div id="collapse-${task.id}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <img src="../assets/logos/members.svg" alt="" class="mt-3">
                                <button type="button" class="btn-edit"><img src="../assets/logos/editar.svg" alt=""></button>
                            </div>
                            <h5 class="mt-3 n-tarea-card">${task.description}</h5>
                            <div class="d-flex flex-row  justify-content-start">
                                <img src="../assets/logos/create-date.svg" alt="" class="me-2">
                                <div class="d-flex flex-row align-items-center mt-3">
                                    <p class="creation-date me-2">Creado: </p>
                                    <p class="p-date-start">${task.startDate}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row ">
                                <img src="../assets/logos/deadline.svg" alt="" class="me-2">
                                <div  class="d-flex flex-column justify-content-center align-content-center align-items-center">
                                    <p class="p-deadline mb-0 pt-3">DeadLine</p>
                                    <p class="p-date-end">${task.endDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    `;

    asignarTarea.innerHTML += acordeonContent;

}







// Se aplica metodo filter para ubicar todas las tareas segun su status y forEach() para recorrer el nuevo arreglo y dar un mensaje por alert con la tarea correspondiente

// let statusTarea = prompt(`Ingrese el status que desea buscar (en curso, bloqueada, finalizada)`)


// let statusFiltro = tareas.filter(item => item.status === statusTarea);

// statusFiltro.forEach(item =>{
//     let mensaje = `
//     taskName:${item.taskName},
//     startDate:${item.startDate},
//     endDate: ${item.endDate},
//     descripton:${item.descripton},
//     taskOwner:${item.taskOwner},
//     status:${item.status},
//     id:${item.id}
//     `;
//     alert(mensaje);
// })

