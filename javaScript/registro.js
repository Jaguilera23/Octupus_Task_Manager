// REGISTRO DE USUARIO

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

let formRegistro = document.getElementById('form-registro');


//clase para crear objeto usuario

class Usuario{
    constructor(nombre,email,password){
        this.nombre = nombre;
        this.email = email;
        this.password = password
    }
};




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
            Swal.fire({
                title:'Usuario registrado exitosamente',
    
                width:'20%',
                customClass:{
                    popup:'alert',
                    title:'title-alert',
                    confirmButton:'btn-alert',
                },
                imageUrl:'../assets/logos/checked.svg',
                confirmButtonColor:'#0C8BFD',
                buttonsStyling:'false',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'https://jaguilera23.github.io/Octupus_Task_Manager/index.html';
                }
            });
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

//evento registro

formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('email-registro').value;

    const verificacionUsuario = usuarios.some(user => user.email === email);

    if(verificacionUsuario){
        Swal.fire({
            title:'El usuario ya esta registrado, por favor inicie sesion',
            width:'20%',
            customClass:{
                popup:'alert',
                title:'title-alert',
                confirmButton:'btn-alert',
            },
            imageUrl:'../assets/logos/icons8-error-48.png',
            confirmButtonColor:'#0C8BFD',
        })
    }else{
        (creacionUsuario(),formRegistro.reset())
    };
    
} )


