//Array contenedor de tareas bloqueadas

const tareasBloqueadas = JSON.parse(localStorage.getItem('tareasBloqueadas')) || [];

//contenedor de tareas bloqueadas

let contenedorBloqueadas = document.getElementById('contenedor-bloqueadas')



//Funcion que utiliza find para ubicar la tarea Bloqueadas a editar 

const editarTareaBloqueadas = (id) => {

    let taskNameEditBloqueadas = document.getElementById(`title-task-Bloqueadas-edit-${id}`).value;
    let startDateEditBloqueadas = new Date(document.getElementById(`datepicker-start-Bloqueadas-edit-${id}`).value).toLocaleDateString();
    let endDateEditBloqueadas = new Date(document.getElementById(`datepicker-end-Bloqueadas-edit-${id}`).value).toLocaleDateString();
    let descriptionEditBloqueadas = document.getElementById(`floatingTextarea2-Bloqueadas-edit-${id}`).value;

    //checkbox status
        let porAsignarBloqueadasEditCheckbox = document.getElementById(`porAsignar-Bloqueadas-edit-${id}`);
        let enCursoBloqueadasEditCheckbox = document.getElementById(`enCurso-Bloqueadas-edit-${id}`);
        let terminadasBloqueadasEditCheckbox = document.getElementById(`terminadas-Bloqueadas-edit-${id}`);

        enCursoBloqueadasEditCheckbox.addEventListener('change', statusFunctionEnCurso);
        terminadasBloqueadasEditCheckbox.addEventListener('change', statusFunctionTerminadas);
        porAsignarBloqueadasEditCheckbox.addEventListener('change', statusFunctionPorAsignar);

        

    const tareaEncontradaBloqueadas = tareasBloqueadas.find(tarea => tarea.id === id );

    if (tareaEncontradaBloqueadas){
        const originalIdbloqueadas = tareaEncontradaBloqueadas.id;
        
        if (taskNameEditBloqueadas !== ''){
            tareaEncontradaBloqueadas.taskName = taskNameEditBloqueadas;
        }
        if (startDateEditBloqueadas !== ''){    
            tareaEncontradaBloqueadas.startDate = startDateEditBloqueadas;
        }
        if (endDateEditBloqueadas !== ''){
            tareaEncontradaBloqueadas.endDate = endDateEditBloqueadas;
        }
        if (descriptionEditBloqueadas !== ''){
            tareaEncontradaBloqueadas.description = descriptionEditBloqueadas;
        }
        tareaEncontradaBloqueadas.id = originalIdbloqueadas;
    }

    if (enCursoBloqueadasEditCheckbox.checked){
        const index = tareasBloqueadas.findIndex(tarea => tarea.id === id);
        const originalIdbloqueadas = tareasBloqueadas[index].id;
        if (index != -1){
            tareasBloqueadas.splice(index,1)
        }
        tareaEncontradaBloqueadas.id = originalIdbloqueadas;
        tareasEnCurso.push(tareaEncontradaBloqueadas);
        localStorage.setItem('tareasEnCurso', JSON.stringify(tareasEnCurso));
        crearAcordeonTareaEnCurso(tareasEnCurso);
    }

    if (terminadasBloqueadasEditCheckbox.checked){
        const index = tareasBloqueadas.findIndex(tarea => tarea.id === id);
        const originalIdbloqueadas = tareasBloqueadas[index].id;
        if (index != -1){
            tareasBloqueadas.splice(index,1)
        }
        tareaEncontradaBloqueadas.id = originalIdbloqueadas;
        tareasTerminadas.push(tareaEncontradaBloqueadas);
        localStorage.setItem('tareasTerminadas', JSON.stringify(tareasTerminadas));
        crearAcordeonTareaTerminadas(tareasTerminadas);
    }

    if (porAsignarBloqueadasEditCheckbox.checked){
        const index = tareasBloqueadas.findIndex(tarea => tarea.id === id);
        const originalIdbloqueadas = tareasBloqueadas[index].id;
        if (index != -1){
            tareasBloqueadas.splice(index,1)
        }
        tareaEncontradaBloqueadas.id = originalIdbloqueadas;
        tareas.push(tareaEncontradaBloqueadas);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        crearAcordeonTarea(tareas);
    }






    localStorage.setItem('tareasBloqueadas', JSON.stringify(tareasBloqueadas));
    crearAcordeonTareaBloqueadas(tareasBloqueadas);


}

//Funcion borrar tarea Bloqueadas

const eliminarBloqueadas = (id) => {

    const index = tareasBloqueadas.findIndex(tarea => tarea.id === id);

    if(index != -1){
        tareasBloqueadas.splice(index,1)
    }

    //se actualiza el almacenamiento local
    localStorage.setItem('tareasBloqueadas', JSON.stringify(tareasBloqueadas)); // Actualizar almacenamiento local

    //se llama a la función para volver a renderizar el acordeón con las tareas actualizadas.
    crearAcordeonTareaBloqueadas(tareasBloqueadas);


}

// Funcion para crear status de tareas Bloqueadas

const statusFunctionBloqueadas = function() {
    if (this.checked) {
        crearAcordeonTareaBloqueadas(tareasBloqueadas); 
    }
};



//Acordeon tareas Bloqueadas

