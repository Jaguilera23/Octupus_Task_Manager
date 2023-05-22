// REGISTRO DE USUARIO

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

let botonRegistro = document.getElementById('registro');


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

    let user = new Usuario (email, password);
    usuarios.push(user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
} else{
    alert('Las contraseñas deben ser iguales')
}
}

botonRegistro.addEventListener('click', () => {
    creacionUsuario();

} )


