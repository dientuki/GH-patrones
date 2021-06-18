class Parca extends Observador {
  constructor(mensajeador) {
    super(mensajeador)
    this.mensajeador = mensajeador;
  }

  actualizar(objeto) {
    this.mensajeador.agregar(`Murio: ${objeto.constructor.name}`);
  }
}