$(document).ready(function(){
	// var data;
	// $.getJSON("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=4641A476074C246B4FEAE533EA75409C", function(res){
	// 	data = res;
	// 	console.log(data);
	// });
	var desiredMatches = getMatchesOfType(0,7);
	mySuperMatch = desiredMatches[5];

})

//Returns the last 100 matches 
//IN:--
//OUT: array containing the latest 100 matches
function getAllMatches(){
	var rawData=myMatches,
		latestMatches = rawData.result.matches;
	console.log("Got all matches");
	return latestMatches;
}

//Filters the matches by desired lobby type
//IN: integers corresponding to the desired lobby type (-1 to 8)
//	  lobby types found here "https://github.com/kronusme/dota2-api/blob/master/data/lobbies.json"
//OUT: array containing the desired match objects
function getMatchesOfType(){
	var allMatches = getAllMatches(),
		desiredMatches = [];

	for(var i=0; i<arguments.length; i++){ 			
		if(arguments[i]<(-1) || arguments[i]>8){	//Validating lobby type
			console.log("Invalid lobby type requested");
			return;
		}
		else{										//Add valid matches to array to be returned
			for(var z=0; z<allMatches.length; z++){
				if(allMatches[z].lobby_type==arguments[i]){
					desiredMatches.push(allMatches[z]);
				}
			}
		}
	}
	console.log(desiredMatches);
	return(desiredMatches);
}


//Returns an array of heroes that were played in a specific match
//IN: match 
//OUT: array of hero ids
function getHeroes(match){
	var players = match.players,
		matchHeroes = [];

	for (var i=0; i<players.length; i++){
		matchHeroes.push(players[i].hero_id);
	}
	console.log(matchHeroes);
}