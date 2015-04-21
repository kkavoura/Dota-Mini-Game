$(document).ready(function(){
	setHandlers();
});

//Sets the handlers for elements on the screen
//IN:--
//OUT:--
function setHandlers(){
	$("#newGameButton").on("click", function(){
		displayHeroes(mySuperMatch);
	});

	$(".winner-button").on("click", function(){
		var result = getMatchResult(),
			button_id = this.id;
		 predictionResult(result, button_id);
	// 	if(result){
	// 		alert("Correct!");
	// 		$("#radiantWinner")
	// 			.parent(".team")
	// 			.addClass("winner");
	// 	}
	// 	else{
	// 		alert("Incorrect!");
	// 	}
	// });

	// $("#direWinner").on("click", function(){
	// 	var result = getMatchResult();
	// 	if(!result){
	// 		alert("Correct!");
	// 	}
	// 	else{
	// 		alert("Incorrect!");
	// 	}
	});
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


//
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
		}
		else{
			alert("Incorrect!");
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
		}
		else{
			alert("Correct!");
		}
	}
}