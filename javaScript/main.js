//Login 

let form = document.getElementById('form-login');
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];



//Evento del formulario de inicio de sesion

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let emailLogin = document.getElementById('emailLogin').value;

    let userFound = usuarios.some(user => user.email === emailLogin) ? true : false;

    !userFound  ?  Swal.fire({
        title:'Usuario no encontrado, debe registrarse',
        // icon:'error',
        width:'20%',
        customClass:{
            popup:'alert',
            title:'title-alert',
            confirmButton:'btn-alert',
        },
        imageUrl:'../assets/logos/octupus-footer.svg',
        confirmButtonColor:'#0C8BFD',
        buttonsStyling:'false',
    }) : login()
    
    form.reset();
}  
)




