//Login 

let form = document.getElementById('form-login');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];



//Funcion para recorrer el arreglo y validar email y contrasena

let login = () => {
    let emailLogin = document.getElementById('emailLogin').value;
    let password = document.getElementById('passLogin').value;
    

    const userFound = usuarios.some(user => user.email === emailLogin && user.password === password)

    if(userFound){
        window.location.href = '../pages/dashboard.html'
    }else{
        alert('Usuario o Contraseña no coinciden')
    }
    
}


//Evento del formulario de inicio de sesion

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let emailLogin = document.getElementById('emailLogin').value;
    let userFound = false

    for(const user of usuarios){
        if(user.email === emailLogin){
            userFound = true;
            break;
        }
    }
    if (!userFound){
        alert('Usuario no encontrado, debe registrarse')
    }else{
        login();
    }
    form.reset();
}  
)

