class MovedorHorizontal {
  mover(objeto) {
    objeto.posicion.x = objeto.posicion.x + objeto.velocidad.x
  }
}

class MovedorVertical {
  mover(objeto) {
    objeto.posicion.y = objeto.posicion.y + objeto.velocidad.y
  }
}

class MovedorEsquivador {
  constructor(movedor, enemigos) {
    this.enemigos = enemigos;
    this.movedor = movedor;
  }

  mover(objeto) {
    for (let i = 0, l = this.enemigos.length; i < l; i++) {
      if (distancia(objeto.posicion, this.enemigos[i].posicion) < 30) {
        //console.log('cambio direccion')
        objeto.velocidad.mult(-1);
      }
    }

    return this.movedor.mover(objeto);
    // si algun enemigo esta a distancia < 30, me muevo en la direccion contraria

  }
}