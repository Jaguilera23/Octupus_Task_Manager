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

let buttonSave = document.getElementById('guardar');

buttonSave.addEventListener('click', taskCreator);

let edit = document.getElementById('edit')



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



