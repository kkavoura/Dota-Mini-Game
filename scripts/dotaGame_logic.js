$(document).ready(function(){

	// $.get("/matchDetails/1426799558").then(function(res){
	// 	console.log("Got match details");
	// })

	// getMatchesOfType([0,7])
	// 	.then(function(desiredMatches){
	// 		console.log(desiredMatches);
	// 	});

})

//Returns JSON containing the last 100 matches 
//IN:--
//OUT:
function getAllMatches(){
	return $.getJSON('/matches');
}

//Filters the matches by desired lobby type
//IN: integers corresponding to the desired lobby type (-1 to 8)
//	  lobby types found here "https://github.com/kronusme/dota2-api/blob/master/data/lobbies.json"
//OUT: array containing the desired match objects
function getMatchesOfType(matchTypes){
	var allMatches,
		desiredMatches = [];

	return getAllMatches()
		.then(function(res) {
			allMatches = JSON.parse(res);
			var allMatchesArray = allMatches.result.matches,
				allMatchesArrayLength = allMatchesArray.length;
			for(var i=0; i<matchTypes.length; i++){ 			
				if(matchTypes[i]<(-1) || matchTypes[i]>8){	//Validating lobby type
					console.log("Invalid lobby type requested");
					return;
				}
				else{										//Add valid matches to array to be returned
					for(var z=0; z<allMatchesArrayLength; z++){
						if(allMatchesArray[z].lobby_type==matchTypes[i]){
							desiredMatches.push(allMatchesArray[z]);
						}
						// else{
						// 	console.log("Not desired lobby type");
						// }
					}
				}
			}
			return desiredMatches;		
		});
}

//Returns an array of heroes that were played in a specific match
//IN: match 
//OUT: array of heros present in the match
function getMatchHeroes(match){
	var players = match.players,
		matchHeroes = [];

	for (var i=0; i<players.length; i++){
		matchHeroes.push(getHero(players[i].hero_id));
	}
	return matchHeroes;
}

//Returns the hero object based on the hero_id
//IN: int representing hero_id
//OUT: hero object
function getHero(id){
	var heroesLength = heroes.length;
	for(var i=0; i<heroesLength; i++){
		if(heroes[i].id == id){
			return heroes[i];
		}
	}
}

//Returns the result of the current match 
//IN: int match_id
//OUT: bool team victory (T=radiant win, F=dire win)
function getMatchResult(matchID){
	//API call for getMatchDetails will be here
	return sampleMatchDetails.result.radiant_win;
}

//Game constructor
function Game(){
	var score = 0,
		desiredMatchTypes = [0,7],
		matches;

	this.getScore = function(){
		return score;
	}

	this.addMatchType = function(matchType){
		desiredMatchTypes.push(matchType);
	}

	this.removeMatchType = function(matchType){
		var index = desiredMatchTypes.indexOf(matchType);
		if(index>-1){
			desiredMatchTypes.splice(index, 1);
		}
	}

	this.getMatchTypes = function(){
		return desiredMatchTypes;
	}

	this.getMatches = function(){
		return getMatchesOfType(desiredMatchTypes)
			.then(function(desiredMatches){
				return desiredMatches;
			});
	}

	this.initialize = function(){
		return this.getMatches();
	}



}
