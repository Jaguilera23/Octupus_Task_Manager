//Clase para crear el objeto de cada tarea 
class Task{
    constructor(info){
        this.taskName = info.taskName;
        this.startDate = info.startDate;
        this.endDate = info.endDate;
        this.descripton = info.descripton;
        this.taskOwner = info.taskOwner; 
        this.status = info.status;
    }
}

// Array que almacena las tareas

const tareas = [];
let id = 1;

let taskCreator = (info) => {
    let task = new Task (info);
    task.id = id;
    id++;
    tareas.push(task)
}

//Se usa la funcion para crear tareas ejemplo 

taskCreator({taskName:'Diseño de la pagina web',
startDate:'01/01/2023',
endDate: '15/01/2023',
descripton:'Diseña una landing page atractiva y moderna que refleje la identidad de tu marca y cumpla con los objetivos de tu sitio web',
taskOwner:'jose',
status:'finalizada'})

taskCreator({taskName:'Desarrollo del front-end',
startDate:'16/01/2023',
endDate: '30/01/2023',
descripton:'Codifica la estructura y el diseño de la landing page utilizando HTML, CSS',
taskOwner:'karla',
status:'en curso'})

taskCreator({taskName:'Integración de elementos interactivos',
startDate:'02/02/2023',
endDate: '18/02/2023',
descripton:'Agrega funcionalidades interactivas a la landing page, como formularios de contacto que capturan la información del usuario',
taskOwner:'greg',
status:'bloqueada'})

taskCreator({taskName:'Optimización para dispositivos móviles',
startDate:'22/02/2023',
endDate: '10/03/2023',
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