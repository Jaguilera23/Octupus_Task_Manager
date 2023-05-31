//RECUPERACION DE CONTRASEÑA
let usuarios = JSON.parse(localStorage.getItem('usuarios'));

let formRecovery = document.getElementById('form-recovery')



formRecovery.addEventListener('submit', (e) => {
    e.preventDefault();
    recovery();
    formRecovery.reset();
})


