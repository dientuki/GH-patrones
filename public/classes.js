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