//Array contenedor de tareas
const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

//contenedor de acordeon
let asignarTarea = document.getElementById('contenedor-acordeon')



//Funcion para recorrer el arreglo y validar email y contrasena del index

let login = () => {
    let emailLogin = document.getElementById('emailLogin').value;
    let password = document.getElementById('passLogin').value;
    
    const userFound = usuarios.some(user => user.email === emailLogin && user.password === password);
    
    userFound ? window.location.href = '../pages/dashboard.html' : alert('Usuario o Contraseña no coinciden');
}

//Funcion de recuperacion de contraseña

let recovery = () =>{
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
    usuarioEncontrado ? alert(`Su contraseña es ${passwordEncontrada}`) : alert('Usuario no registrado')
    }

//Funcion de Creacion de Usuario

let creacionUsuario = () => {
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
            alert('La contraseña debe tener al menos 8 caracteres');
        }
    } else {
        alert('Las contraseñas deben ser iguales');
    }
};

//Funcion creador de tareas 


let id = 1;

let taskCreator = () => {

    let noTask = document.getElementById('no-task');
    let taskName = document.getElementById('title-task').value;
    let startDate = new Date(document.getElementById('datepicker-start').value).toLocaleDateString();
    let endDate = new Date(document.getElementById('datepicker-end').value).toLocaleDateString();
    let description = document.getElementById('floatingTextarea2').value;

    const createTask = ()=> {
        let task = new Task (taskName,startDate,endDate,description);
        task.id = id;
        id++;
        tareas.push(task)
        localStorage.setItem('tareas', JSON.stringify(tareas))
        document.getElementById('title-task').value='';
        document.getElementById('datepicker-start').value='';
        document.getElementById('datepicker-end').value='';
        document.getElementById('floatingTextarea2').value='';
        crearAcordeonTarea(tareas);

        //Se verifica con un condicional que el contenedor que tiene notask no sea nulo o undefined y si es asi se le asigna la propiedad display none
        if (noTask) {
            noTask.style.display = 'none';
        }

    }

    taskName !== '' && startDate !== '' && endDate !== '' ? createTask() : alert('Debe rellenar los campos para crear una tarea');
}

// Funcion crear card de tareas

//Se pasa como parametro el array tareas y se crea un forEach para llamar la funcion crearAcordeonTarea de manera global y asi  se este renderizando lo que hay en el array tareas constantemente

let crearAcordeonTarea = (tareas) =>{
    
    asignarTarea.innerHTML = ""
    tareas.forEach((task) => {
        let collapseId = `collapse-${task.id}`
        let div = document.createElement('div');
        let acordeonContent = `
        <div class="row">
            <div class="col" id="asignarTarea">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item mb-4">
                        <h2 class="accordion-header ">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                            ${task.taskName}
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
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
                                                                <input type="text" placeholder="${task.taskName}" class="nombre-tarea mb-3" id="title-task-edit">
                                                            </div>
                                                        </div>
                                                        <div class="row d-flex justify-content-between ">
                                                            <div class="col">
                                                                <div class="row ">
                                                                    <div class="col pe-0">
                                                                        <div class="form-group">
                                                                            <label for="datepicker" class="label-date ">Fecha de inicio</label>
                                                                            <input type="text" id="datepicker-start-edit" class="form-control fecha " placeholder="${task.startDate}">
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-5 me-4 ps-0">
                                                                        <div class="form-group">
                                                                            <label for="datepicker" class="label-date ">Fecha de fin</label>
                                                                            <input type="text" id="datepicker-end-edit" class="form-control fecha me-2" placeholder="${task.endDate}">
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row mt-4">
                                                                    <div class="col">
                                                                        <h6 class="d-proyecto"> <img src="../assets/logos/d-proyecto.svg" alt="" class="me-2"> Descripción del proyecto</h6>
                                                                        <div class="textarea">
                                                                            <textarea class="descripcion" placeholder="${task.description}" id="floatingTextarea2-edit" style="height: 210px"></textarea>
                                                                        </div>
                                                                    </div>    
                                                                </div>
                                                            </div>
                                                            <div class="col-3 side-menu ">
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-around" id="responsables-edit"><img src="../assets/logos/respomsables.svg" alt="" class=""> Responsables</button>
                                                                </div>
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="etiquetas-edit"><img src="../assets/logos/etiquetas.svg" alt="" class="ms-2 me-3"> Etiquetas</button>
                                                                </div>
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="fechas-edit"><img src="../assets/logos/fechas.svg" alt="" class="ms-2 me-3"> Fechas</button>
                                                                </div>
                                                                <div class="row">
                                                                    <button class="btn btn-modal-side mb-2 ps-0 d-flex justify-content-start" id="adjuntos-edit"><img src="../assets/logos/adjuntos.svg" alt="" class="ms-2 me-3"> Adjuntos</button>
                                                                </div>
                                                                <div class="row">
                                                                    <p class="mt-4 p-status ps-0">Status</p>
                                                                </div>
                                                                <div class="row ">
                                                                    <div class="form-check porAsignar d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="porAsignar-edit" >
                                                                        <label class="form-check-label " for="flexRadioDefault1">
                                                                            Por asignar
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check en-curso d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="enCurso-edit" >
                                                                        <label class="form-check-label " for="flexRadioDefault1">
                                                                            En curso
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check terminadas d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="terminadas-edit">
                                                                        <label class="form-check-label " for="flexRadioDefault2">
                                                                            Terminadas
                                                                        </label>
                                                                    </div>
                                                                    <div class="form-check bloqueadas d-flex justify-content-start  ps-0 mb-2">
                                                                        <input class="form-check-input margin me-2 ms-1" type="radio" name="status" id="bloqueadas-edit">
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
                                                    <button type="button" class="btn guardar" id="edit-${task.id}">Guardar</button>
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
        })
}

        crearAcordeonTarea(tareas);













