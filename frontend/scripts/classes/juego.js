class Juego {
    constructor(idObjetivo, intentosMaximos = 3, preguntasMaximas = 10) {
        this.idObjetivo = idObjetivo;
        this.intentosMaximos = intentosMaximos;
        this.preguntasMaximas = preguntasMaximas;
        this.intentos = [];
        this.preguntas = [];
        this.terminado = false;
        this.gano = false;
    }

    agregarPregunta(categoria, valor) {
        this.preguntas.push({ categoria, valor });
    }

    preguntasRestantes() {
        return this.preguntasMaximas - this.preguntas.length;
    }

    puedePreguntar() {
        return !this.terminado && this.preguntasRestantes() > 0;
    }

    agregarIntento(resultado) {
        this.intentos.push(resultado);
        if (resultado.acierto) {
            this.terminado = true;
            this.gano = true;
        } else if (this.intentos.length >= this.intentosMaximos) {
            this.terminado = true;
            this.gano = false;
        }
        return this.terminado;
    }

    intentosRestantes() {
        return this.intentosMaximos - this.intentos.length;
    }

    calcularPuntaje() {
        if (!this.gano) return 0;
        const tabla = [100, 60, 30];
        return tabla[this.intentos.length - 1] ?? 0;
    }
}