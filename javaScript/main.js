//Login 

let form = document.getElementById('form-login');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];



//Evento del formulario de inicio de sesion

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let emailLogin = document.getElementById('emailLogin').value;

    let userFound = usuarios.some(user => user.email === emailLogin) ? true : false;

    if(!userFound){  Swal.fire({
        title:'Usuario no encontrado, debe registrarse',
        width:'20%',
        customClass:{
            popup:'alert',
            title:'title-alert',
            confirmButton:'btn-alert',
        },
        imageUrl:'./assets/logos/icons8-error-48.png',
        confirmButtonColor:'#0C8BFD',
        buttonsStyling:'false',
    })}else{
        login()
    } 
    
    form.reset();
}  
)




