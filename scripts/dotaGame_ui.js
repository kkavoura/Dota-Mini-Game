$(document).ready(function(){
	setHandlers();
	myGame = new Game();
	myGame.initialize()
		.then(function(res){
			displayHeroes(res[0]);
		});
});

//Sets the handlers for elements on the screen
//IN:--
//OUT:--
function setHandlers(){
	$("#newGameButton").on("click", function(){
		myGame = new Game();
		myGame.initialize()
			.then(function(res){
				displayHeroes(res[0]);
				console.log(res[0].match_id);
			})
	});

	$(".winner-button").on("click", function(){
		var result = getMatchResult(),
			button_id = this.id;
		 predictionResult(result, button_id);
	});

	$("#detailsButton").on("click", function(){
		$(this)
			.parent("a")
			.attr("href", "http://www.dotabuff.com/matches/"+mySuperMatch.match_id);
	})
}


//Displays the heroes for the currently selected match
//IN: match
//OUT: --
function displayHeroes(match){
	var matchHeroes = getMatchHeroes(match),
		matchHeroesLength = matchHeroes.length;

	for(var i=0; i<matchHeroesLength/2; i++){
		$("#radiant img:nth-child("+ (i+1) +")").attr("src", "images/heroes/"+ matchHeroes[i].name +"_lg.png");
		$("#dire img:nth-child("+ (i+1) +")").attr("src", "images/heroes/"+ matchHeroes[i+(matchHeroesLength/2)].name +"_lg.png");
	}
	console.log(matchHeroes);
}


//Checks the match result with the player's prediction and returns the outcome
//IN: boolean result of match (T=radiant win, F=dire win)
//OUT: boolean player prediction result 
function predictionResult(result, button_id){
	if(result){
		$("#radiant")
			.parent(".team")
			.addClass("winner");
		$("#dire")
			.parent(".team")
			.addClass("loser");
		if(button_id=="radiantWinner"){
			alert("Correct!")
			return true;
		}
		else{
			alert("Incorrect!");
			return false;
		}
	}
	else{
		$("#radiant")
			.parent(".team")
			.addClass("loser");
		$("#dire")
			.parent(".team")
			.addClass("winner");
		if(button_id=="direWinner"){
			alert("Incorrect!")
			return false;
		}
		else{
			alert("Correct!");
			return true;
		}
	}
}