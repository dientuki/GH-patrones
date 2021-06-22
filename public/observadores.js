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

class GameOver extends Observador {
    
  constructor(equipos) {
      super()
      this.equipos = equipos
  }

  actualizar(objeto) {
    let muertos = 0;
    
    for (let i = 0, l1 = this.equipos.length; i < l1; i++) {
        let naves = this.equipos[i].naves;
        let termino = true;
        
        for (let j = 0, l2 = naves.length; j < l2; j++) {
            if (naves[j].dameVida() > 0 ) {
                termino = false
                break
            }
        }

        if (termino) {
            muertos++
        }   
    }

    if (muertos == this.equipos.length - 1) {
        textSize(32)
        text('GAME OVER', 100, 200)
        noLoop()
    }
  }
}