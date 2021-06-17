

function setup() {
  createCanvas(CANVAS.x, CANVAS.y);


  for(let i = 0; i<8; i++) {
    entidades.push(new NaveAngosta( rand(5, CANVAS.x-5), rand(5, CANVAS.y-5)));
    entidades.push(new NaveChica( rand(10, CANVAS.x-10), rand(10, CANVAS.y-10)));
    entidades.push(new NaveGrande( rand(10, CANVAS.x-20), rand(10, CANVAS.y-20)));
  }
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