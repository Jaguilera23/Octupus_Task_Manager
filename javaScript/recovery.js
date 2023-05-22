//RECUPERACION DE CONTRASEÑA

let usuarios = JSON.parse(localStorage.getItem('usuarios'));
let botonRecovery = document.getElementById('recovery')

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
    if(usuarioEncontrado === true){
        alert(`Su contraseña es ${passwordEncontrada}`)
    }else{
        alert('Usuario no registrado')
    }
    }



botonRecovery.addEventListener('click', () => {
    recovery()
})


