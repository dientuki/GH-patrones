class SujetoAbstracto {
  constructor(x,y, movedor, arma) {
    this.vida = 100;
    this.posicion = V(x,y);
    this.eventos = [];
  }

  susbcribir(evento) {
    this.eventos.push(evento)
  }
  
  desusbcribir(evento) {

  }  

  sacarVida(valor) {
    this.vida = this.vida - valor;

    if (this.vida <= 0){
      for(let i = 0, j = this.eventos.length; i<j; i++) {
        this.eventos[i].actualizar(this);
      }
    }
  }

  dameVida() {
    return this.vida;
  }  

  mover() {
    this.posicion.x += this.velocidad.x;
    this.posicion.y += this.velocidad.y;
  }

  rebotar() {
    throw new Error('Falta implementar')
  };

  dibujar() {
    throw new Error('Falta implementar')
  };

  tick() {
    this.mover();
    this.rebotar();
    this.dibujar();    
  }  
}

class NaveAbstracta extends SujetoAbstracto {
  constructor(x,y,diametro) {
    super(x,y)
    this.diametro = diametro;
    this.limite = {
      x: V(CANVAS.x  - this.diametro/2, 0 + this.diametro/2),
      y: V(CANVAS.y - this.diametro/2, 0 + this.diametro/2),
    }
  }

  rebotar() {
    if (this.posicion.x > this.limite.x.x || this.posicion.x < this.limite.x.y) {
      this.velocidad.x = -this.velocidad.x;
    }

    if (this.posicion.y > this.limite.y.x || this.posicion.y < this.limite.y.y) {
      this.velocidad.y = -this.velocidad.y;
    }
  }

  dibujar() {
    circle(this.posicion.x, this.posicion.y, this.diametro)
  }   
}

class Observador {
  actualizar(objeto) {
    throw new Error('no se implemento')
  }
}