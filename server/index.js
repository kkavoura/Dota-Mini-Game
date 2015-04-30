
var express = require("express"),
	logger = require("morgan"),
	bodyParser = require("body-parser"),
	app = express();

var router = express.Router();

app.use(express.static('./'));
app.use(logger("dev"));
app.use(bodyParser.json());

require('./routes')(app);

app.listen(8080);
console.log('app listening on 8080');