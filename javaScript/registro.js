// REGISTRO DE USUARIO

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

let formRegistro = document.getElementById('form-registro');


class Usuario{
    constructor(email,password){
        this.email = email;
        this.password = password
    }
}

let creacionUsuario = () =>{
    
    let email = document.getElementById('email-registro').value;
    let password = document.getElementById('contraseña').value;
    let passwordRepeat = document.getElementById('repetir-contraseña').value;

    if(password === passwordRepeat){
        if(password.length >= 8){
            let user = new Usuario (email, password);
            usuarios.push(user);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }else{
            alert('La contraseña debe tener al menos 8 caracteres')
        }
    } else{
        alert('Las contraseñas deben ser iguales')
        }
}

formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('email-registro').value;

    const verificacionUsuario = usuarios.some(user => user.email === email);

    if(verificacionUsuario){
        alert('El usuario ya esta registrado, por favor inicie sesion')
    }else{
        creacionUsuario();
        formRegistro.reset();
    }
    
} )


