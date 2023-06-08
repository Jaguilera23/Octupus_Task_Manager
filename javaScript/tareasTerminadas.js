//Array contenedor de tareas terminadas

const tareasTerminadas = JSON.parse(localStorage.getItem('tareasTerminadas')) || [];   

//contenedor de tareas terminadas

let contenedorTerminadas = document.getElementById('contenedor-terminadas')

//boton status terminadas

let terminadasCheckbox = document.getElementById('terminadas');

terminadasCheckbox.addEventListener('change', statusFunctionTerminadas);

//Funcion que utiliza find para ubicar la tarea Terminada a editar 

const editarTareaTerminadas = (id) => {

    let taskNameEditTerminadas = document.getElementById(`title-task-Terminadas-edit-${id}`).value;
    let startDateEditTerminadas = new Date(document.getElementById(`datepicker-start-Terminadas-edit-${id}`).value).toLocaleDateString();
    let endDateEditTerminadas = new Date(document.getElementById(`datepicker-end-Terminadas-edit-${id}`).value).toLocaleDateString();
    let descriptionEditTerminadas = document.getElementById(`floatingTextarea2-Terminadas-edit-${id}`).value;
    
    const tareaEncontradaTerminadas = tareasTerminadas.find(tarea => tarea.id === id );

    if (tareaEncontradaTerminadas){
        tareaEncontradaTerminadas.taskName = taskNameEditTerminadas ;
        tareaEncontradaTerminadas.startDate = startDateEditTerminadas;
        tareaEncontradaTerminadas.endDate = endDateEditTerminadas;
        tareaEncontradaTerminadas.description=descriptionEditTerminadas; 
    }

    localStorage.setItem('tareasTerminadas', JSON.stringify(tareasTerminadas));
    location.reload();


}

//Funcion borrar tarea Terminadas

const eliminarTerminadas = (id) => {

    const index = tareasTerminadas.findIndex(tarea => tarea.id === id);

    if(index != -1){
        tareasTerminadas.splice(index,1)
    }

    //se actualiza el almacenamiento local
    localStorage.setItem('tareasTerminadas', JSON.stringify(tareasTerminadas)); // Actualizar almacenamiento local

    //se llama a la función para volver a renderizar el acordeón con las tareas actualizadas.
    crearAcordeonTareaTerminadas(tareasTerminadas);

    //se refresca la pagina automaticamente
    location.reload()
}


// Funcion para crear status de tareas terminadas

const statusFunctionTerminadas = function() {
    if (this.checked) {
        crearAcordeonTareaTerminadas(tareasTerminadas); 
    }
};



//Acordeon tareas Terminadas

