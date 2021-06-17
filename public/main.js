

function setup() {
  createCanvas(CANVAS.x, CANVAS.y);


  let naves1 = []
  let naves2 = []

  for(let i = 0; i<8; i++) {
    naves1.push(new NaveChica( rand(5, CANVAS.x-5), rand(5, CANVAS.y-5)));
    naves1.push(new NaveGrande( rand(10, CANVAS.x-10), rand(10, CANVAS.y-10)));
    naves1.push(new NaveAngosta( rand(0, CANVAS.x), rand(0, CANVAS.y-5)));
  }
  
  naves2.push(new NaveChica( rand(5, CANVAS.x-5), rand(5, CANVAS.y-5)));
  naves2.push(new NaveGrande( rand(10, CANVAS.x-10), rand(10, CANVAS.y-10)));
  naves2.push(new NaveAngosta( rand(0, CANVAS.x), rand(0, CANVAS.y-5)));

  let equipo1 = new Equipo(naves1, 0);
  let equipo2 = new Equipo(naves2, 255);

  entidades.push(equipo1);
  entidades.push(equipo2);  
}


function draw() {
    // borramos toda la pantalla, la pintamos de un color y
    // volvemos a pintar todo lo que queramos
    background(220)

    for(let i = 0, l1 = entidades.length; i<l1; i++) {
      if (entidades[i].dameVida() <= 0) {
        entidades.splice(i,1);
        i--;
        l1 = entidades.length
      }
    }    

    for(let i = 0, l1 = entidades.length; i<l1; i++) {
      for(let j = i + 1, l2 = entidades.length; j<l2; j++) {
        entidades[i].chocar(entidades[j]);
      }
    }
     
     
    //dibujar
    for(let i = 0, l = entidades.length; i<l; i++) {
      entidades[i].tick();
    }

    /*
    textSize(12)
    text(frameCount, 10, 15)
    */
}