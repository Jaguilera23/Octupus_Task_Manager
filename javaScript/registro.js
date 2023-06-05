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
            buttonsStyling:'false',})
    }else{
        (creacionUsuario(),formRegistro.reset())
    };
    
} )


