//RECUPERACION DE CONTRASEÑA
let usuarios = JSON.parse(localStorage.getItem('usuarios'));

let formRecovery = document.getElementById('form-recovery')



formRecovery.addEventListener('submit', (e) => {
    e.preventDefault();
    recovery();
    formRecovery.reset();
})


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
            imageUrl:'../assets/logos/unlocked.svg',
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