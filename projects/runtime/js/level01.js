var level01 = function (window) { 

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants    dss
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game     
        var levelData = {     
            "name": "Robot Romp", 
            "number": 1, 
            "speed": -3,
            "gameItems": [
                // add loads more to make game more enjoyable and then remove the tree
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "reward", "x": 2000, "y": groundY - 60},
            ]
        };

        for (var i = 0; i<levelData.gameItems.length; i++){
            // call createSawBlade(), createEnemy(), and createReward()
            // give each function the arguments in the object levelData.gameItems
            if (levelData.gameItems[i].type === "sawblade"){
                createSawBlade(levelData.gameItems[i].x, levelData.gameItems[i].y);

            } else if(levelData.gameItems[i].type === "reward"){
                createReward(levelData.gameItems[i].x, levelData.gameItems[i].y)
            }
        }


        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            var sawblade = sawBladeHitZone;
            // todo part b
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            // game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.y = -hitZoneSize;
            obstacleImage.x = -hitZoneSize;

            game.addGameItem(sawBladeHitZone);

            sawblade.onPlayerCollision = function () {
                game.increaseScore(-500);
                sawblade.fadeOut();
            }

            sawblade.onProjectileCollision = function () {
                sawblade.fadeOut();
            }

        }
        // createSawBlade(200, 300);
        // createSawBlade(400,100);
        // createSawBlade(500,50);

        

        function createEnemy(x, y) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

            enemy.velocityX = -5;
            enemy.rotationalVelocity = 5;

            enemy.onPlayerCollision = function () {
                game.increaseScore(-100);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(100);
                enemy.fadeOut();
            };

          }
        // createEnemy(400, groundY - 10);
        // createEnemy(800, groundY - 100);
        // createEnemy(1200, groundY - 50);

        function createReward(x,y){
            var reward = game.createGameItem("reward", 16);
            var blueCircle = draw.circle(20, "blue");
            blueCircle.x = -5;
            blueCircle.y = -5;
            reward.addChild(blueCircle);

            reward.x = x;
            reward.y = y;

            game.addGameItem(reward);

            reward.velocityX = -5;
            reward.rotationalVelocity = 5;
            
            reward.onPlayerCollision = function () {
                game.increaseScore(500);
                reward.fadeOut();
            };
            reward.onProjectileCollision = function () {
                game.increaseScore(500);
                reward.fadeOut();
            };

            console.log(x,y)

        }
          
        // createReward(400, groundY - 20);
        // createReward(800, groundY - 50);
        // createReward(1200, groundY - 50);

        function createMarker(x,y){
            var marker = game.createGameItem("marker", 300);
            var redRect = draw.rect(10, 1000, "red");
            redRect.y = 60;
            redRect.x = 60;
            marker.addChild(redRect);

            marker.x = x;
            marker.y = y;

            game.addGameItem(marker);

            marker.velocityX = -1;

            marker.onPlayerCollision = function () {
                startLevel();
            };
            marker.onProjectileCollision = function () {};

        }
        
        // spawns the end only if the score is high enough!
        if (score >= 10000){
            createMarker(1000, groundY)
        }

        if (score <= -100){
            startLevel();
        }
    }
        // DO NOT EDIT CODE BELOW HERE

};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
