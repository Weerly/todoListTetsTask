app
  .controller('TodoController',
    function ($scope, $http, $timeout) {
      console.log('start');
      var self = $scope;
      var data = JSON.stringify({"key": "value"});
      self.todoList = [];
      $http.get('todoList.json')
        .then(function(list) {
          //self.todoList = list.data;
          self.todoList.setList(list.data);
        });

      self.setData = function (list) {
        console.log(self.todoList.getData());
      };

      self.saveListActivated = function () {
        if (self.todoList) {
          var list = self.todoList.getData();
          var data = JSON.stringify(list.list);
          self.startStopVeilSpinner(true);
          $timeout(function() {
            $http.post('http://localhost:3010/api/save/json', data)
              .then(() => self.successfulSave(), error => self.errorWhileSave(error));
          }, 2000);
        }
      };

      self.successfulSave = function() {
        self.startStopVeilSpinner(false);
        alert('list to file saved successfully');
      };

      self.errorWhileSave = function(error) {
        self.startStopVeilSpinner(false);
        alert('while saving some error occurred');
        console.log(error);
      };

      self.startStopVeilSpinner = function(operation) {
        if(typeof operation === "boolean") {
          self.isSendForSave = operation;
        } else {
          console.log('operation didn\'t define');
          throw Error('operation didn\'t define');
        }
      };
    });