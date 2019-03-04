var blog = angular.module("blog", []);

blog.controller("mainController", function($scope, $http){
    $scope.formData = {};

    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/1.0/users'
    }).then(function (data){

        console.log('kjkjkjk');
        console.log(data.data);
        $scope.users = data.data;

        console.log('kjkjkjk');
    },function (error){
        console.log("qweweq");
        console.log('Error: ' + error);
    });



});
