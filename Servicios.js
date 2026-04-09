class Servicios{/**Clase para gestionar servicios */
    constructor(nombre, precio){
        this.nombreServicio = nombre;
        this.precioBase = precio;
    };
    presentarServicio(){
        console.log("El servicio es: " + this.nombreServicio + " y su precio es: " + this.precioBase);
        /**En java usamos public, private void */
    };
}