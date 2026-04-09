const miForm = document.querySelector("form");//Mandamos a llamar nuestro formulario

miForm.addEventListener("submit", function(evento){

    evento.preventDefault()//deteccion de envio automatico

    const UsuarioNombre = document.getElementById("nombre").value;
    const UsuarioEmail = document.getElementById("email").value;
    const UsuarioMensaje = document.getElementById("mensaje").value;
    if(UsuarioNombre === "" || UsuarioEmail === "" || UsuarioMensaje === ""){
        alert("Porfavor, completa los campos antes de enviar ")
    }else{
        alert("✅El mensaje se envio correctamente")
    }
    miForm.reset();

});

 //analizar codigo
//Evento de lista para bajar y subir mas suave
const enlacesMenu = document.querySelectorAll('nav ul li a');

enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', function(e) {

        e.preventDefault();
        const idSeccion = this.getAttribute('href');
        const seccionDestino = document.querySelector(idSeccion);

        seccionDestino.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
//Boton de cambio de color (toggle switch)
const toggleTema = document.getElementById("boton-color");

toggleTema.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    // El toggle visual se actualiza automáticamente con CSS
})


//Anilzar el scroll para mostrar u ocultar el header
// Header que se oculta al hacer scroll hacia abajo y aparece al subir
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll hacia abajo y más de 100px
        header.classList.add('hidden');
    } else {
        // Scroll hacia arriba
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

//Moda de presentacion 
const btnPresentacion = document.getElementById("btn-presentacion");
const modal = document.getElementById("modal-presentacion");
const cerrarModal = document.querySelector(".cerrar-modal");

//Mostrar modal al hacer clic en el botón
btnPresentacion.addEventListener("click", () => {
    modal.style.display = "block";
});

//cerrar modal al hacer click a la "X"
cerrarModal.addEventListener("click", ()=>{
    modal.style.display = "none";
});

//Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click" , (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});