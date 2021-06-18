class Parca extends Observador {
  constructor(mensajeador) {
    super(mensajeador)
    this.mensajeador = mensajeador;
  }

  actualizar(objeto) {
    this.mensajeador.agregar(`Murio: ${objeto.constructor.name}`);
  }
}

class ParcaCapitan extends Observador {
  constructor(mensajeador, naves) {
    super(mensajeador)
    this.mensajeador = mensajeador;
    this.naves = naves
  }

  actualizar(objeto) {
    this.mensajeador.agregar(`Murio el capitan, OH NOU!`);
    for (let i = 0, j = this.naves.length; i < j; i++) {
      if (objeto != this.naves[i]) {
          this.naves[i].sacarVida(100)
      }
    }    
  }
}