const express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');


const app = express();

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.json());

app.post("/api/save/json", function(request, res) {
  var i = 0;
  var preLastIndex = request.body.length - 2;
  var json_text = '[\n';

  while(i <= preLastIndex) {
    json_text += '  {"name": "' + request.body[i].name +
        '", "isDone": "' + request.body[i].isDone + '"},\n';
    i++;
  }

  var lastIndex = request.body.length - 1;
  json_text += '  {"name": "' + request.body[lastIndex].name +
      '", "isDone": "' + request.body[lastIndex].isDone + '"}\n]';

  fs.writeFile(__dirname + '/../app/todoList.json', json_text, function (err) {
    if (err) throw err;
    res.send(JSON.stringify({result: "success"}));
  });
});
app.listen(3010);
