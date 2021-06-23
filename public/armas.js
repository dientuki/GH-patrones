class ArmaRandom {
  constructor(entidades) {
    this.contador = 0;
    this.entidades = entidades;
  }

  disparar(shooter) {
    if ((this.contador % 60) == 0 ) {
      let direccion = p5.Vector.random2D();
      direccion.mult(shooter.diametro/2 + 1);
      let bala = new Bala(shooter.posicion.x + direccion.x, shooter.posicion.y + direccion.y, direccion);
      this.entidades.push(bala);  
    }
    this.contador++;
  }
}

class ArmaSnipper {
  constructor(entidades, enemigos) {
    this.contador = 0;
    this.entidades = entidades;
    this.enemigos = enemigos;
  }

  disparar(shooter) {
    if ((this.contador % 60) == 0 && this.enemigos.length > 0) {
      let direccion = vectorDireccion(shooter.posicion, this.enemigos[0].posicion)
      direccion.mult(shooter.diametro/2 + 1);
      let bala = new Bala(shooter.posicion.x + direccion.x, shooter.posicion.y + direccion.y, direccion);
      this.entidades.push(bala);  
    }
    this.contador++;
  }
}