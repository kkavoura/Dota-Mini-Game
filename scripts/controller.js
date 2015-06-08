
var controller = (function(){
	var currentHeroes,
		radiantVictory,
		radiantVictoryPredicted;
	return{
		newGame: function(){
			var _this = this;
			game.init()
				.done(function(){
					_this.displayHeroes();
					game.getMatchDetails()
						.done(function(res){
							radiantVictory = res;
						});
					$winner_button.removeClass("hidden");
				});
		},
		displayHeroes: function(){
			var matchHeroes = game.getMatchHeroes();
			for(var i=0; i<10; i++){
				if(matchHeroes[i]){		
					if(i<5){		
						$("#radiant img:nth-child("+ (i+1) +")").attr("src", "images/heroes/"+ matchHeroes[i].name +"_lg.png");
					}
					else{
						$("#dire img:nth-child("+ (i-4) +")").attr("src", "images/heroes/"+ matchHeroes[i].name +"_lg.png");
					}
				}
				else{
					if(i<5){
						$("#radiant img:nth-child("+ (i+1) +")").attr("src", "images/Question_mark.png");
					}
					else{
						$("#dire img:nth-child("+ (i-4) +")").attr("src", "images/Question_mark.png");	
					}
					console.log("Player #", i ,"undefined");
				}
			}
		},
		updateScoreDisplay: function(){
			var score = game.getScore();

			$("#scoreContainer").text(score.correctGuesses+"/"+score.totalGuesses+" correct ("
				+((score.correctGuesses/score.totalGuesses)*100).toFixed(2)+"%)");
		},
		setHandlers: function(){
			var _this = this;
			$('#newGameButton').on("click", function(){
				_this.newGame();
			});
			$("#nextButton").on("click", function(){
				game.nextMatch();
				_this.displayHeroes();
				game.getMatchDetails()
					.done(function(res){
						radiantVictory = res;
						$winner_button.removeClass("hidden");
					});
			});
			$("#detailsButton").on("click", function(){
				window.open("http://www.dotabuff.com/matches/"+game.getCurrentMatchID());
			});
			$winner_button.on("click", function(){
				$this = $(this);
				$winner_button.addClass("hidden");
				if($this.attr("id")=="radiantWinner"){
					console.log("RADIANT");
					radiantVictoryPredicted = true;
				}
				else{
					radiantVictoryPredicted=false;
					console.log("DIRE");
				}
				console.log("PREDICTION:"+radiantVictoryPredicted+"   RESULT:"+radiantVictory);
				if(radiantVictory==radiantVictoryPredicted){
					game.addCorrectGuess();
					console.log("CORRECT");
				}
				else{
					game.addIncorrectGuess();
					console.log("INCORRECT");
				}
				controller.updateScoreDisplay();
			});
		}
	};
})();

$(document).ready(function(){
	$winner_button = $(".winner-button");
	controller.setHandlers();
});