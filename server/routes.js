"use strict";

var request = require('request'),
	key = "4641A476074C246B4FEAE533EA75409C";

module.exports = function(app){
	app.get("/matches", function(req, res){
		request("https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key="+key, function(err, dotaRes, body) {
			res.json(body);
		});
	});

	app.get("/matchDetails/:id", function(req, res){
		console.log(req.params.id);
		request("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+req.params.id+"&key="+key, function(err, dotaRes, body) {
			res.json(body);
		});
	});
};