const crearAcordeonTareaBloqueadas = (tareasBloqueadas) => {
    contenedorBloqueadas.innerHTML = ""
    tareasBloqueadas.forEach((task) => {
    let collapseId = `collapse-${task.id}`
    let div = document.createElement('div');
    let acordeonContent = `
    <div class="row">
        <div class="col" id="contenedor-Bloqueadas-${task.id}">
            <div class="accordion" id="accordionExample-Bloqueadas">
                <div class="accordion-item mb-4">
                    <h2 class="accordion-header ">
                        <button class="accordion-button bloqueadasColor" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                        ${task.taskName}
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample-Bloqueadas-${task.id}">
                        <div class="accordion-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <img src="../assets/logos/members.svg" alt="" class="mt-3 me-5">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn-edit ms-5"  d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal-Bloqueadas-${task.id}" id="edit-Bloqueadas-modal-${task.id}">
                                    <img src="../assets/logos/editar.svg" alt="">
                                </button>
                                <!-- Modal -->
                                <div class="modal fade mt-5" id="exampleModal-Bloqueadas-${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel-edit-Bloqueadas" aria-hidden="true">
                                    <div class="modal-dialog modal-pers">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel-Bloqueadas-edit">Editar Tarea</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col">
                                                            <input type="text" placeholder="${task.taskName}" class="nombre-tarea mb-3" id="title-task-Bloqueadas-edit-${task.id}">
                                                        </div>
                                                    </div>
                                                    <div class="row d-flex justify-content-between ">
                                                        <div class="col">
                                                            <div class="row ">
                                                                <div class="col pe-0">
                                                                    <div class="form-group">
                                                                        <label for="datepicker" class="label-date ">Fecha de inicio</label>
                                                                        <input type="text" id="datepicker-start-Bloqueadas-edit-${task.id}" class="form-control fecha " placeholder="${task.startDate}">
                                                                    </div>
                                                                </div>
                                                                <div class="col-5 me-4 ps-0">
                                                                    <div class="form-group">
                                                                        <label for="datepicker" class="label-date ">Fecha de fin</label>
                                                                        <input type="text" id="datepicker-end-Bloqueadas-edit-${task.id}" class="form-control fecha me-2" placeholder="${task.endDate}">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-4">
                                                                <div class="col">
                                                                    <h6 class="d-proyecto"> <img src="../assets/logos/d-proyecto.svg" alt="" class="me-2"> Descripción del proyecto</h6>
                                                                    <div class="textarea">
                                                                        <textarea class="descripcion" placeholder="${task.description}" id="floatingTextarea2-Bloqueadas-edit-${task.id}" style="height: 210px"></textarea>
                                                                    </div>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                        <div class="col-3 side-menu ">
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-around" id="responsables-Bloqueadas-edit-${task.id}"><img src="../assets/logos/respomsables.svg" alt="" class=""> Responsables</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="etiquetas-Bloqueadas-edit-${task.id}"><img src="../assets/logos/etiquetas.svg" alt="" class="ms-2 me-3"> Etiquetas</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="fecha-Bloqueadass-edit-${task.id}"><img src="../assets/logos/fechas.svg" alt="" class="ms-2 me-3"> Fechas</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="adjuntos-Bloqueadas-edit-${task.id}"><img src="../assets/logos/adjuntos.svg" alt="" class="ms-2 me-3"> Adjuntos</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="delete-Bloqueadas-edit-${task.id}" data-bs-dismiss="modal"><img src="../assets/logos/delete.svg" alt="" class="ms-2 me-3"> Eliminar</button>
                                                            </div>
                                                            <div class="row">
                                                                <p class="mt-4 p-status ps-0">Status</p>
                                                            </div>
                                                            <div class="row ">
                                                                <div class="form-check porAsignar d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="porAsignar-Bloqueadas-edit-${task.id}" >
                                                                    <label class="form-check-label " for="flexRadioDefault1">
                                                                        Por asignar
                                                                    </label>
                                                                </div>
                                                                <div class="form-check en-curso d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="enCurso-Bloqueadas-edit-${task.id}" >
                                                                    <label class="form-check-label " for="flexRadioDefault1">
                                                                        En curso
                                                                    </label>
                                                                </div>
                                                                <div class="form-check terminadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input  margin me-2 ms-1 " type="radio" name="status" id="terminadas-Bloqueadas-edit-${task.id}">
                                                                    <label class="form-check-label " for="flexRadioDefault2">
                                                                        Terminadas
                                                                    </label>
                                                                </div>
                                                                <div class="form-check bloqueadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="bloqueadas-Bloqueadas-edit-${task.id}" disabled>
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
                                                <button type="button" class="btn guardar" id="edit-Bloqueadas-${task.id}" data-bs-dismiss="modal">Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    
    div.innerHTML = acordeonContent
    contenedorBloqueadas.appendChild(div)


    let buttonEditBloqueadas = document.getElementById(`edit-Bloqueadas-${task.id}`);
    if (buttonEditBloqueadas) {
        buttonEditBloqueadas.addEventListener('click', () => {
            editarTareaBloqueadas(task.id);
        });
    }
    

    let buttonDelete = document.getElementById(`delete-Bloqueadas-edit-${task.id}`)
    
    if(buttonDelete){
        buttonDelete.addEventListener('click', ()=>{eliminarBloqueadas(task.id)})
    }


})
};

////Se llama a la funcion crearAcordeonTareaBloqueadas de manera global para que se renderice constantemente
crearAcordeonTareaBloqueadas(tareasBloqueadas);



let bloqueadasCheckbox = document.getElementById('bloqueadas'); 

bloqueadasCheckbox.addEventListener('change', statusFunctionBloqueadas);




