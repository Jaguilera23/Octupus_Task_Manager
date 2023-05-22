//Clase para crear el objeto de cada tarea 
class Task{
    constructor(){
        this.taskName = document.getElementById('title-task').value;
        this.startDate = new Date(document.getElementById('datepicker-start').value).toLocaleDateString();
        this.endDate = new Date(document.getElementById('datepicker-end').value).toLocaleDateString();
        this.descripton = document.getElementById('floatingTextarea2').value;
        // this.taskOwner = .taskOwner; 
        // this.status = document.getElementById().value;
    }
}

// Array que almacena las tareas

const tareas = [];
let id = 1;

let taskCreator = () => {
    let task = new Task ();
    task.id = id;
    id++;
    tareas.push(task)
    document.getElementById('title-task').value='';
    document.getElementById('datepicker-start').value='';
    document.getElementById('datepicker-end').value='';
    document.getElementById('floatingTextarea2').value='';
}


let buttonSave = document.getElementById('guardar');

buttonSave.addEventListener('click', taskCreator);

console.log(tareas);

// Se usa la funcion para crear tareas ejemplo 

taskCreator({taskName:'Diseño de la pagina web',
startDate:'2023-01-01',
endDate: '2023-01-15',
descripton:'Diseña una landing page atractiva y moderna que refleje la identidad de tu marca y cumpla con los objetivos de tu sitio web',
taskOwner:'jose',
status:'finalizada'})

taskCreator({taskName:'Desarrollo del front-end',
startDate:'2023-01-16',
endDate: '2023-01-30',
descripton:'Codifica la estructura y el diseño de la landing page utilizando HTML, CSS',
taskOwner:'karla',
status:'en curso'})

taskCreator({taskName:'Integración de elementos interactivos',
startDate:'2023-02-02',
endDate: '2023-02-18',
descripton:'Agrega funcionalidades interactivas a la landing page, como formularios de contacto que capturan la información del usuario',
taskOwner:'greg',
status:'bloqueada'})

taskCreator({taskName:'Optimización para dispositivos móviles',
startDate:'2023-02-22',
endDate: '2023-03-10',
descripton:'Asegúrarse de que la landing page se vea y funcione correctamente en dispositivos móviles',
taskOwner:'jose',
status:'bloqueada'})



// Se aplica metodo filter para ubicar todas las tareas segun su status y forEach() para recorrer el nuevo arreglo y dar un mensaje por alert con la tarea correspondiente

let statusTarea = prompt(`Ingrese el status que desea buscar (en curso, bloqueada, finalizada)`)


let statusFiltro = tareas.filter(item => item.status === statusTarea);

statusFiltro.forEach(item =>{
    let mensaje = `
    taskName:${item.taskName},
    startDate:${item.startDate},
    endDate: ${item.endDate},
    descripton:${item.descripton},
    taskOwner:${item.taskOwner},
    status:${item.status},
    id:${item.id}
    `;
    alert(mensaje);
})

