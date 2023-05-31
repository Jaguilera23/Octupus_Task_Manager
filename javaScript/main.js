//Login 

let form = document.getElementById('form-login');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];



//Evento del formulario de inicio de sesion

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let emailLogin = document.getElementById('emailLogin').value;

    let userFound = usuarios.some(user => user.email === emailLogin) ? true : false;

    !userFound  ? alert('Usuario no encontrado, debe registrarse') : login()
    
    form.reset();
}  
)





