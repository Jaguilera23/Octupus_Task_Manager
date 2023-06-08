//Array contenedor de tareas
const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

//Array contenedor de tareas En Curso

const tareasEnCurso = JSON.parse(localStorage.getItem('tareasEnCurso')) || [];


//Array contenedor de tareas terminadas

const tareasTerminadas = JSON.parse(localStorage.getItem('tareasTerminadas')) || [];   

//Array contenedor de tareas bloqueadas

const tareasBloqueadas = JSON.parse(localStorage.getItem('tareasBloqueadas')) || [];

//contenedor de tareas bloqueadas

let contenedorBloqueadas = document.getElementById('contenedor-bloqueadas')

//contenedor de tareas terminadas

let contenedorTerminadas = document.getElementById('contenedor-terminadas')

//contenedor de acordeon
let asignarTarea = document.getElementById('contenedor-acordeon')

//contenedor en curso

let contenedorEnCurso = document.getElementById('contenedor-en-curso')

//Funcion para recorrer el arreglo y validar email y contrasena del index

const login = () => {
    let emailLogin = document.getElementById('emailLogin').value;
    let password = document.getElementById('passLogin').value;
    
    const userFound = usuarios.some(user => user.email === emailLogin && user.password === password);
    
    if(userFound){
        window.location.href = 'https://jaguilera23.github.io/Octupus_Task_Manager/pages/dashboard.html'
    } else{ Swal.fire({
        title:'Usuario o Contraseña no coinciden',
        width:'20%',
        customClass:{
            popup:'alert',
            title:'title-alert',
            confirmButton:'btn-alert',
        },
        imageUrl:'./assets/logos/icons8-error-48.png',
        confirmButtonColor:'#0C8BFD',
    })} ;
}

//Funcion de recuperacion de contraseña

const recovery = () =>{
    let email = document.getElementById('email-recovery').value;
    let usuarioEncontrado = false;
    let passwordEncontrada;

    for(const item of usuarios){
        if(email === item.email){
            usuarioEncontrado = true;
            passwordEncontrada = item.password
            break;
        }
    }
    if(usuarioEncontrado){
        Swal.fire({
            title:`Su contraseña es ${passwordEncontrada}`,

            width:'20%',
            customClass:{
                popup:'alert',
                title:'title-alert',
                confirmButton:'btn-alert',
            },
            imageUrl:'../assets/logos/icons8-error-48.png',
            confirmButtonColor:'#0C8BFD',

        });
    }else{
        Swal.fire({
        title:'Usuario no registrado',
        width:'20%',
        customClass:{
            popup:'alert',
            title:'title-alert',
            confirmButton:'btn-alert',
        },
        imageUrl:'../assets/logos/icons8-error-48.png',
        confirmButtonColor:'#0C8BFD',
        });
    } 
}

//Funcion de Creacion de Usuario

const creacionUsuario = () => {
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email-registro').value;
    let password = document.getElementById('contraseña').value;
    let passwordRepeat = document.getElementById('repetir-contraseña').value;

    if (password === passwordRepeat) {
        if (password.length >= 8) {
            let user = new Usuario(nombre, email, password);
            usuarios.push(user);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        } else {
            Swal.fire({
                title:'La contraseña debe tener al menos 8 caracteres',
    
                width:'20%',
                customClass:{
                    popup:'alert',
                    title:'title-alert',
                    confirmButton:'btn-alert',
                },
                imageUrl:'../assets/logos/icons8-error-48.png',
                confirmButtonColor:'#0C8BFD',
                buttonsStyling:'false',
            });
        }
    } else {
        Swal.fire({
            title:'Las contraseñas deben ser iguales',
            width:'20%',
            customClass:{
                popup:'alert',
                title:'title-alert',
                confirmButton:'btn-alert',
            },
            imageUrl:'../assets/logos/icons8-error-48.png',
            confirmButtonColor:'#0C8BFD',

        });
    }
};

//Funcion creador de tareas 


let id = 1;

