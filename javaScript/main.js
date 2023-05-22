//Login 

let botonLogin = document.getElementById('login');
let usuarios = JSON.parse(localStorage.getItem('usuarios'));

//Funcion para recorrer el arreglo y validar email y contrasena

let login = () => {
    let emailLogin = document.getElementById('emailLogin').value;
    let password = document.getElementById('passLogin').value;
    

    for (const item of usuarios){
    if (emailLogin === item.email && password === item.password ){

        window.location.href = "../pages/dashboard.html";
    
    }else{
        alert('Usuario o Contraseña no coinciden')
    }
}   
}



botonLogin.addEventListener('submit', (e) => {
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
        login()
    }
}
)

