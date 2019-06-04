app
  .directive('todoDirective', function() {
    return {
      restrict: 'E',
      templateUrl: '/todoDirectory/template.html',
      scope: {
        todoList: '='
      },
      link: link
    };

    function link(scope, element, attrs, controller) {
      if (scope.todoList) {
        scope.list = scope.todoList;
        scope.todoList.getData = function () {
          return {
            list: scope.list
          }
        };
        scope.todoList.setList = function(list) {
          scope.list = list;
        }
      }

      scope.deleteTodoElement = function() {
        if (confirm('Are you sure!')) {
          this.$parent.list.splice(this.$index, 1)
        }
      }

      scope.addTodoElement = function() {
        var todo = prompt('input please todo element\'s name');
        if (todo === '') {
          alert('todo\'s name can\'t be empty! discard creation')
        } else {
          scope.list.push({name: todo, isDone: "false"});
        }
      }

      scope.getBoolean = function(value) {
        return (value === 'false')
                ? false
                :( (value === 'true')
                ? true : null);
      }
    }
  });