const crearAcordeonTareaTerminadas = (tareasTerminadas) => {
    contenedorTerminadas.innerHTML = ""
    tareasTerminadas.forEach((task) => {
    let collapseId = `collapse-${task.id}`
    let div = document.createElement('div');
    let acordeonContent = `
    <div class="row">
        <div class="col" id="contenedor-Terminadas-${task.id}">
            <div class="accordion" id="accordionExample-Terminadas">
                <div class="accordion-item mb-4">
                    <h2 class="accordion-header ">
                        <button class="accordion-button terminadasColor" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                        ${task.taskName}
                        </button>
                    </h2>
                    <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample-Terminadas-${task.id}">
                        <div class="accordion-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <img src="../assets/logos/members.svg" alt="" class="mt-3 me-5">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn-edit ms-5"  d-flex justify-content-between align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModal-Terminadas-${task.id}" id="edit-Terminadas-modal-${task.id}">
                                    <img src="../assets/logos/editar.svg" alt="">
                                </button>
                                <!-- Modal -->
                                <div class="modal fade mt-5" id="exampleModal-Terminadas-${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel-edit-Terminadas" aria-hidden="true">
                                    <div class="modal-dialog modal-pers">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel-Terminadas-edit">Editar Tarea</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col">
                                                            <input type="text" placeholder="${task.taskName}" class="nombre-tarea mb-3" id="title-task-Terminadas-edit-${task.id}">
                                                        </div>
                                                    </div>
                                                    <div class="row d-flex justify-content-between ">
                                                        <div class="col">
                                                            <div class="row ">
                                                                <div class="col pe-0">
                                                                    <div class="form-group">
                                                                        <label for="datepicker" class="label-date ">Fecha de inicio</label>
                                                                        <input type="text" id="datepicker-start-Terminadas-edit-${task.id}" class="form-control fecha " placeholder="${task.startDate}">
                                                                    </div>
                                                                </div>
                                                                <div class="col-5 me-4 ps-0">
                                                                    <div class="form-group">
                                                                        <label for="datepicker" class="label-date ">Fecha de fin</label>
                                                                        <input type="text" id="datepicker-end-Terminadas-edit-${task.id}" class="form-control fecha me-2" placeholder="${task.endDate}">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-4">
                                                                <div class="col">
                                                                    <h6 class="d-proyecto"> <img src="../assets/logos/d-proyecto.svg" alt="" class="me-2"> Descripción del proyecto</h6>
                                                                    <div class="textarea">
                                                                        <textarea class="descripcion" placeholder="${task.description}" id="floatingTextarea2-Terminadas-edit-${task.id}" style="height: 210px"></textarea>
                                                                    </div>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                        <div class="col-3 side-menu ">
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-around" id="responsables-Terminadas-edit-${task.id}"><img src="../assets/logos/respomsables.svg" alt="" class=""> Responsables</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="etiquetas-Terminadas-edit-${task.id}"><img src="../assets/logos/etiquetas.svg" alt="" class="ms-2 me-3"> Etiquetas</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="fecha-Terminadass-edit-${task.id}"><img src="../assets/logos/fechas.svg" alt="" class="ms-2 me-3"> Fechas</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="adjuntos-Terminadas-edit-${task.id}"><img src="../assets/logos/adjuntos.svg" alt="" class="ms-2 me-3"> Adjuntos</button>
                                                            </div>
                                                            <div class="row">
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="delete-Terminadas-edit-${task.id}"><img src="../assets/logos/delete.svg" alt="" class="ms-2 me-3"> Eliminar</button>
                                                            </div>
                                                            <div class="row">
                                                                <p class="mt-4 p-status ps-0">Status</p>
                                                            </div>
                                                            <div class="row ">
                                                                <div class="form-check porAsignar d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="porAsignar-Terminadas-edit-${task.id}" >
                                                                    <label class="form-check-label " for="flexRadioDefault1">
                                                                        Por asignar
                                                                    </label>
                                                                </div>
                                                                <div class="form-check en-curso d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="Terminadas-Terminadas-edit-${task.id}" >
                                                                    <label class="form-check-label " for="flexRadioDefault1">
                                                                        En curso
                                                                    </label>
                                                                </div>
                                                                <div class="form-check terminadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="terminadas-Terminadas-edit-${task.id}">
                                                                    <label class="form-check-label " for="flexRadioDefault2">
                                                                        Terminadas
                                                                    </label>
                                                                </div>
                                                                <div class="form-check bloqueadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="bloqueadas-Terminadas-edit-${task.id}">
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
                                                <button type="button" class="btn guardar" id="edit-Terminadas-${task.id}" >Guardar</button>
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
    contenedorTerminadas.appendChild(div)


    let buttonEditTerminadas = document.getElementById(`edit-Terminadas-${task.id}`);
    if (buttonEditTerminadas) {
        buttonEditTerminadas.addEventListener('click', () => {
            editarTareaTerminadas(task.id);
        });
    }
    

    let buttonDelete = document.getElementById(`delete-Terminadas-edit-${task.id}`)
    
    if(buttonDelete){
        buttonDelete.addEventListener('click', ()=>{eliminarTerminadas(task.id)})
    }


})
};

////Se llama a la funcion crearAcordeonTareaTerminadas de manera global para que se renderice constantemente
crearAcordeonTareaTerminadas(tareasTerminadas);
