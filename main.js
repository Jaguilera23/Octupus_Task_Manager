
//Funcion para validar que el usuario sea un correo electronico

let validationUser = (user) =>{
    for(let i = 0; i < user.length; i++){
        let letra = user[i]
        if (letra === '@'){
        return true
        }
    }
    return false;
}

let correoValido = false;
let user = prompt(`Ingrese su correo electronico`).toLowerCase();

// Bucle de validacion del usuario, no permite ingresar contraseña hasta que el correo sea valido
while(!correoValido){
    correoValido = validationUser(user);
    if(!correoValido){
        alert(`Ingrese un correo valido`);
        user = prompt(`Ingrese su correo electronico`).toLowerCase();
    }
}

let pass = prompt(`Ingrese una contraseña`);

// bucle de validacion de contraseña

while(pass === '' || pass.length < 8){
    alert(`La contraseña debe tener al menos 8 caracteres`)
    pass = prompt(`Ingrese una contraseña`);
}

alert(`Bienvenido ${user} puede dar click en "Ingresar" `);


