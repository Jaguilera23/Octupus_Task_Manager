

//Clase para crear el objeto de cada tarea 
class Task{
    constructor(taskName, startDate, endDate, description){
        this.taskName = taskName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.taskOwner = []; 
        // this.status = document.getElementById().value;
    }
}



//Funcion creador de tareas 


let id = 1;

const taskCreator = () => {

    let taskName = document.getElementById('title-task').value;
    let startDate = new Date(document.getElementById('datepicker-start').value).toLocaleDateString('es-ES');
    let endDate = new Date(document.getElementById('datepicker-end').value).toLocaleDateString('es-ES');
    let description = document.getElementById('floatingTextarea2').value;
    let taskOwner = responsableSeleccionado ? [responsableSeleccionado.nombre] : [];

    if (taskName !== '' && description !== ''){
        let task = new Task (taskName,startDate,endDate,description);
        task.taskOwner = taskOwner;
        task.id = id;
        id++;
        
        
        document.getElementById('title-task').value='';
        document.getElementById('datepicker-start').value='';
        document.getElementById('datepicker-end').value='';
        document.getElementById('floatingTextarea2').value='';
        

        if (enCursoCheckbox.checked) {
            tareasEnCurso.push(task);
            localStorage.setItem('tareasEnCurso', JSON.stringify(tareasEnCurso));
            crearAcordeonTareaEnCurso(tareasEnCurso);
        } else if(terminadasCheckbox.checked) {
            tareasTerminadas.push(task);
            localStorage.setItem('tareasTerminadas', JSON.stringify(tareasTerminadas));
            crearAcordeonTareaTerminadas(tareasTerminadas);
        }else if(bloqueadasCheckbox.checked) {
            tareasBloqueadas.push(task);
            localStorage.setItem('tareasBloqueadas', JSON.stringify(tareasBloqueadas));
            crearAcordeonTareaBloqueadas(tareasBloqueadas);
        }else {
            tareas.push(task);
            crearAcordeonTarea(tareas);
        }
        
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }else{
        Swal.fire({
            title:'Debe rellenar los campos para crear una tarea',

            width:'20%',
            customClass:{
                popup:'alert',
                title:'title-alert',
                confirmButton:'btn-alert',
            },
            imageUrl:'../assets/logos/icons8-error-48.png',
            confirmButtonColor:'#0C8BFD',
        })
        
        
        
    }

}


let buttonSave = document.getElementById('guardar');


//Fetch responsables

let listadoResponsables = document.getElementById('lista');
let contador = 1;
let responsableSeleccionado = null;

    const fetchResponsables = async () => {
    try{
        const response = await fetch("../javaScript/responsables.json");
        const data = await response.json();

        data.forEach(responsables => {       
            const btn= document.createElement('button');
        
        btn.classList.add('dropdown-item');
        btn.classList.add('btn-responsable');
        btn.innerHTML = `${responsables.nombre}`;
        btn.id = `responsable-${contador}`;
        
        listadoResponsables.append(btn); 

        btn.addEventListener('click', () => {

            responsableSeleccionado = responsables; // Almacenar el responsable seleccionado
        });
        

        
        contador ++;    
    });
    }catch(error){
        console.error('Ocurrio un error:',error);
        }
}

fetchResponsables();



buttonSave.addEventListener('click', taskCreator);
















