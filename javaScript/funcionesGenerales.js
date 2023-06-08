
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






let buttonSave = document.getElementById('guardar');

buttonSave.addEventListener('click', taskCreator);






























/* nota: 
1. Debo crear un evento para el boton editar para cuando se seleccione en curso elimine la tarea del array tareas y haga push en el array en curso.
2. Crear un condicional en el modal de editar, donde si los input estan vacios al darle editar se mantenga sus valores anteriores y no se cambien por vacios, este condicional es
    para evitar que si la edicion es solo del status se borren los datos de la tarea.    
    */