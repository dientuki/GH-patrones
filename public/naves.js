class NaveAngosta extends SujetoAbstracto {
  constructor(x,y) {
    super(x,y, null, null)
    this.velocidad = V(1,2);
    this.alto = 5;
    this.limite = {
      abajo: CANVAS.y - this.alto
    };
  }

  rebotar() {
    if (this.posicion.x > CANVAS.x || this.posicion.x < 0) {
      this.velocidad.x = -this.velocidad.x;
    }

    if (this.posicion.y > this.limite.abajo || this.posicion.y < 0) {
      this.velocidad.y = -this.velocidad.y;
    }
  }

  dibujar() {
    line(this.posicion.x, this.posicion.y, this.posicion.x, this.posicion.y + this.alto)
  }  
  
  chocarNaveGrande(otro) {
    let d1 = distancia(otro.posicion, this.posicion)
    let d2 = distancia(otro.posicion, V(this.posicion.x, this.posicion.y + this.alto))
    let d3 = distancia(otro.posicion, V(this.posicion.x, this.posicion.y + this.alto/2))
    if (d1 < otro.diametro/2 || d2 < otro.diametro/2 || d3 < otro.diametro/2) {
        this.sacarVida(100)
        otro.sacarVida(12.5)
        this.velocidad.mult(-1)
        otro.velocidad.mult(-1)
    }
  }

  chocarNaveChica(otro){
      let d1 = distancia(otro.posicion, this.posicion)
      let d2 = distancia(otro.posicion, V(this.posicion.x, this.posicion.y + this.alto))
      let d3 = distancia(otro.posicion, V(this.posicion.x, this.posicion.y + this.alto/2))
      if (d1 < otro.diametro/2 || d2 < otro.diametro/2 || d3 < otro.diametro/2) {
          this.sacarVida(100)
          otro.sacarVida(25)
          this.velocidad.mult(-1)
          otro.velocidad.mult(-1)
      }
  }

  chocarNaveAngosta(otro) {
      let d = distancia(otro.posicion, this.posicion)
      if (Math.abs(otro.posicion - this.posicion) <= 2 && d < this.alto) {
          this.sacarVida(100)
          otro.sacarVida(100)
          this.velocidad.mult(-1)
          otro.velocidad.mult(-1)
      }
  }

  chocarBala(bala) {
      let d = distancia(this.posicion, bala.posicion)
      //let d2 = distancia(V(this.posicion.x, this.posicion.y + this.alto), bala.posicion)
      if (d < this.diametro/2) {
          this.sacarVida(20)
          bala.sacarVida(bala.dameVida())
      }
  } 
  
  chocar(objeto) {
    return objeto.chocarNaveAngosta(this);
  }
}

class NaveChica extends NaveAbstracta{
  constructor(x,y, movedor, arma) {
    super(x,y,10,movedor)
    this.velocidad = V(2,2);
    this.arma = arma;
  }

  mover() {
    this.movedor.mover(this)
  } 

  disparar() {
    this.arma.disparar(this)
  }  

  chocarNaveGrande(otro) {
    let d = distancia(otro.posicion, this.posicion)
        if (d < (this.diametro/2 + otro.diametro/2)) {
            this.sacarVida(100)
            otro.sacarVida(25)
            this.velocidad.mult(-1)
            otro.velocidad.mult(-1)
        }
  }

  chocarNaveChica(otro){
      let d = distancia(otro.posicion, this.posicion)
          if (d < (this.diametro)) {
              this.sacarVida(100)
              otro.sacarVida(100)
              this.velocidad.mult(-1)
              otro.velocidad.mult(-1)
          }
  }

  chocarNaveAngosta(otro) {
      let d1 = distancia(this.posicion, otro.posicion)
      let d2 = distancia(this.posicion, V(otro.posicion.x, otro.posicion.y + otro.alto))
      let d3 = distancia(this.posicion, V(otro.posicion.x, otro.posicion.y + otro.alto/2))
      if (d1 < this.diametro/2 || d2 < this.diametro/2 || d3 < this.diametro/2) {
          this.sacarVida(25)
          otro.sacarVida(100)
          this.velocidad.mult(-1)
          otro.velocidad.mult(-1)
      }
  }

  chocarBala(bala) {
      let d = distancia(this.posicion, bala.posicion)
      if (d < this.diametro/2) {
          this.sacarVida(10)
          bala.sacarVida(bala.dameVida())
      }
  }
  
  chocar (objeto) {
    return objeto.chocarNaveChica(this);
  }
}

