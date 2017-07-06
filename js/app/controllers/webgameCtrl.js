app.controller('webgameCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
    var ASCII_INVADERS = 1;
    var BRICK_BUSTER = 2;
    var ALLEN_FOOD_FRENZY = 3;

    $scope.name = 'Webgames';
    $scope.id = $routeParams.gameid;

    $scope.loadGame = function(gameId) {
        var game = {};
        var ids = [];
        var i = 0;

        for (i = 0; i < app.loadedGames.length; i++) {
            ids.push(app.loadedGames[i].id);
        }
 
        if (ids.indexOf(gameId) == -1) {
            if (gameId == ASCII_INVADERS) {    
                game.content = asciiInvaders();
            }
            else if (gameId == BRICK_BUSTER) {
                game.content = brickBuster();  
            }
            else if (gameId == ALLEN_FOOD_FRENZY) {
                game.content = allenFoodFrenzy();  
            }
            game.id = gameId;
            app.loadedGames.push(game);
        }
        else {
            game = app.loadedGames[ids.indexOf(gameId)];
        }     
        game.content.loadGame();
    } // end loadGame
}]);

