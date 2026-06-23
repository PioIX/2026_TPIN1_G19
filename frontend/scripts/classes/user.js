class Usuario {
    constructor(dni, nombreCompleto, nombre, isAdmin) {
        this.dni = dni;
        this.nombreCompleto = nombreCompleto;
        this.nombre = nombre;
        this.isAdmin = !!isAdmin;
    }

    esAdmin() {
        return this.isAdmin === true;
    }

    guardarSesion() {
        localStorage.setItem('usuarioActivo', JSON.stringify(this));
    }

    static obtenerSesion() {
        const datos = localStorage.getItem('usuarioActivo');
        if (!datos) return null;
        const obj = JSON.parse(datos);
        return new Usuario(obj.dni, obj.nombreCompleto, obj.nombre, obj.isAdmin);
    }

    static cerrarSesion() {
        localStorage.removeItem('usuarioActivo');
    }
}