$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)
    createPlatform(450,650,100,10);
    createPlatform(350,550,100,10);
    createPlatform(200,500,100,10);
    createPlatform(400,300,100,10);
    createPlatform(250,390,100,10);
    createPlatform(650,650,100,10);
    createPlatform(750,400,100,10);
    createPlatform(700,375,100,1500);
    createPlatform(1000,400,100,10);
    createPlatform(900, 300, 100, 10);
    createPlatform(1100, 500, 100, 10);
    createPlatform(500,400,100,10);
    createPlatform(50,300, 100, 10);
    
    
    
    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)
    
  
    createCollectable("diamond", 200, 400);
    createCollectable("diamond", 350,500);
    createCollectable("diamond", 450,600);
    createCollectable("diamond", 650,600);
    createCollectable("diamond", 250,300);
    createCollectable("diamond", 400,250);
    createCollectable("diamond", 1100,400);
    createCollectable("diamond", 900, 250);
    
    
    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay)


    createCannon('top', 500, 1000);
    createCannon('top', 800, 1000);
    createCannon('top', 200, 1500);
    createCannon('left', 200, 5000);
    createCannon('right', 500, 1000)


    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
    var collectObj = {}

    function gameWinner() {      

      for (var i = 0; i < collectables.length; i++) {
        if (
          collectables[i].collected
        ) {
          collectObj[i] = "collected";
        }
      }   
      if(Object.keys(collectObj).length === collectables.length){
        alert("You have won!")
        //break;
      }

    }
  

  function update(){
    if(Object.keys(collectObj).length === collectables.length) return;
    gameWinner();
    window.requestAnimationFrame(() => update())
  }

  update();
  }
  registerSetup(setup);
});
