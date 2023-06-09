//Array contenedor de tareas
const tareas = JSON.parse(localStorage.getItem('tareas')) || []

//contenedor de acordeon
let asignarTarea = document.getElementById('contenedor-acordeon')



// Funcion crear card de tareas

//Se pasa como parametro el array tareas y se crea un forEach para llamar la funcion crearAcordeonTarea de manera global y asi  se este renderizando lo que hay en el array tareas constantemente

const crearAcordeonTarea = (tareas) =>{
    
    asignarTarea.innerHTML = ""
    tareas.forEach((task) => {
        let collapseId = `collapse-${task.id}`
        let div = document.createElement('div');
        let acordeonContent = `
        <div class="row">
            <div class="col" id="asignarTarea-${task.id}">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item mb-4">
                        <h2 class="accordion-header ">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                            ${task.taskName}
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample-${task.id}">
                            <div class="accordion-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <img src="../assets/logos/members.svg" alt="" class="mt-3 me-5">
                                    <!-- Button trigger modal -->
                                    <button type="button" class="btn-edit ms-5"  d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal-${task.id}" id="edit">
                                        <img src="../assets/logos/editar.svg" alt="">
                                    </button>
                                    <!-- Modal -->
                                    <div class="modal fade mt-5" id="exampleModal-${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel-edit" aria-hidden="true">
                                        <div class="modal-dialog modal-pers">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel-edit">Editar Tarea</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="container">
                                                        <div class="row">
                                                            <div class="col">
                                                                <input type="text" placeholder="${task.taskName}" class="nombre-tarea mb-3" id="title-task-edit-${task.id}">
                                                            </div>
                                                        </div>
                                                        <div class="row d-flex justify-content-between ">
                                                            <div class="col">
                                                                <div class="row ">
                                                                    <div class="col pe-0">
                                                                        <div class="form-group">
                                                                            <label for="datepicker" class="label-date ">Fecha de inicio</label>
                                                                            <input type="text" id="datepicker-start-edit-${task.id}" class="form-control fecha " placeholder="${task.startDate}">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-5 me-4 ps-0">
                                                                        <div class="form-group">
                                                                            <label for="datepicker" class="label-date ">Fecha de fin</label>
                                                                            <input type="text" id="datepicker-end-edit-${task.id}" class="form-control fecha me-2" placeholder="${task.endDate}">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row mt-4">
                                                                    <div class="col">
                                                                        <h6 class="d-proyecto"> <img src="../assets/logos/d-proyecto.svg" alt="" class="me-2"> Descripción del proyecto</h6>
                                                                        <div class="textarea">
                                                                            <textarea class="descripcion" placeholder="${task.description}" id="floatingTextarea2-edit-${task.id}" style="height: 210px"></textarea>
                                                                        </div>
                                                                    </div>    
                                                                </div>
                                                            </div>
                                                            <div class="col-3 side-menu ">
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="etiquetas-edit-${task.id}"><img src="../assets/logos/etiquetas.svg" alt="" class="ms-2 me-3"> Etiquetas</button>
                                                                </div>
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="fechas-edit-${task.id}"><img src="../assets/logos/fechas.svg" alt="" class="ms-2 me-3"> Fechas</button>
                                                                </div>
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="adjuntos-edit-${task.id}"><img src="../assets/logos/adjuntos.svg" alt="" class="ms-2 me-3"> Adjuntos</button>
                                                                </div>
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="delete-edit-${task.id}" data-bs-dismiss="modal"><img src="../assets/logos/delete.svg" alt="" class="ms-2 me-3"> Eliminar</button>
                                                                </div>
                                                                <div class="row">
                                                                    <p class="mt-4 p-status ps-0">Status</p>
                                                                </div>
                                                                <div class="row ">
                                                                    <div class="form-check porAsignar d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="porAsignar-edit-${task.id}" disabled>
                                                                        <label class="form-check-label " for="flexRadioDefault1">
                                                                            Por asignar
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check en-curso d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="enCurso-edit-${task.id}" >
                                                                        <label class="form-check-label " for="flexRadioDefault1">
                                                                            En curso
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check terminadas d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="terminadas-edit-${task.id}">
                                                                        <label class="form-check-label " for="flexRadioDefault2">
                                                                            Terminadas
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check bloqueadas d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="bloqueadas-edit-${task.id}">
                                                                        <label class="form-check-label " for="flexRadioDefault2">
                                                                            Bloqueadas
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn cancelar" data-bs-dismiss="modal">Cancelar</button>
                                                    <button type="button" class="btn guardar" id="edit-${task.id}" data-bs-dismiss="modal">Guardar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h5 class="mt-3 n-tarea-card">${task.description}</h5>
                                <div>
                                    <p class ="owner"><strong>Owner:</strong> ${task.taskOwner}</p>
                                </div>
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
        
        div.innerHTML = acordeonContent
        asignarTarea.appendChild(div)


        let buttonEdit = document.getElementById(`edit-${task.id}`);
        if (buttonEdit) {
        buttonEdit.addEventListener('click', () => {editarTarea(task.id)});
        }

        let buttonDelete = document.getElementById(`delete-edit-${task.id}`)
        
        if(buttonDelete){
            buttonDelete.addEventListener('click', ()=>{eliminar(task.id)})
        }
    


    
    })
}

//Se llama a la funcion crearAcordeonTarea de manera global para que se renderice constantemente

crearAcordeonTarea(tareas);


const editarTarea = (id) => {

    let taskNameEdit = document.getElementById(`title-task-edit-${id}`).value;
    let startDateEdit = new Date(document.getElementById(`datepicker-start-edit-${id}`).value).toLocaleDateString();
    let endDateEdit = new Date(document.getElementById(`datepicker-end-edit-${id}`).value).toLocaleDateString();
    let descriptionEdit = document.getElementById(`floatingTextarea2-edit-${id}`).value;
 
    
    const tareaEncontrada = tareas.find(tarea => tarea.id === id );

    if (tareaEncontrada) {
        const originalId = tareaEncontrada.id; // Almacenar el ID original de la tarea

        if (taskNameEdit !== '') {
            tareaEncontrada.taskName = taskNameEdit;
        }
        if (startDateEdit !== '') {
            tareaEncontrada.startDate = startDateEdit;
        }
        if (endDateEdit !== '') {
            tareaEncontrada.endDate = endDateEdit;
        }
        if (descriptionEdit !== '') {
            tareaEncontrada.description = descriptionEdit;
        }

        tareaEncontrada.id = originalId; // Asignar el ID original a la tarea editada
    }

    //Checkbox status
    let enCursoEditCheckbox = document.getElementById(`enCurso-edit-${id}`);
    let terminadasEditCheckbox = document.getElementById(`terminadas-edit-${id}`);
    let bloqueadasEditCheckbox = document.getElementById(`bloqueadas-edit-${id}`);
    

    enCursoEditCheckbox.addEventListener('change', statusFunctionEnCurso);
    terminadasEditCheckbox.addEventListener('change', statusFunctionTerminadas);
    bloqueadasEditCheckbox.addEventListener('change', statusFunctionBloqueadas);

    if (enCursoEditCheckbox.checked) {
        const index = tareas.findIndex(tarea => tarea.id === id);
        const originalId = tareaEncontrada.id;
        if (index != -1) {
            tareas.splice(index, 1);
        }
        tareaEncontrada.id = originalId;
        tareasEnCurso.push(tareaEncontrada);
        localStorage.setItem('tareasEnCurso', JSON.stringify(tareasEnCurso));
        crearAcordeonTareaEnCurso(tareasEnCurso);
    } 
    if (terminadasEditCheckbox.checked) {
        const index = tareas.findIndex(tarea => tarea.id === id);
        const originalId = tareaEncontrada.id;
        if (index != -1) {
            tareas.splice(index, 1);
        }
        tareaEncontrada.id = originalId;
        tareasTerminadas.push(tareaEncontrada);
        localStorage.setItem('tareasTerminadas', JSON.stringify(tareasTerminadas));
        crearAcordeonTareaTerminadas(tareasTerminadas);
    }
    if (bloqueadasEditCheckbox.checked) {
        const index = tareas.findIndex(tarea => tarea.id === id);
        const originalId = tareaEncontrada.id;
        if (index != -1) {
            tareas.splice(index, 1);
        }
        tareaEncontrada.id = originalId;
        tareasBloqueadas.push(tareaEncontrada);
        localStorage.setItem('tareasBloqueadas', JSON.stringify(tareasBloqueadas));
        crearAcordeonTareaBloqueadas(tareasBloqueadas);
    }


    localStorage.setItem('tareas', JSON.stringify(tareas));
    crearAcordeonTarea(tareas);

}

//Funcion borrar tarea por asignar

const eliminar = (id) => {

    const index = tareas.findIndex(tarea => tarea.id === id);

    if(index != -1){
        tareas.splice(index,1)
    }

    //se actualiza el almacenamiento local
    localStorage.setItem('tareas', JSON.stringify(tareas)); // Actualizar almacenamiento local

    //se llama a la función para volver a renderizar el acordeón con las tareas actualizadas.
    crearAcordeonTarea(tareas);

}

// Funcion para crear status de tareas por Asignar

const statusFunctionPorAsignar = function() {
    if (this.checked) {
        crearAcordeonTarea(tareas); 
    }
};
