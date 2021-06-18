

function setup() {
  createCanvas(CANVAS.x, CANVAS.y);

  const naves1 = []
  const naves2 = []
  const parca = new Parca(MENSAJES);

  for(let i = 0; i<8; i++) {
    naves1.push(new NaveChica( rand(5, CANVAS.x-5), rand(5, CANVAS.y-5)));
    naves1.push(new NaveGrande( rand(10, CANVAS.x-10), rand(10, CANVAS.y-10)));
    naves1.push(new NaveAngosta( rand(0, CANVAS.x), rand(0, CANVAS.y-5)));
  }

  naves2.push(new NaveChica( rand(5, CANVAS.x-5), rand(5, CANVAS.y-5)));
  naves2.push(new NaveGrande( rand(10, CANVAS.x-10), rand(10, CANVAS.y-10)));
  naves2.push(new NaveAngosta( rand(0, CANVAS.x), rand(0, CANVAS.y-5)));

  for(let i = 0, j = naves1.length; i<j; i++) {
    naves1[i].susbcribir(parca);
  }
  for(let i = 0, j = naves2.length; i<j; i++) {
    naves2[i].susbcribir(parca);
  }  

  const equipo1 = new Equipo(naves1, 0);
  const equipo2 = new Equipo(naves2, 255);

  ENTIDADES.push(equipo1);
  ENTIDADES.push(equipo2);
  
  MENSAJES.agregar("Ya creamos todas las naves");
  MENSAJES.agregar("Let fight!");
}


function draw() {
    // borramos toda la pantalla, la pintamos de un color y
    // volvemos a pintar todo lo que queramos
    background(220)

    for(let i = 0, l1 = ENTIDADES.length; i<l1; i++) {
      if (ENTIDADES[i].dameVida() <= 0) {
        ENTIDADES.splice(i,1);
        i--;
        l1 = ENTIDADES.length
      }
    }    

    for(let i = 0, l1 = ENTIDADES.length; i<l1; i++) {
      for(let j = i + 1, l2 = ENTIDADES.length; j<l2; j++) {
        ENTIDADES[i].chocar(ENTIDADES[j]);
      }
    }
     
     
    //dibujar
    for(let i = 0, l = ENTIDADES.length; i<l; i++) {
      ENTIDADES[i].tick();
    }

    MENSAJES.mostrar()

    /*
    textSize(12)
    text(frameCount, 10, 15)
    */
}