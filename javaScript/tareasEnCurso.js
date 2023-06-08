//Array contenedor de tareas En Curso

const tareasEnCurso = JSON.parse(localStorage.getItem('tareasEnCurso')) || [];


//contenedor en curso

let contenedorEnCurso = document.getElementById('contenedor-en-curso')


//Funcion que utiliza find para ubicar la tarea en curso a editar 

const editarTareaEnCurso = (id) => {

    let taskNameEditEnCurso = document.getElementById(`title-task-enCurso-edit-${id}`).value;
    let startDateEditEnCurso = new Date(document.getElementById(`datepicker-start-enCurso-edit-${id}`).value).toLocaleDateString();
    let endDateEditEnCurso = new Date(document.getElementById(`datepicker-end-enCurso-edit-${id}`).value).toLocaleDateString();
    let descriptionEditEnCurso = document.getElementById(`floatingTextarea2-enCurso-edit-${id}`).value;
    
    const tareaEncontradaEnCurso = tareasEnCurso.find(tarea => tarea.id === id );

    if (tareaEncontradaEnCurso){
        tareaEncontradaEnCurso.taskName = taskNameEditEnCurso ;
        tareaEncontradaEnCurso.startDate = startDateEditEnCurso;
        tareaEncontradaEnCurso.endDate = endDateEditEnCurso;
        tareaEncontradaEnCurso.description=descriptionEditEnCurso; 
    }

    localStorage.setItem('tareasEnCurso', JSON.stringify(tareasEnCurso));
    location.reload();


}

//Funcion borrar tarea en curso

const eliminarEnCurso = (id) => {

    const index = tareasEnCurso.findIndex(tarea => tarea.id === id);

    if(index != -1){
        tareasEnCurso.splice(index,1)
    }

    //se actualiza el almacenamiento local
    localStorage.setItem('tareasEnCurso', JSON.stringify(tareasEnCurso)); // Actualizar almacenamiento local

    //se llama a la función para volver a renderizar el acordeón con las tareas actualizadas.
    crearAcordeonTareaEnCurso(tareasEnCurso);

    //se refresca la pagina automaticamente
    location.reload()
}


// Funcion para crear status de tareas en curso

const statusFunctionEnCurso = function() {
    if (this.checked) {
        crearAcordeonTareaEnCurso(tareasEnCurso); 
    }
};


//Acordeon tareas en curso 

const crearAcordeonTareaEnCurso = (tareasEnCurso) => {
    contenedorEnCurso.innerHTML = ""
    tareasEnCurso.forEach((task) => {
    let collapseId = `collapse-${task.id}`
    let div = document.createElement('div');
    let acordeonContent = `
    <div class="row">
        <div class="col" id="contenedor-enCurso-${task.id}">
            <div class="accordion" id="accordionExample-enCurso">
                <div class="accordion-item mb-4">
                    <h2 class="accordion-header ">
                        <button class="accordion-button enCursoColor" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                        ${task.taskName}
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample-enCurso-${task.id}">
                        <div class="accordion-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <img src="../assets/logos/members.svg" alt="" class="mt-3 me-5">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn-edit ms-5"  d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal-enCurso-${task.id}" id="edit-enCurso-modal-${task.id}">
                                    <img src="../assets/logos/editar.svg" alt="">
                                </button>
                                <!-- Modal -->
                                <div class="modal fade mt-5" id="exampleModal-enCurso-${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel-edit-enCurso" aria-hidden="true">
                                    <div class="modal-dialog modal-pers">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel-enCurso-edit">Editar Tarea</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col">
                                                            <input type="text" placeholder="${task.taskName}" class="nombre-tarea mb-3" id="title-task-enCurso-edit-${task.id}">
                                                        </div>
                                                    </div>
                                                    <div class="row d-flex justify-content-between ">
                                                        <div class="col">
                                                            <div class="row ">
                                                                <div class="col pe-0">
                                                                    <div class="form-group">
                                                                        <label for="datepicker" class="label-date ">Fecha de inicio</label>
                                                                        <input type="text" id="datepicker-start-enCurso-edit-${task.id}" class="form-control fecha " placeholder="${task.startDate}">
                                                                    </div>
                                                                </div>
                                                                <div class="col-5 me-4 ps-0">
                                                                    <div class="form-group">
                                                                        <label for="datepicker" class="label-date ">Fecha de fin</label>
                                                                        <input type="text" id="datepicker-end-enCurso-edit-${task.id}" class="form-control fecha me-2" placeholder="${task.endDate}">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-4">
                                                                <div class="col">
                                                                    <h6 class="d-proyecto"> <img src="../assets/logos/d-proyecto.svg" alt="" class="me-2"> Descripción del proyecto</h6>
                                                                    <div class="textarea">
                                                                        <textarea class="descripcion" placeholder="${task.description}" id="floatingTextarea2-enCurso-edit-${task.id}" style="height: 210px"></textarea>
                                                                    </div>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                        <div class="col-3 side-menu ">
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-around" id="responsables-enCurso-edit-${task.id}"><img src="../assets/logos/respomsables.svg" alt="" class=""> Responsables</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="etiquetas-enCurso-edit-${task.id}"><img src="../assets/logos/etiquetas.svg" alt="" class="ms-2 me-3"> Etiquetas</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="fecha-enCursos-edit-${task.id}"><img src="../assets/logos/fechas.svg" alt="" class="ms-2 me-3"> Fechas</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="adjuntos-enCurso-edit-${task.id}"><img src="../assets/logos/adjuntos.svg" alt="" class="ms-2 me-3"> Adjuntos</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="delete-enCurso-edit-${task.id}"><img src="../assets/logos/delete.svg" alt="" class="ms-2 me-3"> Eliminar</button>
                                                            </div>
                                                            <div class="row">
                                                                <p class="mt-4 p-status ps-0">Status</p>
                                                            </div>
                                                            <div class="row ">
                                                                <div class="form-check porAsignar d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="porAsignar-enCurso-edit-${task.id}" >
                                                                    <label class="form-check-label " for="flexRadioDefault1">
                                                                        Por asignar
                                                                    </label>
                                                                </div>
                                                                <div class="form-check en-curso d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="enCurso-enCurso-edit-${task.id}" >
                                                                    <label class="form-check-label " for="flexRadioDefault1">
                                                                        En curso
                                                                    </label>
                                                                </div>
                                                                <div class="form-check terminadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="terminadas-enCurso-edit-${task.id}">
                                                                    <label class="form-check-label " for="flexRadioDefault2">
                                                                        Terminadas
                                                                    </label>
                                                                </div>
                                                                <div class="form-check bloqueadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="bloqueadas-enCurso-edit-${task.id}">
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
                                                <button type="button" class="btn guardar" id="edit-enCurso-${task.id}" >Guardar</button>
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
    contenedorEnCurso.appendChild(div)


    let buttonEditEnCurso = document.getElementById(`edit-enCurso-${task.id}`);
    if (buttonEditEnCurso) {
        buttonEditEnCurso.addEventListener('click', () => {
            editarTareaEnCurso(task.id);
        });
    }
    

    let buttonDelete = document.getElementById(`delete-enCurso-edit-${task.id}`)
    
    if(buttonDelete){
        buttonDelete.addEventListener('click', ()=>{eliminarEnCurso(task.id)})
    }


})
};

////Se llama a la funcion crearAcordeonTareaEnCurso de manera global para que se renderice constantemente
crearAcordeonTareaEnCurso(tareasEnCurso);

let enCursoCheckbox = document.getElementById('enCurso');

enCursoCheckbox.addEventListener('change', statusFunctionEnCurso);
