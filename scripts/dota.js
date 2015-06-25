var game = (function(){
	var allMatches,
		myFilteredMatches=[],
		currentMatch=0,
		score,
		matchDetails,
		desiredMatchTypes=[0,7],
		getFilteredMatches = function(){
			var deferred = $.Deferred();
			$.getJSON("/matches")
				.done(function(res){
					myFilteredMatches=[];
					//filter matches
					var myMatches = JSON.parse(res),
						myMatchesArray = myMatches.result.matches;


					myMatchesArray.forEach(function(match){
						for(var i=0; i<desiredMatchTypes.length; i++){
							if(match.lobby_type == desiredMatchTypes[i]){
								myFilteredMatches.push(match);
								break;
							}
						}
					});
					 console.log("LENGTH ", myFilteredMatches.length);					
					deferred.resolve(myFilteredMatches); //pass filtered matches  in there
				});
			return deferred.promise();
		},
		//Returns the hero object based on the hero_id
		//IN: int representing hero_id
		//OUT: hero object
		getHero = function(id){
			var heroesLength = heroes.length;
			for(var i=0; i<heroesLength; i++){
				if(heroes[i].id == id){
					return heroes[i];
				}
			}
		}
	return{
		init: function(){
			score = {
				correctGuesses:0,
				totalGuesses:0
			};
			return getFilteredMatches();
		},
		getScore: function(){
			return score;
		},
		addCorrectGuess: function(){
			score.correctGuesses++;
			score.totalGuesses++;
		},
		addIncorrectGuess: function(){
			score.totalGuesses++;
		},
		setMatchTypes: function(){
			//Will change depending on options check boxes;
		},
		getMatchHeroes: function(){
			var myMatch = myFilteredMatches[currentMatch]
				players = myMatch.players,
				matchHeroes = [];

			for (var i=0; i<players.length; i++){
				matchHeroes.push(getHero(players[i].hero_id));
			}
			console.log(myFilteredMatches[currentMatch].match_id);
			return matchHeroes;
		},
		nextMatch: function(){
			// var currentMatchDetails;
			if(currentMatch<myFilteredMatches.length){
				currentMatch++;		
			}
			else{
				//API call for new matches here
			}
		},
		getMatchDetails: function(){
			var deferred = $.Deferred();
			$.getJSON("/matchDetails/"+myFilteredMatches[currentMatch].match_id+"")
				.done(function(res){
					var myMatch = JSON.parse(res);
					deferred.resolve(myMatch.result.radiant_win);
				});
			return deferred.promise();
		},
		getCurrentMatchID: function(){
			return myFilteredMatches[currentMatch].match_id;
		},
		goToFirstMatch: function(){
			currentMatch = 0;
		},
		getNumberOfMatches: function(){
			return myFilteredMatches.length;
		}
	};
})();

