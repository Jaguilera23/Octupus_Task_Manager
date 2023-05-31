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

    verificacionUsuario ? alert('El usuario ya esta registrado, por favor inicie sesion') : (creacionUsuario(),formRegistro.reset());
    
} )


