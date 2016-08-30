toastr.options={
	"positionClass" : "toast-top-center",
	"timeOut" : "1500"
}

var controller = (function(){
	var currentHeroes,
		radiantVictory,
		radiantVictoryPredicted;
	return{
		/**
		 * Initializes a new game
		 */
		newGame: function(){
			$("#scoreContainer").text("");
			var _this = this;
			game.init()
				.done(function(){
					game.goToFirstMatch();
					_this.displayHeroes();
					game.getMatchDetails()
						.done(function(res){
							radiantVictory = res;
						});
					console.log("NEW GAME MAKING BUTTON VISIBLE");	
					$winner_button.removeClass("vis-hidden");
					// $winner_button.css("opacity", "1");
				});
		},
		/**
		 * Displays the heroes for the current game
		 */
		displayHeroes: function(){
			console.log("Displaying heroes");
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
						$("#radiant img:nth-child("+ (i+1) +")").attr("src", "images/no_hero.png");
					}
					else{
						$("#dire img:nth-child("+ (i-4) +")").attr("src", "images/no_hero.png");	
					}
				}
			}
		},
		/**
		 * Updates to display the current score
		 */
		updateScoreDisplay: function(){
			var score = game.getScore();

			$("#scoreContainer").text(score.correctGuesses+"/"+score.totalGuesses+" correct ("
				+((score.correctGuesses/score.totalGuesses)*100).toFixed(2)+"%)");
		},
		/**
		 * Sets the event handlers for interactive elements on the page
		 */
		setHandlers: function(){
			var _this = this;
			$('#newGameButton').on("click", function(){
				_this.newGame();
				$(".nextButton").prop("disabled", true);
			});

			$("#nextButton").on("click", function(){
				$(this).prop("disabled", true);
				game.nextMatch().done(function(){
					_this.displayHeroes();
				});
				game.getMatchDetails()
					.done(function(res){
						radiantVictory = res;
						// $winner_button.css("opacity", "1");
						$winner_button.removeClass("vis-hidden");
					});
			});

			$("#detailsButton").on("click", function(){
				window.open("http://www.dotabuff.com/matches/"+game.getCurrentMatchID());
			});

			/**
			 * Upon selecting a winning team, check if prediction is correct, then update
			 * score accordingly and display corresponding toast
			 */
			$winner_button.on("click", function(){
				$("#nextButton").prop("disabled", false);
				$this = $(this);
				$winner_button.addClass("vis-hidden");
				// $winner_button.css("opacity", "0");
				if($this.attr("id")=="radiantWinner"){
					radiantVictoryPredicted = true;
				}
				else{
					radiantVictoryPredicted=false;
				}
				if(radiantVictory==radiantVictoryPredicted){
					game.addCorrectGuess();
					toastr.success("Correct!");
				}
				else{
					game.addIncorrectGuess();
					toastr.error("Incorrect!");
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