const taskCreator = () => {

    let noTask = document.getElementById('no-task');
    let taskName = document.getElementById('title-task').value;
    let startDate = new Date(document.getElementById('datepicker-start').value).toLocaleDateString();
    let endDate = new Date(document.getElementById('datepicker-end').value).toLocaleDateString();
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

        //Se verifica con un condicional que el contenedor que tiene notask no sea nulo o undefined y si es asi se le asigna la propiedad display none
        // if (tareas.length > 0) {
        //     noTask.style.display = 'none';
        // } else {
        //     noTask.style.display = 'block';
        // }
        
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
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-around" id="responsables-edit-${task.id}"><img src="../assets/logos/respomsables.svg" alt="" class=""> Responsables</button>
                                                                </div>
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
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="delete-edit-${task.id}"><img src="../assets/logos/delete.svg" alt="" class="ms-2 me-3"> Eliminar</button>
                                                                </div>
                                                                <div class="row">
                                                                    <p class="mt-4 p-status ps-0">Status</p>
                                                                </div>
                                                                <div class="row ">
                                                                    <div class="form-check porAsignar d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="porAsignar-edit-${task.id}" >
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
                                                    <button type="button" class="btn guardar" id="edit-${task.id}" >Guardar</button>
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



//Funcion que utiliza find para ubicar la tarea por asignar a editar 

const editarTarea = (id) => {

    let taskNameEdit = document.getElementById(`title-task-edit-${id}`).value;
    let startDateEdit = new Date(document.getElementById(`datepicker-start-edit-${id}`).value).toLocaleDateString();
    let endDateEdit = new Date(document.getElementById(`datepicker-end-edit-${id}`).value).toLocaleDateString();
    let descriptionEdit = document.getElementById(`floatingTextarea2-edit-${id}`).value;
    
    const tareaEncontrada = tareas.find(tarea => tarea.id === id );

    if (tareaEncontrada){
        tareaEncontrada.taskName = taskNameEdit    ;
        tareaEncontrada.startDate = startDateEdit;
        tareaEncontrada.endDate = endDateEdit;
        tareaEncontrada.description=descriptionEdit; 
    }

    localStorage.setItem('tareas', JSON.stringify(tareas));
    location.reload();


}

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

//Funcion que utiliza find para ubicar la tarea Bloqueadas a editar 

const editarTareaBloqueadas = (id) => {

    let taskNameEditBloqueadas = document.getElementById(`title-task-Bloqueadas-edit-${id}`).value;
    let startDateEditBloqueadas = new Date(document.getElementById(`datepicker-start-Bloqueadas-edit-${id}`).value).toLocaleDateString();
    let endDateEditBloqueadas = new Date(document.getElementById(`datepicker-end-Bloqueadas-edit-${id}`).value).toLocaleDateString();
    let descriptionEditBloqueadas = document.getElementById(`floatingTextarea2-Bloqueadas-edit-${id}`).value;
    
    const tareaEncontradaBloqueadas = tareasBloqueadas.find(tarea => tarea.id === id );

    if (tareaEncontradaBloqueadas){
        tareaEncontradaBloqueadas.taskName = taskNameEditBloqueadas ;
        tareaEncontradaBloqueadas.startDate = startDateEditBloqueadas;
        tareaEncontradaBloqueadas.endDate = endDateEditBloqueadas;
        tareaEncontradaBloqueadas.description=descriptionEditBloqueadas; 
    }

    localStorage.setItem('tareasBloqueadas', JSON.stringify(tareasBloqueadas));
    location.reload();


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

    //se refresca la pagina automaticamente
    location.reload()
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
                                                                <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="delete-Bloqueadas-edit-${task.id}"><img src="../assets/logos/delete.svg" alt="" class="ms-2 me-3"> Eliminar</button>
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
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="Bloqueadas-Bloqueadas-edit-${task.id}" >
                                                                    <label class="form-check-label " for="flexRadioDefault1">
                                                                        En curso
                                                                    </label>
                                                                </div>
                                                                <div class="form-check Bloqueadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="Bloqueadas-Bloqueadas-edit-${task.id}">
                                                                    <label class="form-check-label " for="flexRadioDefault2">
                                                                        Bloqueadas
                                                                    </label>
                                                                </div>
                                                                <div class="form-check bloqueadas d-flex justify-content-start  ps-0 mb-2">
                                                                    <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="bloqueadas-Bloqueadas-edit-${task.id}">
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
                                                <button type="button" class="btn guardar" id="edit-Bloqueadas-${task.id}" >Guardar</button>
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










/* nota: 
1. Debo crear un evento para el boton editar para cuando se seleccione en curso elimine la tarea del array tareas y haga push en el array en curso.
2. Crear un condicional en el modal de editar, donde si los input estan vacios al darle editar se mantenga sus valores anteriores y no se cambien por vacios, este condicional es
    para evitar que si la edicion es solo del status se borren los datos de la tarea.    
    */