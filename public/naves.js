class NaveAngosta extends SujetoAbstracto {
  constructor(x,y) {
    super(x,y)
    this.velocidad = V(1,2);
    this.alto = 10;
    this.limite = {
      abajo: CANVAS.y - this.alto
    }
  }

  /*
  mover() {
    this.movedor.mover(this)
  }  
  */

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
  
  chocarNaveGrande(objeto){
    let d1 = distancia(this.posicion, objeto.posicion);
    let d2 = distancia(this.posicion, V(objeto.posicion.x, objeto.posicion.y + objeto.alto));
    let d3 = distancia(this.posicion, V(objeto.posicion.x, objeto.posicion.y + objeto.alto/2));
    if (d1 < objeto.diametro/2 || d2 < objeto.diametro/2 || d3 < objeto.diametro/2) {
      this.sacarVida(VIDAS.NaveGrande);
      objeto.sacarVida(VIDAS.NaveAngosta);
      objeto.velocidad.mult(-1)
      this.velocidad.mult(-1)
    }    
  }
  
  chocarNaveChica(objeto){
    let d1 = distancia(this.posicion, objeto.posicion);
    let d2 = distancia(this.posicion, V(objeto.posicion.x, objeto.posicion.y + objeto.alto));
    let d3 = distancia(this.posicion, V(objeto.posicion.x, objeto.posicion.y + objeto.alto/2));
    if (d1 < objeto.diametro/2 || d2 < objeto.diametro/2 || d3 < objeto.diametro/2) {
      this.sacarVida(VIDAS.NaveChica);
      objeto.sacarVida(VIDAS.NaveAngosta);      
      objeto.velocidad.mult(-1)
      this.velocidad.mult(-1)
    }       
  }
  
  chocarNaveAngosta(objeto){
    let d = distancia(objeto.posicion, this.posicion);
    if ( Math.abs( objeto.posicion.x - this.posicion.x ) <= 2 && d < objeto.alto) {
      this.sacarVida(VIDAS.NaveAngosta);
      objeto.sacarVida(VIDAS.NaveAngosta);     
      objeto.velocidad.mult(-1)
      this.velocidad.mult(-1)
    }    
  } 
  
  chocar(objeto) {
    return objeto.chocarNaveAngosta(this);
  }
}

class NaveChica extends NaveAbstracta{
  constructor(x,y, movedor) {
    super(x,y,10)
    this.velocidad = V(2,2);
    //this.movedor = movedor;
  }

  /*
  mover() {
    this.movedor.mover(this)
  } 
  */ 
  
  chocarNaveGrande(objeto){
    let d = distancia(objeto.posicion, this.posicion);
    if (d < objeto.diametro/2 + this.diametro/2) {
      this.sacarVida(VIDAS.NaveGrande);
      objeto.sacarVida(VIDAS.NaveChica);            
      objeto.velocidad.mult(-1);
      this.velocidad.mult(-1);
    }    
  }
  
  chocarNaveChica(objeto){
    let d = distancia(objeto.posicion, this.posicion);
    if (d < objeto.diametro/2 + this.diametro/2) {
      this.sacarVida(VIDAS.NaveChica);
      objeto.sacarVida(VIDAS.NaveChica);     
      objeto.velocidad.mult(-1);
      this.velocidad.mult(-1);
    }  
  }
  
  chocarNaveAngosta(objeto){
    let d1 = distancia(this.posicion, objeto.posicion);
    let d2 = distancia(this.posicion, V(objeto.posicion.x, objeto.posicion.y + objeto.alto));
    let d3 = distancia(this.posicion, V(objeto.posicion.x, objeto.posicion.y + objeto.alto/2));
    if (d1 < objeto.diametro/2 || d2 < objeto.diametro/2 || d3 < objeto.diametro/2) {
      this.sacarVida(VIDAS.NaveAngosta);
      objeto.sacarVida(VIDAS.NaveChica);          
      objeto.velocidad.mult(-1)
      this.velocidad.mult(-1)
    }       
  }  
  
  chocar (objeto) {
    return objeto.chocarNaveChica(this);
  }
}

class NaveGrande extends NaveAbstracta{
  constructor(x,y, movedor) {
    super(x,y,20)
    this.velocidad = V(1,1);
  }

  /*
  mover() {
    this.movedor.mover(this)
  }
  */

  chocarNaveGrande(objeto){
    let d = distancia(objeto.posicion, this.posicion);
    if (d < objeto.diametro/2 + this.diametro/2) {
      this.sacarVida(VIDAS.NaveGrande);
      objeto.sacarVida(VIDAS.NaveGrande);          
      objeto.velocidad.mult(-1);
      this.velocidad.mult(-1);
    }
  }

  chocarNaveChica(objeto){
    let d = distancia(objeto.posicion, this.posicion);
    if (d < objeto.diametro/2 + this.diametro/2) {
      this.sacarVida(VIDAS.NaveChica);
      objeto.sacarVida(VIDAS.NaveGrande);          
      objeto.velocidad.mult(-1);
      this.velocidad.mult(-1);
    }    
  }

  chocarNaveAngosta(objeto){
    let d1 = distancia(objeto.posicion, this.posicion);
    let d2 = distancia(objeto.posicion, V(this.posicion.x, this.posicion.y + this.alto));
    let d3 = distancia(objeto.posicion, V(this.posicion.x, this.posicion.y + this.alto/2));

    if (d1 < objeto.diametro/2 || d2 < objeto.diametro/2 || d3 < objeto.diametro/2) {
      this.sacarVida(VIDAS.NaveAngosta);
      objeto.sacarVida(VIDAS.NaveGrande);       
      objeto.velocidad.mult(-1);
      this.velocidad.mult(-1);      
    }
  }

  chocar (objeto) {
    return objeto.chocarNaveGrande(this);
  }
}

class Equipo extends SujetoAbstracto {
  constructor(naves, color){
    super(0,0,null);
    this.naves = naves;
    this.color = color

    /*
    for (let i=0; i<this.naves.length; i++) {
      this.naves[i].susbcribir()
    }
    */
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

  chocarNaveChica(objeto){
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].chocar(objeto);
    }
  }

  chocarNaveGrande(objeto){
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].chocar(objeto);
    }
  } 

  chocarNaveAngosta(objeto){
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].chocar(objeto);
    }
  }   
  
  rebotar(otro) {
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].rebotar(otro);
    }
  }  

  chocar(otro) {
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].chocar(otro);
    }
  }

  dibujar(otro) {
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].dibujar(otro);
    }
  };  

  mover() {
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].mover(otro);
    }
  }

  tick() {
    push();
    fill(this.color)
    for(let i=0; i<this.naves.length; i++) {
      this.naves[i].tick();
    }
    pop();
  }
}