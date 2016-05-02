var myApp = angular.module('myApp', []);

myApp.controller('controller', ['$scope', function ($scope) {
    $scope.master= {};
    $scope.isFormDirty = false;
    
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
        $scope.$broadcast('formClean');
        $scope.isFormDirty = false;
    };
    
    $scope.submit = function() {
    	// something goes here
    };
    
    $scope.$on('formDirty', function (event, formName) {
        $scope.isFormDirty = true;
    });
    
    $scope.reset();
}]);

myApp.directive('form', [function () {
    return {
        restrict: 'E',
        require: 'form',
        template: '<fieldset><legend>Acme Inc.</legend><label>First Name:</label><input type="text" ng-model="user.firstName" placeholder="First Name..." required><label>Last Name:</label><input type="text" ng-model="user.lastName" placeholder="Last Name..." required><label>Email:</label><input type="text" ng-model="user.email" placeholder="Email..." required><div><button type="button" class="btn" ng-click="submit()" ng-disabled="myForm.$invalid">Submit</button> <button type="button" class="btn" ng-click="reset()" ng-disabled="myForm.$invalid">Reset</button></div></fieldset>',
        
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(attrs.name + '.$dirty', function (newValue, oldValue) {
                if (newValue != oldValue && newValue === true) {
                    scope.$emit('formDirty', attrs.name);
                } 
            });
            scope.$on('formClean', function () {
                ctrl.$setPristine();             
            });
        }
    };
}]);