class NaveGrande extends NaveAbstracta{
  constructor(x,y, movedor, arma) {
    super(x,y,20, movedor, arma)
    this.velocidad = V(1,1);
  }

  mover() {
    this.movedor.mover(this)
  }

  disparar() {
    this.arma.disparar(this)
  }

  chocarNaveGrande(otro) {
    let d = distancia(otro.posicion, this.posicion)
        if (d < (this.diametro)) {
            this.sacarVida(100)
            otro.sacarVida(100)
            this.velocidad.mult(-1)
            otro.velocidad.mult(-1)
        }
  }

  chocarNaveChica(otro){
      let d = distancia(otro.posicion, this.posicion)
          if (d < (this.diametro/2 + otro.diametro/2)) {
              this.sacarVida(25)
              otro.sacarVida(100)
              this.velocidad.mult(-1)
              otro.velocidad.mult(-1)
          }
  }

  chocarNaveAngosta(otro) {
      let d1 = distancia(this.posicion, otro.posicion)
      let d2 = distancia(this.posicion, V(otro.posicion.x, otro.posicion.y + otro.alto))
      let d3 = distancia(this.posicion, V(otro.posicion.x, otro.posicion.y + otro.alto/2))
      if (d1 < this.diametro/2 || d2 < this.diametro/2 || d3 < this.diametro/2) {
          this.sacarVida(12.5)
          otro.sacarVida(100)
          this.velocidad.mult(-1)
          otro.velocidad.mult(-1)
      }
  }

  chocar(otro) {
      return otro.chocarNaveGrande(this)
  }

  chocarBala(bala) {
      let d = distancia(this.posicion, bala.posicion)
      if (d < this.diametro/2) {
          this.sacarVida(20)
          bala.sacarVida(bala.dameVida())
      }
  }
}

class Equipo extends SujetoAbstracto {
  constructor(naves, color){
    super(0,0,null,null);
    this.naves = naves;
    this.color = color;
  }

  dameVida() {
    for (let i=0, j = this.naves.length; i<j; i++) {
      if (this.naves[i].dameVida() <= 0) {
        this.naves.splice(i,1);
        i--;
        j = this.naves.length;
      }
     }

    return this.naves.length;
  }

  susbcribir(evento){
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].susbcribir(evento);
    }
  }  

  chocarNaveChica(objeto){
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].chocar(objeto);
    }
  }

  chocarNaveGrande(objeto){
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].chocar(objeto);
    }
  } 

  chocarNaveAngosta(objeto){
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].chocar(objeto);
    }
  }   

  chocarBala(objeto){
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].chocar(objeto);
    }
  }  
  
  rebotar(otro) {
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].rebotar(otro);
    }
  }  

  chocar(otro) {
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].chocar(otro);
    }
  }

  dibujar(otro) {
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].dibujar(otro);
    }
  };  

  mover() {
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].mover(otro);
    }
  }

  tick() {
    push();
    fill(this.color)
    for(let i=0, j = this.naves.length; i<j; i++) {
      this.naves[i].tick();
    }
    pop();
  }
}

class Bala extends SujetoAbstracto {
  constructor(x,y,direccion) {
    super(x,y, null, null);
    this.direccion = direccion.copy().normalize();
    this.velocidad = this.direccion.copy().mult(4);
    this.diametro = 2;
    this.limite = {
      x: V(CANVAS.x  - this.diametro/2, 0 + this.diametro/2),
      y: V(CANVAS.y - this.diametro/2, 0 + this.diametro/2),
    }    
  }

  mover() {
    this.posicion.add(this.velocidad)
  }

  rebotar() {
    if (this.posicion.x > this.limite.x.x || this.posicion.x < this.limite.x.y) {
      this.vida = 0;
    }

    if (this.posicion.y > this.limite.y.x || this.posicion.y < this.limite.y.y) {
      this.vida = 0;
    }
  }  

  chocarNaveGrande(sujeto) {
    return sujeto.chocarBala(this)
  }

  chocarNaveChica(sujeto) {
      return sujeto.chocarBala(this)
  }

  chocarNaveAngosta(sujeto) {
      return sujeto.chocarBala(this)
  }

  chocarBala(bala){
      if (this.posicion.x == bala.posicion.x && this.posicion.y == bala.posicion.y) {
          this.sacarVida(this.dameVida())
          bala.sacarVida(this.dameVida())
      }
  }
  chocar(sujeto) {
      return sujeto.chocarBala(this)
  }

  dibujar () {
    circle(this.posicion.x, this.posicion.y, this.diametro)
  }
  
  tick() {
    this.rebotar();
    this.mover();
    this.dibujar();    
  }    
}