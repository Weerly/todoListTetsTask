angular
  .module('appModule')
  .directive('saveDirective', function() {
    return {
      restrict: 'E',
      templateUrl: '/saveDirectory/template.html',
      scope: {
        onButtonClick: '&'
      },
      link: link
    };
  
    function link(scope, element, attrs, controller) {
      scope.saveList = function() {
        scope.onButtonClick();
      }
    }
  });