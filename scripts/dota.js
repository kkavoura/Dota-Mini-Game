var game = (function(){
	var allMatches,
		myFilteredMatches=[],
		currentMatch=0,
		score,
		matchDetails,
		desiredMatchTypes=[0,7],
		/**
		 * Retrieve matches filtered according to categories specified in desiredMatchTypes,
		 * put them in myFilteredMatches
		 * @return {Array} myFilteredMatches promise
		 */
		getFilteredMatches = function(){
			var deferred = $.Deferred();
			$.getJSON("matches")
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
					
					console.log("Number of matches:", myFilteredMatches.length);				
					deferred.resolve(myFilteredMatches); //pass filtered matches  in there

				}).fail(function(e) {
					$('#networkErrorModal').modal('show');
					console.log(e, 'err');});
			return deferred.promise();
		},
		/**
		 * Returns the hero object based on the hero_id
		 * @param {Number} Integer representing hero_id
		 * @returns {Hero} Hero 
		 */
		getHero = function(id){
			var heroesLength = heroes.length;
			for(var i=0; i<heroesLength; i++){
				if(heroes[i].id == id){
					return heroes[i];
				}
			}
		}
	return{
		/**
		 * Initializes the game
		 */
		init: function(){
			score = {
				correctGuesses:0,
				totalGuesses:0
			};
			return getFilteredMatches();
		},
		/**
		 * Returns current game score
		 * @returns {Number} score
		 */
		getScore: function(){
			return score;
		},
		/**
		 * Updates score for correct guess
		 */
		addCorrectGuess: function(){
			score.correctGuesses++;
			score.totalGuesses++;
		},
		/**
		 * Updates score for incorrect guess
		 */
		addIncorrectGuess: function(){
			score.totalGuesses++;
		},
		/**
		 * Returns an array of hero objects corresponding to current match
		 * @returns {Array} Array of heroes
		 */
		getMatchHeroes: function(){
			var myMatch = myFilteredMatches[currentMatch]
				players = myMatch.players,
				matchHeroes = [];

			for (var i=0; i<players.length; i++){
				matchHeroes.push(getHero(players[i].hero_id));
			}
			return matchHeroes;
		},
		/**
		 * Changes current match to the next match in sequence. If none available, retrieves new matches.
		 */
		nextMatch: function(){
			if(currentMatch<myFilteredMatches.length-1){
				currentMatch++;
				return $.when();
			}
			else{
				currentMatch=0;
				toastr.warning("Retrieving more matches");
				return getFilteredMatches();
			}
		},
		/**
		 * Makes a request to the Dota 2 API to retrieve the details for the current match
		 * @returns {} returns promise
		 */
		getMatchDetails: function(){
			var deferred = $.Deferred();
			$.getJSON("matchDetails/"+myFilteredMatches[currentMatch].match_id+"")
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

