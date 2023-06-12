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



//Funcion creador de tareas 


let id = 1;

const taskCreator = () => {

    let noTask = document.getElementById('no-task');
    let taskName = document.getElementById('title-task').value;
    let startDate = new Date(document.getElementById('datepicker-start').value).toLocaleDateString('es-ES');
    let endDate = new Date(document.getElementById('datepicker-end').value).toLocaleDateString('es-ES');
    let description = document.getElementById('floatingTextarea2').value;


    if (taskName !== '' && description !== ''){
        let task = new Task (taskName,startDate,endDate,description);
        task.id = id;
        id++;
        
        localStorage.setItem('tareas', JSON.stringify(tareas))
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

buttonSave.addEventListener('click', taskCreator);





























/* nota: 
1. Debo crear un evento para el boton editar para cuando se seleccione en curso elimine la tarea del array tareas y haga push en el array en curso.
2. Crear un condicional en el modal de editar, donde si los input estan vacios al darle editar se mantenga sus valores anteriores y no se cambien por vacios, este condicional es
    para evitar que si la edicion es solo del status se borren los datos de la tarea.    
3. Revisar por que al editar una tarea la proxima repite el mismo id     
    */