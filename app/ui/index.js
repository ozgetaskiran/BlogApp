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

blog.controller('loginController', function ($scope, $http, $window) {

    $scope.postdata = function (email, password) {

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/1.0/auth',
            data: {email: $scope.email, password: $scope.password}
        }).then(function (data){
            if (data.data) {
                $scope.msg = "Post Data Submitted Successfully!"
                console.log(data.data);
            }
            $window.location = "index.html"
        },function (error){
            console.log('Error: ' + error);
        });

    };

});
